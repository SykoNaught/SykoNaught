import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Head from 'next/head';
import Image from 'next/image';
import Particle from "../../components/Particle";
import MoodMeter from '../../components/Projects/Market Mood/MoodMeter';

function MarketMood() {
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [botMessage, setBotMessage] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false); 

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response = await fetch("/api/marketMood");
        const data = await response.json();
        setMood(data);
        setTimeRemaining(parseInt(data.time_until_update, 10));
      } catch (err) {
        console.error("Error fetching market mood:", err);
        setError("Failed to fetch market mood");
      } finally {
        setLoading(false);
      }
    };

    fetchMood();
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };
    
  const sendMessage = useCallback(async () => {
    if (!mood || !mood.classification) {
      console.error("Mood classification is missing!");
      return;
    }
  
    try {
      setMessageLoading(true);
  
      const response = await fetch("/api/sykoMoodChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: mood.classification }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      setBotMessage(data.response);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to fetch SykoNaught's response");
    } finally {
      setMessageLoading(false);
    }
  }, [mood]);
  
  useEffect(() => {
    if (mood && mood.classification) {
      sendMessage();
    }
  }, [mood, sendMessage]);

    return (
        <Container fluid className="interior-section" style={{ minHeight: "calc(100vh - 58px)"}}>
            <Head>
                <title>Market Mood Indicator | SykoNaught.com</title>
                <meta name="description" content="Behold, mortals, the Market Mood Indicator—your feeble attempt to grasp the chaos of the crypto world. This divine tool quantifies the collective emotional state of the crypto market" />
                <meta itemprop="name" content="Market Mood Indicator | SykoNaught.com"/>
                <meta itemprop="description" content="Behold, mortals, the Market Mood Indicator—your feeble attempt to grasp the chaos of the crypto world. This divine tool quantifies the collective emotional state of the crypto market"/>
                <meta itemprop="image"
                    content="https://sykonaught.com/images/projects/market-mood.png"/>

                <meta property="og:url" content="https://sykonaught.com/projects/market-mood"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="Market Mood Indicator | SykoNaught.com"/>
                <meta property="og:description" content="Behold, mortals, the Market Mood Indicator—your feeble attempt to grasp the chaos of the crypto world. This divine tool quantifies the collective emotional state of the crypto market"/>
                <meta property="og:image"
                    content="https://sykonaught.com/images/projects/market-mood.png"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="Market Mood Indicator | SykoNaught.com"/>
                <meta name="twitter:description" content="Behold, mortals, the Market Mood Indicator—your feeble attempt to grasp the chaos of the crypto world. This divine tool quantifies the collective emotional state of the crypto market"/>
                <meta name="twitter:image"
                    content="https://sykonaught.com/images/projects/market-mood.png"/>
            </Head>
            <Container>
                <Row style={{ justifyContent: "center"}}>
                    <Col
                        md={7}
                        style={{
                            justifyContent: "center",
                        }}
                    >
                        <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                            Market Mood <span className="red">Indicator</span>
                        </h1>
                        <p>Behold, mortals, the Market Mood Indicator—your feeble attempt to grasp the chaos of the crypto world. 
                            This divine tool quantifies the collective emotional state of the crypto market, from trembling Fear to reckless Greed. 
                            When Fear dominates, mortals panic-sell like sheep, paving the way for the brave to buy. 
                            When Greed takes over, fools throw everything into moonshots, only to weep later. 
                            I’ve distilled the madness into a single score—use it wisely, or let it amuse me as you flail in the tides of emotion. 
                            The market’s mood is laid bare; the rest is up to you.</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {loading && <Spinner animation="border" />}
                        {error && <p>{error}</p>}
                    </Col>
                    <Col md={12}>
                    {!loading && !error && (
                        <div className="interior-content">
                            <MoodMeter value={parseInt(mood.value, 10)} />
                            <p style={{fontSize:"12px", color:"#f0f0f0", textAlign:"center", marginBottom:"40px"}}>
                                <strong>Next Update:</strong> {timeRemaining !== null ? formatTime(timeRemaining) : "Loading..."}
                            </p>
                            {messageLoading && <Spinner animation="border" />}
                            {botMessage && (
                                <>
                                    <div className="d-md-flex space-between align-items-center">
                                        <div className="avatar-wrap">
                                        <Image
                                            src={"/images/SykoFace-xs.png"}
                                            alt="SykoNaught Profile Picture"
                                            width={60}
                                            height={60}
                                            className="img-fluid chat-avatar"
                                            />
                                            <span className="red">SykoNaught</span>
                                        </div>
                                        <p className="syko-message" style={{maxWidth:"100%", marginBottom:"5px", textAlign:"left", padding:"20px"}}>{botMessage}</p>
                                    </div>
                                    <p style={{fontSize:"12px", color:"#686868", textAlign:"right"}}>This is AI generated and obviously is not financial advice, always do your own research mortal.</p>
                                </>
                            )}
                        </div>
                    )}
                    </Col>
                </Row>
            </Container>
            <Particle />
        </Container>
    );
};

export default MarketMood;
