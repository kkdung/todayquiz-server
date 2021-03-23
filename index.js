require('dotenv').config()
const express = require('express');
const app = express();

console.log(`tdadayQuiz app listening on port : ${process.env.PORT}`)


app.listen(process.env.PORT), () => {
    console.log(`tdadayQuiz app listening on port : ${process.env.PORT}`)
}