import Section from "./Section";
import Cards from "./Cards";
import { services } from "../data";

export default function Services() {
  return (
    <Section id="services" title="Services" sub="Everything you need to get your business online.">
      <Cards items={services} />
    </Section>
  );
}
