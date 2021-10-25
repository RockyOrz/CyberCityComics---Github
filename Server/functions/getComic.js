const axios = require("axios");

async function getComic(route) {
  try {
    const response = await axios.get(route);
    return response.data;
  } catch (err) {
    return
  }
}

module.exports = getComic;
