import axios from 'axios';

const API_KEY = process.env.LUNARCRUSH_API_KEY;
const BASE_URL = 'https://api.lunarcrush.com/v2/market';

export default async function handler(req, res) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
            },
        });

        if (response.status === 200) {
            res.status(200).json(response.data);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch market sentiment' });
        }
    } catch (error) {
        console.error('Error fetching market sentiment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
