import axios from "axios";
import "dotenv/config";
import cheerio from "cheerio";

const url =
    "https://f9c93ee4270640ecab783317284098e2.ent-search.us-central1.gcp.cloud.es.io/api/as/v1/engines/laptops-usa/search.json";

const headers = {
    Authorization: process.env.BEARER_TOKEN,
    "Content-Type": "application/json",
    origin: "strict-origin-when-cross-origin"
};

const body = {
    query: "",
    page: { current: 1, size: 7 },
    sort: { popularity_last30days: "desc" }
};

const api_search = async (query, page = 1) => {
    body.query = query;
    body.page.current = page;

    const response = await axios.post(url, body, { headers });
    const results = response.data;

    return results;
};

const imageExtractor = async link => {
    const response = await fetch(link);
    const html = await response.text();
    const webPage = cheerio.load(html);

    const dataImage = webPage(".p-1");
    const images = [];

    for (let index = 0; index < dataImage.length; index++) {
        if (dataImage[index].attribs.href !== "#") {
            images.push(dataImage[index].attribs.href);
        }
    }

    return images;
};

export { api_search, imageExtractor };
