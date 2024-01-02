import axios from "axios";
import cheerio from "cheerio";

const url = "https://f9c93ee4270640ecab783317284098e2.ent-search.us-central1.gcp.cloud.es.io/api/as/v1/engines/laptops-usa/search.json";

const headers = {
  "Authorization": "Bearer search-rb7yrqtdfv7t5gg4oav9tgtw",
  "Content-Type": "application/json",
  "origin": "strict-origin-when-cross-origin"
};

const body = {
  "query": "",
  "page": { "current": 1, "size": 7 },
  "sort": { "popularity_last30days": "desc" }
};



const api_search = async (query, page = 1) => {
  body.query = query;
  body.page.current = page;

  const response = await axios.post(url, body, { headers });

  const results = response.data;

  return results;

}



/*

{
      // console.log(response.data);
      const data = response.data.results;
      const laptops = data.map((laptop) => laptop.name.raw);
      const objString = JSON.stringify(data[0])
      console.log(objString);
      const objParse = JSON.parse(objString);
      console.log(objParse);
      console.log(laptops)
    }

    const link = 'https://laptopmedia.com/laptop-specs/lenovo-ideapad-1-15-577/';

fetch(link)
  .then(response => response.text())
  .then(html => {
    // Lakukan manipulasi DOM atau operasi lain di sini
    const webPage = cheerio.load(html);

    const dataImage = webPage(".p-1");
    const images = [];

    for (let index = 0; index < dataImage.length; index++) {
      images.push(dataImage[index].attribs.href);
    }



    console.log(images);
  })
  .catch(error => console.error('Terjadi kesalahan:', error));





*/



export { api_search };

// api_search("satelit", 1);

// body.page.current = 2;
// console.log(body.page.current)