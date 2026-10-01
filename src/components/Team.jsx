import Section from "./Section";
import { team, TEAM_SIZE } from "../data";

export default function Team() {
  return (
    <Section id="team" title="Our Team" sub="The people behind DevHorizon.">
      <div className="team">
        {team.map((m) => (
          <div className="card tcard" key={m.name}>
            <img className="tphoto" src={m.photo} alt={m.name} loading="lazy" width="160" height="160" />
            <h3>{m.name}</h3>
            <span className="trole">{m.role}</span>
            <p className="tedu">
              <b>{m.degree}</b>
              <br />
              {m.university}
            </p>
            <div className="tbtns">
              <a className="btn p sm" href={"tel:" + m.phone}>📞 {m.phone}</a>
              <a
                className="btn o sm"
                href={"https://wa.me/" + m.waLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="tstrip">
        <span className="ico">👥</span>
        <div>
          <b>{TEAM_SIZE} skilled employees</b>
          <span>developers and designers working together on your project</span>
        </div>
      </div>
    </Section>
  );
}
