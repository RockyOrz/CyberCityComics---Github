const express = require("express");
const cors = require("cors");
const app = express();
const comicRoute = require("./comic");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/comics', comicRoute);


app.listen(PORT, () => {
    console.log('Server running on port 3000')
})