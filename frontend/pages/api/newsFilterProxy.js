export default async function handler(req, res) {
    const { filter, currencies } = req.query;
    const apiKey = process.env.CRYPTOPANIC_API_KEY;
  
    // Construct the base URL
    const baseUrl = `https://cryptopanic.com/api/pro/v1/posts/?auth_token=${apiKey}&public=true&metadata=true`;
  
    // Add query parameters for filter and currencies
    const filterParam = filter ? `&filter=${filter}` : "";
    const currenciesParam = currencies ? `&currencies=${currencies}` : "";
    const queryUrl = `${baseUrl}${filterParam}${currenciesParam}`;
  
    try {
      const response = await fetch(queryUrl);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  }
  