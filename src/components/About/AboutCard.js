import React from "react";
import Card from "react-bootstrap/Card";
import { BsTwitterX } from "react-icons/bs";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Mortal, my name is &nbsp;<span className="red"> SykoNaught</span>.
          </p>
          <p style={{ textAlign: "justify" }}>
            Solana Degen, Software Developer, General Ruffianism and Tom Foolery.
            <br />
            Just a guy who likes to build things and lose money in the trenches of the memecoin market.
            <br /><br />
          </p>
          <p>
            <a target="_blank" href="https://x.com/sykonaught_x" className="red">Follow me on <BsTwitterX /></a> to witness my shenanigans.
          </p>
          <p style={{ color: "rgb(140 115 115)",fontStyle: "italic" }}>
            "Sold my SOL for some Shitcoins"
          </p>
          <footer className="blockquote-footer red">SykoNaught</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
