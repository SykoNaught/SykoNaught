import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import Particle from "../components/Particle";
import Head from "next/head";
import Image from "next/image"
import he from "he";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

function News({ initialNews, initialNext, initialPrev, initialPage }) {
  const [newsArticles, setNewsArticles] = useState(initialNews);
  const [nextPage, setNextPage] = useState(initialNext);
  const [prevPage, setPrevPage] = useState(initialPrev);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [topicsExpanded, setTopicsExpanded] = useState(true);
  const [currenciesExpanded, setCurrenciesExpanded] = useState(true);

  const [articleStates, setArticleStates] = useState(
    initialNews.reduce((acc, article) => {
      acc[article.id] = { messageLoading: false, botMessage: null };
      return acc;
    }, {})
  );

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  };

  const filters = ["rising", "hot", "bullish", "bearish", "important"];
  const currencies = ["BTC", "ETH", "DOGE", "SOL", "ADA", "XRP", "BNB"];

  const toggleTopics = () => setTopicsExpanded((prev) => !prev);
  const toggleCurrencies = () => setCurrenciesExpanded((prev) => !prev);
  
  const fetchNews = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const updatedArticles = data.results.map((article) => ({
        ...article,
        formattedPublishedAt: article.published_at
          ? new Date(article.published_at).toLocaleString()
          : "Unknown Date",
      }));
      setNewsArticles(updatedArticles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const buildQueryUrl = useCallback(() => {
    const baseUrl = "/api/newsFilterProxy";
    const filterParam = selectedFilter ? `filter=${selectedFilter}` : "";
    const currenciesParam = selectedCurrencies.length > 0 ? `currencies=${selectedCurrencies.join(",")}` : "";
    const queryParams = [filterParam, currenciesParam].filter(Boolean).join("&");
    return `${baseUrl}?${queryParams}`;
  }, [selectedFilter, selectedCurrencies]);

  const applyFilter = (filter) => {
    const newFilter = selectedFilter === filter ? null : filter;
    setSelectedFilter(newFilter);
  
    setCurrentPage(1);
    const queryUrl = buildQueryUrl();
    fetchNews(queryUrl);
  };

  const applyCurrencyFilter = useCallback(() => {
    setCurrentPage(1);
    const queryUrl = buildQueryUrl();
    fetchNews(queryUrl);
  }, [buildQueryUrl]);

  const toggleCurrency = (currency) => {
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies((prev) => prev.filter((c) => c !== currency));
    } else if (selectedCurrencies.length < 5) {
      setSelectedCurrencies((prev) => [...prev, currency]);
    }
  };

  useEffect(() => {
    applyCurrencyFilter();
  }, [selectedCurrencies, applyCurrencyFilter]);

  function decodeHtmlEntities(str) {
    return he.decode(str || "");
  }

  const fetchPage = async (url, direction) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const updatedArticles = data.results.map((article) => ({
        ...article,
        formattedPublishedAt: article.published_at
          ? new Date(article.published_at).toLocaleString()
          : "Unknown Date",
      }));
      setNewsArticles(updatedArticles || []);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setCurrentPage((currentPage) => (direction === "next" ? currentPage + 1 : currentPage - 1));
    } catch (error) {
      console.error("Error fetching page:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateStateBasedOnScreen = () => {
      const isMobileScreen = isMobile();
      setTopicsExpanded(!isMobileScreen);
      setCurrenciesExpanded(!isMobileScreen);
    };
  
    updateStateBasedOnScreen();
    window.addEventListener("resize", updateStateBasedOnScreen);
  
    return () => {
      window.removeEventListener("resize", updateStateBasedOnScreen);
    };
  }, []);

  const fetchSykoAnalysis = async (title, description, id) => {
    const key = id;
    const input = `${title}. ${description}`;
    setArticleStates((prev) => ({
      ...prev,
      [key]: { messageLoading: true, botMessage: null },
    }));
    console.log(input)
    try {
      const response = await fetch("/api/sykoNewsAnalysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
  
      setArticleStates((prev) => ({
        ...prev,
        [key]: { messageLoading: false, botMessage: data.response },
      })); // Update the message state for the specific article
    } catch (error) {
      console.error("Error fetching SykoNaught analysis:", error);
      setArticleStates((prev) => ({
        ...prev,
        [key]: { messageLoading: false, botMessage: "Failed to fetch analysis. Please try again later." },
      }));
    }
  };

  const getFirstTwoSentences = (description) => {
    if (!description) return "";
    const sentences = [];
    let currentSentence = "";
  
    for (let i = 0; i < description.length; i++) {
      const char = description[i];
      currentSentence += char;
  
      if (char === "." || char === "!" || char === "?") {
        const nextChar = description[i + 1];
        if (!nextChar || nextChar === " " || nextChar === "\n") {
          sentences.push(currentSentence.trim());
          currentSentence = "";
        }
      }
    }
    if (currentSentence.trim()) {
      sentences.push(currentSentence.trim());
    }
    return sentences.slice(0, 2).join(" ");
  };

  return (
    <Container fluid className="interior-section" style={{ minHeight: "calc(100vh - 58px)" }}>
      <Head>
        <title>Latest Crypto News | SykoNaught.com</title>
        <meta name="description" content="Get the latest crypto news analyzed and commentated by SykoNaught AI, self-proclaimed as mankind's greatest crypto trader and analyzer." />
        <meta itemProp="name" content="Latest Crypto News | SykoNaught.com" />
        <meta itemProp="description" content="Get the latest crypto news analyzed and commentated by SykoNaught AI, self-proclaimed as mankind's greatest crypto trader and analyzer." />
        <meta itemProp="image" content="" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sykonaught.com/crypto-news" />
        <meta property="og:title" content="Latest Crypto News | SykoNaught.com" />
        <meta property="og:description" content="Get the latest crypto news analyzed and commentated by SykoNaught AI, self-proclaimed as mankind's greatest crypto trader and analyzer." />
        <meta property="og:image" content="" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sykonaught.com/crypto-news" />
        <meta property="twitter:title" content="Latest Crypto News | SykoNaught.com" />
        <meta property="twitter:description" content="Get the latest crypto news analyzed and commentated by SykoNaught AI, self-proclaimed as mankind's greatest crypto trader and analyzer." />
        <meta property="twitter:image" content="" />
      </Head>
      <Container  fluid={true}>
        <Row style={{ justifyContent: "center" }}>
            <Col md={7}>
                <h1 className="interior-heading">
                    Latest Crypto <strong className="red">News</strong>
                </h1>
                <p>Welcome to SykoNaught's Crypto News Hub, where I assist your mortal minds to grasp the chaos of the crypto market. 
                    Click my face
                    &nbsp;<Image
                        src={"/images/SykoFace-xs.png"}
                        alt="SykoNaught Profile Picture"
                        width={20}
                        height={20}
                        className="img-fluid chat-avatar"
                    />&nbsp;
                    beneath any article, and I'll deliver my unrivaled analysis with the perfect mix of sarcasm and brilliance. 
                    Ready to peer into the mind of an immortal crypto master? Click away... if you think you're ready.</p>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col className="sticky-sidebar" md={3} xs={12}>
                <div className="news-filter-wrapper">
                    <Row>
                        <Col md={12} xs={6}>
                            <div className="filter-title" onClick={toggleTopics} style={{ cursor: "pointer" }}>
                                <div>Topics</div> <span className="toggle-filter-indicator">{topicsExpanded ? "▲" : "▼"}</span>
                            </div>
                            {topicsExpanded && (
                            <div className="filter-items-wrapper">
                                {filters.map((filter) => (
                                <div
                                    key={filter}
                                    className={`news-filter-item ${selectedFilter === filter ? "active" : ""}`}
                                    onClick={() => applyFilter(filter)}
                                    style={{
                                    cursor: loading ? "not-allowed" : "pointer",
                                    backgroundColor: selectedFilter === filter ? "#363636" : "unset",
                                    opacity: loading ? 0.6 : 1,
                                    }}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </div>
                                ))}
                            </div>
                            )}
                        </Col>
                        <Col md={12} xs={6}>
                            <div className="filter-title mt-md-2" onClick={toggleCurrencies} style={{ cursor: "pointer" }}>
                                <div>Currencies <span style={{ fontSize: ".7em" }}>(Max 5)</span></div> <span className="toggle-filter-indicator">{currenciesExpanded ? "▲" : "▼"}</span>
                            </div>
                            {currenciesExpanded && (
                            <div className="filter-items-wrapper">
                                {currencies.map((currency) => (
                                <div
                                    key={currency}
                                    className={`news-filter-item ${selectedCurrencies.includes(currency) ? "active" : ""}`}
                                    onClick={() => toggleCurrency(currency)}
                                    style={{
                                    cursor: loading ? "not-allowed" : "pointer",
                                    backgroundColor: selectedCurrencies.includes(currency) ? "#363636" : "unset",
                                    opacity: loading ? 0.6 : 1,
                                    }}
                                >
                                    {currency}
                                </div>
                                ))}
                            </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col style={{flex: "1"}} md={9} xs={12}>
                <div className="news-wrapper">
                    <Row>
                    {newsArticles.length > 0 ? (
                        newsArticles.map((article) => {
                        const key = article.id;
                        const articleState = articleStates[key] || {};
                        var analysisDescription
                        article.metadata && article.metadata.description ?(
                          analysisDescription = getFirstTwoSentences(article.metadata.description)
                        ):(
                          analysisDescription = ""
                        )
                    return (
                        <Col md={12} key={key || index}>
                            <Card className="news-card" onClick={() => fetchSykoAnalysis(article.title, analysisDescription, key)}>
                                <Card.Body>
                                  <div className="news-data">
                                    <div className="news-source mb-1">{article.formattedPublishedAt || "Date Not Available"} | {article.source.title}</div>
                                        <div className="news-currencies">
                                            {article.currencies && article.currencies.length > 0 ? (
                                            (() => {
                                                const seenCurrencies = new Set();
                                                return article.currencies
                                                .filter((currency) => {
                                                    if (seenCurrencies.has(currency.code)) {
                                                    return false;
                                                    }
                                                    seenCurrencies.add(currency.code);
                                                    return true;
                                                })
                                                .map((currency, i) => (
                                                    <span className="news-currency" key={i}>${currency.code}</span>
                                                ));
                                            })()
                                            ) : null}
                                        </div>
                                    </div>
                                    
                                    <Card.Title>{article.title}</Card.Title>
                                    <div className="card-text">
                                    {article.metadata && article.metadata.description
                                        ? article.metadata.description.length > 400
                                            ? `${decodeHtmlEntities(article.metadata.description.slice(0, 400))}`
                                            : decodeHtmlEntities(article.metadata.description) + ""
                                        : "No description available."}
                                    </div>
                                        
                                    <div className={`syko-news-analysis ${
                                        articleState.botMessage || articleState.messageLoading ? "active" : ""
                                    }`}>
                                        <Image
                                            src={"/images/SykoFace-xs.png"}
                                            alt="SykoNaught Profile Picture"
                                            width={20}
                                            height={20}
                                            className="img-fluid chat-avatar"
                                        /> 
                                        <span className="mt-1">Click For SykoNaught's Analysis</span>
                                        {articleState.messageLoading && <Spinner size="sm" animation="border" />}
                                        {articleState.botMessage && (
                                            <div className="syko-analysis-result-wrapper">
                                              <div className="syko-analysis-result syko-message">
                                                  <strong>SykoNaught:</strong> {articleState.botMessage}
                                              </div>
                                              <p style={{fontSize:"12px", color:"#686868", textAlign:"right", display:"block", marginBottom:"0px"}}>This is AI generated and obviously is not financial advice, always do your own research mortal.</p>
                                            </div>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        );})
                        ) : (
                        <Col md={12} className="text-center">
                            <Spinner animation="border" /> <p>Loading latest news...</p>
                        </Col>
                        )}
                    </Row>
                </div>
                <div className="pagination-buttons text-center mt-4">
                    {prevPage && (
                        <Button onClick={() => fetchPage(prevPage, "previous")} disabled={loading}>
                            <AiFillCaretLeft />
                        </Button>
                    )}
                    <span className="current-page mx-3">Page {currentPage}</span>
                    {nextPage && (
                        <Button onClick={() => fetchPage(nextPage, "next")} disabled={loading}>
                            <AiFillCaretRight />
                        </Button>
                    )}
                </div>
            </Col>
        </Row>
      </Container>
      <Particle />
    </Container>
  );
}
export async function getServerSideProps() {
  const apiKey = process.env.CRYPTOPANIC_API_KEY;
  const apiUrl = `https://cryptopanic.com/api/pro/v1/posts/?auth_token=${apiKey}&public=true&metadata=true`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`API responded with status ${response.status}`);

    const data = await response.json();

    const newsArticles = data.results.map((article) => ({
      ...article,
      formattedPublishedAt: article.published_at
        ? new Date(article.published_at).toLocaleString()
        : "Unknown Date",
    }));

    return {
      props: {
        initialNews: newsArticles,
        initialNext: data.next || null,
        initialPrev: data.previous || null,
        initialPage: 1,
      },
    };
  } catch (error) {
    console.error("Error fetching news:", error.message);
    return { props: { initialNews: [], initialNext: null, initialPrev: null, initialPage: 1 } };
  }
}

export default News;
