import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Particle from "../../Particle";
import { Typeahead } from "react-bootstrap-typeahead";
import Datetime from 'react-datetime';


function RegretCalc() {

  return (
    <Container fluid className="interior-section">
      
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            className="interior-content"
            style={{
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Crypto <span className="red">Regret</span> Calculator
            </h1>
            <p>
              Check out the Crypto Regret Calculator, your personal tormentor for all the wealth you let slip through your fingers. Choose the crypto you balked at, the date you chickened out, and the amount you should've wagered. This cruel device will then lay bare the staggering fortune you could have secured, not just for yourself but for generations of your bloodline to retire in luxury. But no, you hesitated, and now you're left to wallow in the bitter reality of what could have been, if only you hadn't been such a spineless investor.
            </p>
            <p>Refer back to here whenever your grandchildren ask you why they have to work for a living while you FUDed during the great crypto revolution.</p>
          </Col>
        </Row>
        
        <Row className="interior-content">
          {/*
          <Col md={12} style={{paddingTop:"2rem"}}>
            <h2>Shoulda Woulda Coulda</h2>
          </Col>
          <Col md={4}>
          <p>Select the coin</p>
          <Typeahead id="ddl"
              onChange={(selected) => {
                console.log(selected);
              }}
              options={[ '', 'BTC', 'ETH', 'ADA', 'DOGE', 'SHIB', 'SOL', 'LUNA', 'AVAX', 'DOT', 'UNI', 'LINK', 'MATIC', 'XRP', 'LTC', 'BCH', 'ALGO', 'ATOM', 'ICP', 'FIL', 'TRX', 'ETC', 'VET', 'XLM', 'XTZ', 'AAVE', 'FTT', 'EOS', 'THETA', 'MKR', 'XMR', 'NEO', 'CRO', 'BSV', 'HT', 'MIOTA', 'DASH', 'HBAR', 'TFUEL', 'ZEC', 'WAVES', 'KSM', 'COMP', 'CHZ', 'HOT', 'DCR', 'ENJ',]}
            />
          </Col>
          <Col md={4}>
          <p>Select the date</p>
          <Datetime />
          </Col>
          <Col md={4}>
            <p>How much did you FUD?</p>
            <Form.Control type="text" placeholder="How Much?" />
          </Col>
          */}
          <h2>Coming <span className="red">Soon...</span></h2>
          <br/><br/><br/><br/><br/><br/>
        </Row>
        
        
      </Container>
      <Particle />
    </Container>

  );
}

export default RegretCalc;
