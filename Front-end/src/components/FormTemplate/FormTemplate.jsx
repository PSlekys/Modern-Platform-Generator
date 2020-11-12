import React, { useState, useEffect } from "react";
import { Button } from "../";

function FormTemplate({ schemaURL, callbackURL }) {
  const [fields, setFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});

  useEffect(
    () =>
      fetch(`https://cors-anywhere.herokuapp.com/${schemaURL}`)
        .then((res) => res.json())
        .then((data) => setFields(data)),
    [schemaURL]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(fieldValues);
        fetch(callbackURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fieldValues),
        });
      }}
    >
      {fields.map((field) => (
        <input
          key={field.id}
          placeholder={field.labelText}
          onChange={(e) =>
            setFieldValues({ ...fieldValues, [field.id]: e.target.value })
          }
        />
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default FormTemplate;
