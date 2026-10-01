# DevHorizon (React + Vite + Firebase)

## 1. Install & run
    npm install
    npm run dev

## 2. Firebase setup (ek dafa)

1. https://console.firebase.google.com -> **Add project**.
2. **Build -> Firestore Database -> Create database** (production mode).
3. **Build -> Authentication -> Get started -> Sign-in method -> Email/Password -> Enable**.
4. **Project settings -> General -> Your apps -> Web (`</>`)** -> app register karo -> config values copy karo.
5. Project folder me `.env.example` ko copy karke `.env` banao aur values bharo.
6. **Authentication -> Users -> Add user** -> apna admin email + password banao.
7. Us user ka **User UID** copy karo (Users table me).
8. **Firestore -> Start collection** -> Collection ID: `admins` -> Document ID: *wo UID* -> ek field add karo
   (e.g. `role` = `admin`) -> Save.
9. **Firestore -> Rules** tab me `firestore.rules` file ka content paste karo -> **Publish**.

Ab `/#/admin` par jao aur login karo.

## 3. Admin security kaise kaam karti hai
- Admin panel me sirf wahi login ho sakta hai jiska account Firebase Auth me ho **aur** jiska UID `admins` collection me ho.
- Asli security `firestore.rules` se hai: sab log projects/reviews **parh** sakte hain, lekin **likh/delete sirf admin** kar sakta hai.
  Koi dusra banda browser se code change kare tab bhi Firebase write reject kar dega.
- Admin URL: `https://your-site/#/admin` (footer me chota "Admin" link bhi hai). Link chupana security nahi hai, security rules + login se hai.
- Registration ka koi page nahi hai. Naye admin ke liye step 6-8 repeat karo.

## 4. Deploy (Firebase Hosting)
    npm install -g firebase-tools
    firebase login
    firebase init        # Hosting + Firestore select karo, existing project choose karo
                         # public directory: dist, single-page app: Yes, existing firestore.rules overwrite: No
    npm run build
    firebase deploy

(Vercel/Netlify par deploy karo to `.env` ki saari `VITE_FIREBASE_*` values wahan Environment Variables me bhi daalo.
Firebase Auth -> Settings -> Authorized domains me apna domain add karna na bhoolo.)

## 5. Images
Images compress karke project ke document me hi save hoti hain (Firestore limit 1 MB per project), isliye Storage ki zarurat nahi.
Bohat badi images ke liye image URL paste karo.

## Files
- `src/firebase.js`      Firebase init
- `src/store.js`         Firestore read (real-time) / write functions
- `src/admin/*`          Admin panel (login, projects, reviews, backup)
- `firestore.rules`      Database security rules
- `src/data.js`          Contact info, services, sample projects

## Vercel par deploy
1. Project GitHub par push karo (`.env` push nahi hoti, `.gitignore` me hai).
2. vercel.com -> Add New -> Project -> GitHub repo import karo (Framework: Vite, Build: `npm run build`, Output: `dist`).
3. Deploy dabane se PEHLE Environment Variables me `.env` ki saari `VITE_FIREBASE_*` values add karo.
4. Deploy ke baad Firebase Console -> Authentication -> Settings -> Authorized domains -> apna `xxx.vercel.app` domain add karo.
5. `https://xxx.vercel.app/#/admin` par login karo.
