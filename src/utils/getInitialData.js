import axios from "axios";
import extractQueryParameters from "./convertUrlToParams";

const getInitialData = async (url, apiKey) => {
  const getUrl = `https://api.apollo.io/v1/mixed_people/search`;

  if (url.startsWith("https://app.apollo.io/")) {
    const postedData = extractQueryParameters(url);
    const body = { api_key: apiKey, per_page: 100, ...postedData };
    const res = await axios.post(getUrl, body, {
      headers: {
        // "Access-Control-Allow-Origin": "https://apollo-scraper.netlify.app",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } else {
    return false;
  }
};

export default getInitialData;
