import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Particle from "../../Particle";
import { Typeahead } from "react-bootstrap-typeahead";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Tooltip } from 'react-tooltip'
import { AiOutlineCopy } from "react-icons/ai";

function RegretCalc() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [historicalPrice, setHistoricalPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [fudAmount, setFudAmount] = useState(0);
  const [profit, setProfit] = useState(null);
  const [error, setError] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [copied, setCopied] = useState(false);

  
  // Calculate timestamp from selectedDate
  const timestamp = selectedDate ? Math.floor(new Date(selectedDate).getTime() / 1000) : null;

  const formatCurrency = (value) => {
    if (isNaN(value)) return "Unavailable";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText("https://sykonaught.com/projects/crypto-regret?c=" + selectedCoin[0]?.id + "&d=" + timestamp + "&f=" + fudAmount)

    console.log(copied)
  };
  // Parse URL parameters on initial load and trigger calculation if all parameters exist
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const coinParam = urlParams.get("c");
  const dateParam = urlParams.get("d");
  const fudParam = urlParams.get("f");

  if (fudParam) setFudAmount(Number(fudParam));
  if (dateParam) setSelectedDate(new Date(Number(dateParam) * 1000)); // Convert UNIX timestamp to Date

    if (coinParam && coins.length > 0) {
      const matchedCoin = coins.find((coin) => coin.id.toLowerCase() === coinParam.toLowerCase());
      if (matchedCoin) {
        setSelectedCoin([matchedCoin]);
      }
    }
  }, [coins]);

  // Automatically calculate on first load if all fields are populated
  useEffect(() => {
    if (
      firstLoad &&
      selectedCoin.length > 0 &&
      selectedDate &&
      fudAmount > 0
    ) {
      fetchPrices();
      setFirstLoad(false); // Disable further automatic calculations
    }
  }, [firstLoad, selectedCoin, selectedDate, fudAmount]);


// Fetch coin list and cache
useEffect(() => {
  const fetchCoins = async () => {
    try {
      const cachedCoins = localStorage.getItem("coinList");
      if (cachedCoins) {
        setCoins(JSON.parse(cachedCoins));
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?api_key=b4452393ced7caa2721b88f21356f268e663cb18cc669cd8d4c8ee125c368a31"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch coins: ${response.status}`);
      }
      const data = await response.json();

      const coinOptions = Object.keys(data.Data).map((key) => ({
        id: key,
        name: data.Data[key].FullName,
      }));

      setCoins(coinOptions);
      localStorage.setItem("coinList", JSON.stringify(coinOptions));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error);
      setError("Failed to fetch coin list. Please try again.");
      setLoading(false);
    }
  };

  fetchCoins();
}, []);

  const fetchPrices = async () => {
    if (!selectedCoin.length || !selectedDate || fudAmount <= 0) {
      setError("Please ensure all fields are populated.");
      return;
    }
    setError(null);
    setCalculating(true);

    const coinSymbol = selectedCoin[0]?.id;

    try {
      const historicalUrl = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coinSymbol}&tsyms=USD&ts=${timestamp}&api_key=b4452393ced7caa2721b88f21356f268e663cb18cc669cd8d4c8ee125c368a31`;
      const historicalResponse = await fetch(historicalUrl);
      if (!historicalResponse.ok) {
        throw new Error(`Historical API returned status ${historicalResponse.status}`);
      }
      const historicalData = await historicalResponse.json();
      const historical = historicalData[coinSymbol]?.USD || "Unavailable";

      const currentUrl = `https://min-api.cryptocompare.com/data/price?fsym=${coinSymbol}&tsyms=USD&api_key=b4452393ced7caa2721b88f21356f268e663cb18cc669cd8d4c8ee125c368a31`;
      const currentResponse = await fetch(currentUrl);
      if (!currentResponse.ok) {
        throw new Error(`Current price API returned status ${currentResponse.status}`);
      }
      const currentData = await currentResponse.json();
      const current = currentData.USD || "Unavailable";

      setHistoricalPrice(historical);
      setCurrentPrice(current);

      if (historical && current && fudAmount > 0) {
        const coinsPurchased = fudAmount / historical;
        const potentialProfit = coinsPurchased * current;
        setProfit(potentialProfit);
      } else {
        setProfit(null);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      setError(error.message || "Failed to fetch prices. Please try again.");
    } finally {
      setCalculating(false);
    }
  };

  return (
    <Container fluid className="interior-section" style={{ minHeight: "calc(100vh - 58px)" }}>
      <Container>
        <Row style={{ justifyContent: "center"}}>
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
          <p>Check out the Crypto Regret Calculator, your personal tormentor for all the wealth you let slip through your fingers. Choose the crypto you balked at, the date you chickened out, and the amount you should've wagered. This cruel device will then lay bare the staggering fortune you could have secured, not just for yourself but for generations of your bloodline to retire in luxury. But no, you hesitated, and now you're left to wallow in the bitter reality of what could have been, if only you hadn't been such a spineless investor.</p>
        </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Typeahead
              id="coin-select"
              className="mb-2"
              onChange={(selected) => setSelectedCoin(selected)}
              options={coins}
              isLoading={loading}
              placeholder={loading ? "Loading coins..." : "Select a coin"}
              labelKey="name" // Use the correct key for display
              selected={selectedCoin || []}
            />
          </Col>
          <Col md={3}>
            <Datetime
              className="mb-2"
              onChange={(date) => setSelectedDate(date)}
              inputProps={{ placeholder: "Select a date" }}
              isValidDate={(current) => current.isBefore(Datetime.moment())}
              timeFormat={false}
              value={selectedDate || ""}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              className="mb-2"
              id="fudAmount"
              placeholder="$ Amount you FUDed"
              onChange={(e) => setFudAmount(Number(e.target.value))}
              value={fudAmount || ""}
            />
          </Col>
          <Col md={3}>
            <Button variant="primary" onClick={fetchPrices} style={{ width: "100%" }}>
              {calculating ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Calculate Regret"
              )}
            </Button>
          </Col>
        </Row>

        {error && (
          <Row className="mt-3">
            <Col md={12}>
              <p className="text-danger">{error}</p>
            </Col>
          </Row>
        )}

        {calculating && (
          <Row className="mt-3">
            <Col md={12} className="text-center">
              <Spinner size="md" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        )}
          
        {!calculating && historicalPrice && currentPrice && (
          <div className="regret-results-card mt-5 mb-5">
            <Row>
              <Col md={12}>
                <h2 className="mb-5 mt-3">{currentPrice > historicalPrice ? <span>Your Bloodline Is <span className="red">Disappointed</span></span> : <span>You Got <span className="red">Lucky</span></span>}</h2>
              </Col>
            </Row>
            <hr />
            <Row className="mt-5">
              <Col md={4}>
                <p>
                  Historical Price
                </p>
                <p style={{fontSize: "1.5em"}}>
                  <strong>{formatCurrency(historicalPrice)}</strong>
                </p>
              </Col>
              <Col md={4}>
                <p>Multiplier</p>
                <p style={{fontSize: "1.5em"}}><strong>{(currentPrice / historicalPrice).toFixed(1)}X </strong>{currentPrice > historicalPrice ? "Profit" : "Loss"}</p>
              </Col>
              <Col md={4}>
                <p>
                  Current Price
                </p>
                <p style={{fontSize: "1.5em"}}>
                  <strong>{formatCurrency(currentPrice)}</strong>
                </p>
              </Col>
            </Row>
            <hr />
            {profit !== null && (
              <>
              <Row className="mt-5">
                <Col md={6}>
                  <p style={{fontSize: "2.5em"}}>
                    <strong>{(fudAmount / historicalPrice).toFixed(4)}</strong> {selectedCoin[0]?.id}
                  </p>
                </Col>
                <Col md={6}>
                  <p style={{fontSize: "2.5em"}}>
                    <strong style={{color: profit > 0 ? "#109d00" : "#b12222"}}>{formatCurrency(profit)}</strong>
                  </p>
                </Col>
              </Row>
              {currentPrice > historicalPrice && (
                <>
                <hr />
                <Row className="mt-5">
                  <Col md={12}>
                    <p style={{fontSize: "1.5em"}}>Had you just grown a pair and spent the damn {formatCurrency(fudAmount)} on 
                      {selectedDate
                      ? " " + new Date(selectedDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "the selected date"}{" "} 
                      like you know you wanted to, you would have <strong>{(currentPrice / historicalPrice).toFixed(1)}
                      X</strong>'d your investment and turned that measly {formatCurrency(fudAmount)} into a whopping <strong>{formatCurrency(profit)}</strong>.</p>
                      <p style={{fontSize: "1.5em"}}>Too bad you didn't and now you have to go sit at a desk for the next 20+ years instead of retiring on your yacht with a couple baddies.</p>
                      <div className="regret-highlight-box mt-5">
                        <p style={{fontSize: "1.5em"}}>When your grandchildren ask you why they have to work for a living while you fumbled hard during the greatest transfer of wealth in modern history, just send them this link to save yourself the shame of having to tell them to their sad little faces.</p>
                        <div className="d-flex justify-content-center">
                          <Form.Control
                            type="text"
                            id="copyLink"
                            className="project-copy-box"
                            disabled
                            value={"https://sykonaught.com/projects/crypto-regret?c=" + selectedCoin[0]?.id + "&d=" + timestamp + "&f=" + fudAmount}
                          />

                          <button className="project-copy-btn" onClick={handleCopy} data-tooltip-id="copy" data-tooltip-content="Copied!"><AiOutlineCopy /></button>
                        </div>
                        
                        <Tooltip id="copy" openOnClick="true" />
                      </div>
                  </Col>
                </Row>
                </>
              )}
              </>
            )}
          </div>
        )}
     </Container>
      <Particle />
    </Container>
  );
}

export default RegretCalc;