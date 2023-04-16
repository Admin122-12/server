const baseRouter = require('./routes/route');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.set('trust proxy', 1)
// const config = require("./config.json");



// app.use(cors({
//     // origin: config.serverurl
//     origin: config.serverurl
// }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get("/", (req, res) => {
    res.send("<h1> Working Fine </h1>")
})

app.use('/api', baseRouter);

// const port = config.port;


const port = 3000;


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});