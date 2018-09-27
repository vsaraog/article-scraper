const express = require('express')
const logger = require("morgan");
const bodyParser = require('body-parser')

const app = new express()

// VIK_TODO: Probably move it to route folder
app.use(express.static('public'))

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes').init(app)

const port = 3001

app.listen(port, (err, data) => {
    if (err) {
        console.log("Error listening to port");
        return err;
    }

    console.log(`Listening on port ${port}`)
})
