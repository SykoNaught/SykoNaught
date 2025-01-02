/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables strict mode for React
    swcMinify: true, // Enables SWC-based minification for better performance
    asyncHeaders() {
      return [
        {
          source: "/api/:path*", // Apply CORS headers to all API routes
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "https://sykonaught.com,, http://localhost:3000, http://localhost:3001", // Adjust to specific domains if needed
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;