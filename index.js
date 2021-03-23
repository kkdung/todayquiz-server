require('dotenv').config()
const express = require('express');
const router = require('./routes/router');
const app = express();
//4.16이후 버전 부터는 expres.json()으로 bodyparser내장
app.use(express.json());

//req.headers : HTTP의 Header 정보를 가지고 있다.
//healthcheck req
app.get('/todayquiz/health', (req, res) => {
    console.log(`health request : ${req.headers}`);
    return res.status(200).send('OK');
});

app.use('/todayquiz', router);

//??????????
app.use(function (err, req, res, next) {
    console.error(err.message);
    res.status(err.status).send(err.message);
});

//port listening
app.listen(process.env.PORT), () => {
    console.log(`tdadayQuiz app listening on port : ${process.env.PORT}`)
}