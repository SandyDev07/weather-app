import React, { useState } from "react";

const Contact = () => {
  const [name, setname] = useState("");
  const [passwrod, setpasswrod] = useState("");
  const fetchtchData = () => {};

  const sendFormData = () => {
    const data = {
      name: name,
      passwrod: passwrod,
    };
    const url = "https://2342/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res)=>(res.json()))
    .then((actResponse)=>console.log(actResponse)).catch((err)=>(err));
  };
  return (
    <>
      <form action="">
        <label htmlFor="name">FirstName</label>
        <input type="text" placeholder="Name" />
        <label htmlFor="name">passwrod</label>
        <input type="text" placeholder="Name" />
        <button onClick={sendFormData}>submit</button>
      </form>
    </>
  );
};

export default Contact;
