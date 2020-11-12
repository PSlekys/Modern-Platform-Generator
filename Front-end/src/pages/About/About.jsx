import React from "react";
import { Section, FormTemplate } from "../../components";

function About() {
  return (
    <Section fullWidth>
      <FormTemplate
        schemaURL="http://slekys.com/FormData.json"
        callbackURL="http://localhost:8080"
      />
    </Section>
  );
}

export default About;
