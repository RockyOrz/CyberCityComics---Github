const axios = require("axios");

async function getLatestComic(route) {
  try {
    const response = await axios.get(route);
    return response.data;
  } catch (err) {
    return
  }
}

module.exports = getLatestComic;
