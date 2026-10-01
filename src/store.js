import { useSyncExternalStore } from "react";
import { collection, doc, onSnapshot, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { db, isConfigured } from "./firebase";
import { projects as sampleProjects } from "./data";

// ---------------------------------------------------------------
// Live Firestore collections (real-time). Website + admin share them.
// ---------------------------------------------------------------
function makeStore(name, sorter) {
  let state = { list: [], loading: true, error: "" };
  const subs = new Set();
  let unsub = null;
  const set = (s) => { state = s; subs.forEach((f) => f()); };

  const start = () => {
    if (!db) {
      set({ list: [], loading: false, error: isConfigured ? "" : "Firebase is not configured (.env missing)." });
      return;
    }
    unsub = onSnapshot(
      collection(db, name),
      (snap) => {
        const list = snap.docs.map((d) => ({ ...d.data(), id: d.id })).sort(sorter);
        set({ list, loading: false, error: "" });
      },
      (err) => set({ list: [], loading: false, error: err.message })
    );
  };

  return {
    subscribe(fn) {
      subs.add(fn);
      if (subs.size === 1) start();
      return () => {
        subs.delete(fn);
        if (subs.size === 0 && unsub) { unsub(); unsub = null; }
      };
    },
    get: () => state,
  };
}

const projectsStore = makeStore("projects", (a, b) => (a.order ?? 0) - (b.order ?? 0));
const reviewsStore = makeStore("reviews", (a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));

// each returns { list, loading, error }
export const useProjects = () => useSyncExternalStore(projectsStore.subscribe, projectsStore.get);
export const useReviews = () => useSyncExternalStore(reviewsStore.subscribe, reviewsStore.get);

// ---------------------------------------------------------------
// Write helpers (only work for admins - enforced by firestore.rules)
// ---------------------------------------------------------------
const MAX_BYTES = 950_000; // Firestore document limit is ~1 MiB

const clean = (obj) => JSON.parse(JSON.stringify(obj)); // strips undefined

async function run(fn) {
  if (!db) return { ok: false, error: "Firebase is not configured." };
  try { await fn(); return { ok: true }; }
  catch (e) {
    const msg = e.code === "permission-denied"
      ? "Permission denied. Please login with an admin account."
      : e.message || "Something went wrong.";
    return { ok: false, error: msg };
  }
}

export function saveProject(item) {
  const { id, ...data } = clean(item);
  if (JSON.stringify(data).length > MAX_BYTES)
    return Promise.resolve({ ok: false, error: "Image is too big. Use a smaller image or paste an image URL." });
  return run(() => setDoc(doc(db, "projects", id), data));
}

export const deleteProject = (id) => run(() => deleteDoc(doc(db, "projects", id)));

// swap the "order" value of two projects
export function swapProjects(a, b) {
  return run(() => {
    const batch = writeBatch(db);
    batch.update(doc(db, "projects", a.id), { order: b.order ?? 0 });
    batch.update(doc(db, "projects", b.id), { order: a.order ?? 0 });
    return batch.commit();
  });
}

export const toggleProject = (p) => run(() => setDoc(doc(db, "projects", p.id), { visible: p.visible === false }, { merge: true }));

export function addReview(r) {
  const id = uid();
  return run(() => setDoc(doc(db, "reviews", id), { ...clean(r), createdAt: Date.now() }));
}
export const deleteReview = (id) => run(() => deleteDoc(doc(db, "reviews", id)));

// import many docs at once (used by sample data + backup restore)
export function importAll({ projects = [], reviews = [] }) {
  return run(async () => {
    const batch = writeBatch(db);
    const base = Date.now();
    projects.forEach((p, i) => {
      const { id, ...data } = clean(p);
      batch.set(doc(db, "projects", id || slugify(p.title) + "-" + uid().slice(-4)), { ...data, order: base + i });
    });
    reviews.forEach((r, i) => {
      const { id, ...data } = clean(r);
      batch.set(doc(db, "reviews", id || uid()), { ...data, createdAt: base + i });
    });
    await batch.commit();
  });
}

export const loadSampleProjects = () => importAll({ projects: sampleProjects });

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export const slugify = (s) =>
  (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "project";
