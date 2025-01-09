import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import Particle from "../components/Particle";
import Head from "next/head";
import Image from "next/image"
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
    if (!str) return str;
  
    return str
      .replace(/&#8217;/g, "'’'")
      .replace(/&#8221;/g, "”")
      .replace(/&#8220;/g, "“")
      .replace(/&#8216;/g, "‘")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#8230;/g, "...");
  }

  const fetchPage = async (url, direction) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNewsArticles(data.results || []);
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

  const fetchSykoAnalysis = async (title, id) => {
    const key = id;
    setArticleStates((prev) => ({
      ...prev,
      [key]: { messageLoading: true, botMessage: null },
    }));
  
    try {
      const response = await fetch("/api/sykoNewsAnalysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: title }),
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
  

  return (
    <Container fluid className="interior-section" style={{ minHeight: "calc(100vh - 58px)" }}>
      <Head>
        <title>News | SykoNaught.com</title>
        <meta name="description" content="The God King of the internet realm" />
        <meta itemProp="name" content="News | SykoNaught.com" />
        <meta itemProp="description" content="Get the latest crypto news aggregated by The God King of the internet realm" />
        <meta itemProp="image" content="" />
        <meta property="og:url" content="https://sykonaught.com/news" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="News | SykoNaught.com" />
        <meta property="og:description" content="Get the latest crypto news aggregated by The God King of the internet realm" />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News | SykoNaught.com" />
        <meta name="twitter:description" content="Get the latest crypto news aggregated by The God King of the internet realm" />
        <meta name="twitter:image" content="" />
      </Head>
      <Container  fluid={true}>
        <Row style={{ justifyContent: "center" }}>
            <Col md={7}>
                <h1 className="interior-heading">
                    Latest Crypto <strong className="red">News</strong>
                </h1>
                <p>Welcome to SykoNaught's Crypto News Hub, where your mortal minds attempt to grasp the chaos of the crypto market. 
                    Click my face
                    &nbsp;<Image
                        src={"/images/SykoFace-xs.png"}
                        alt="SykoNaught Profile Picture"
                        width={20}
                        height={20}
                        className="img-fluid chat-avatar"
                    />&nbsp;
                    next to any article, and I'll deliver my unrivaled analysis with the perfect mix of sarcasm and brilliance. 
                    As an immortal crypto master, I've seen it all, and trust me—you haven't. 
                    Dare to seek my wisdom? Click away, if you think you can handle it.</p>
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
                        const key = article.id; // Use a unique property like title or URL
                        const articleState = articleStates[key] || {}; // Default to an empty state

                    return (
                        <Col md={12} key={key || index}>
                            <Card className="news-card" onClick={() => fetchSykoAnalysis(article.title, key)}>
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
