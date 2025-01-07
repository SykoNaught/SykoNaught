import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://api.alternative.me/fng/");
    const data = response.data.data[0]; // Get the latest index data

    res.status(200).json({
      value: data.value,
      classification: data.value_classification,
      timestamp: data.timestamp,
      time_until_update: data.time_until_update,
    });
  } catch (error) {
    console.error("Error fetching Fear & Greed Index:", error);
    res.status(500).json({ error: "Failed to fetch Fear & Greed Index" });
  }
}
