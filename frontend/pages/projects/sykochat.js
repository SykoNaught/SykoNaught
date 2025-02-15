import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col} from "react-bootstrap";
import Particle from "../../components/Particle";
import { AiOutlineSend } from "react-icons/ai";
import Head from "next/head";

const ChatBot = (props) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false); // Track loading state

    // Create a ref for the messages container
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the messages container
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Trigger scrolling whenever messages or loading state changes
    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "User", text: input };
        setMessages([...messages, userMessage]);
        setLoading(true); // Set loading to true when waiting for a response

        try {
            const response = await fetch("https://sykonaught.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            const botMessage = { sender: "SykoNaught", text: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "SykoNaught", text: "Error: Unable to process your message." },
            ]);
        }

        setLoading(false); // Stop loading after receiving a response
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default Enter behavior (like form submission)
            sendMessage();
        }
    };

    return (
        <Container fluid className="interior-section" style={{ minHeight: !props.isMobile ?("calc(100vh - 58px)") : ("calc(100vh)") }}>
            <Head>
                <title>Chat With SykoNaught AI | SykoNaught.com</title>
                <meta name="description" content="Chat with the one and only SykoNaught AI. Learn from his vast knowledge" />

                <meta itemprop="name" content="Chat With SykoNaught AI | SykoNaught.com"/>
                <meta itemprop="description" content="Chat with the one and only SykoNaught AI. Learn from his vast knowledge"/>
                <meta itemprop="image"
                    content="https://sykonaught.com/images/projects/sykochat.png"/>

                <meta property="og:url" content="https://sykonaught.com/sykochat"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="Chat With SykoNaught AI | SykoNaught.com"/>
                <meta property="og:description" content="Chat with the one and only SykoNaught AI. Learn from his vast knowledge"/>
                <meta property="og:image"
                    content="https://sykonaught.com/images/projects/sykochat.png"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="Chat With SykoNaught AI | SykoNaught.com"/>
                <meta name="twitter:description" content="Chat with the one and only SykoNaught AI. Learn from his vast knowledge"/>
                <meta name="twitter:image"
                    content="https://sykonaught.com/images/projects/sykochat.png"/>
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
                        Chat With <span className="red">SykoNaught</span> AI
                    </h1>
                    
                    </Col>
                </Row>
            </Container>
            <Container>
                <div className="chat-box">
                    <div style={{
                        height: !props.isMobile ?("calc(70vh - 58px)") : ("calc(80vh - 58px)"),
                        overflowY: "auto",
                        padding: "20px",
                    }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: msg.sender === "User" ? "right" : "left",
                                    margin: "10px 0",
                                }}
                            >   
                                {msg.sender === "User" ? (
                                    <span className="user-message">
                                        <p style={{margin:"0px"}}>{msg.text}</p>
                                    </span>
                                ):(
                                    <span>
                                        <span className="red" style={{display:"block"}}>{msg.sender}:</span> <p className="syko-message">{msg.text}</p>
                                    </span>
                                )}
                                
                            </div>
                        ))}
                        {/* Show loading indicator while waiting for a response */}
                        {loading && (
                            <div
                                style={{
                                    textAlign: "left",
                                    margin: "10px 0",
                                }}
                            >
                                <span className="red">SykoNaught:</span>
                                <div>
                                    <div 
                                        className="pulse-animation"
                                        style={{animationDelay: "0s"}}
                                    ></div>
                                    <div 
                                        className="pulse-animation"
                                        style={{animationDelay: "0.5s"}}
                                    ></div>
                                    <div
                                        className="pulse-animation"
                                        style={{animationDelay: "1s"}}
                                    ></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="d-flex" style={{borderTop: "2px solid #101010"}}>
                        <input
                            type="text"
                            className="sykochat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress} // Listen for the Enter key
                            placeholder="Type a message... (He's An Asshole)"
                            style={{ width: "100%" }}
                        />
                        <button className="send-button" onClick={sendMessage}><AiOutlineSend /></button>
                    </div>
                </div>
            </Container>
            <Particle />
        </Container>
    );
};

export default ChatBot;
