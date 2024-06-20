import React from "react";
import "./contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
    <p>Contact Details : </p>
      <a className="mailBtn" href="mailto:thakuraryan7678@gmail.com" target="_blank">
        <Button>Mail: thakuraryan7678@gmail.com</Button>
      </a>
      <a className="mailBtn" href="https://www.linkedin.com/in/aryan-kumar-thakur" target="_blank">
        <Button>Linkedin: Aryan Thakur</Button>
      </a>
      <a className="mailBtn" href="https://www.instagram.com/itsme_aryan14/?next=%2F" target="_blank">
        <Button>Instagram: Aryan Thakur</Button>
      </a>
    </div>
  );
};

export default Contact;