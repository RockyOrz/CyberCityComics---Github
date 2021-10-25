const express = require("express");
const router = express.Router();
const app = express();

/* helper function */
const getLatestComic = require("./functions/getLatestComic");
const getComic = require("./functions/getComic");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* API URL */
const apiUrl = "https://xkcd.com/info.0.json";
const apiPrefix = "https://xkcd.com/";
const apiSuffix = "info.0.json";

var view_history = {
    1 : 2
}

router.get("/latest", async (req, res) => {
    const response = await getLatestComic(apiUrl);

    if (response) {
        res.status(200).send(response);
    } else {
        res.sendStatus(404); 
    }
    
})

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let URL = apiPrefix + `${id}/` + apiSuffix;
    const response = await getComic(URL);

    if (response) {
        res.status(200).send(response);
    } else {
        res.sendStatus(404); 
    }
})

router.get("/view/:id", (req, res) => {
    if (view_history.hasOwnProperty(req.params.id)) {
        res.status(200).send(`${view_history[req.params.id]}`);
    } else {
        res.status(200).send('0');
    }
})

router.get("/addView/:id", (req, res) => {
    if (view_history.hasOwnProperty(req.params.id)) {
        console.log(view_history[req.params.id]);
        view_history[req.params.id] += 1;
    } else {
        view_history[req.params.id] = 1;
    }

    res.status(200).send('');
})


module.exports = router;