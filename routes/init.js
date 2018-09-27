const cheerio = require('cheerio')
const request = require('request')
const mongoose = require("mongoose");
const md5 = require('md5')

var db = require("../models");


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleScraperdb", { useNewUrlParser: true });
let scrappedArticles = []

function routePaths(app) {
    app.get('/', (req, res) => {
        res.json("In default route")
    })

    app.get('/scrape', (req, res) => {
        // VIK_TODO: Move it to a separate function
        const url = 'http://slashdot.org'
        request(url, (err, resp, body) => {
            if (err) {
                console.log(`Error while requesting ${url} `, err)
                res.json(err)
            }
            else {
            console.log('loading the html body')
            const $ = cheerio.load(body)
            let results = []
            $('.story-title').each( (i, elem) => {
                const link = $(elem).children().attr('href')
                const title = $(elem).children().text()
                // VIK_TODO: Add "http" only when required
                scrappedArticles[md5(link)] = {title: title, link: `http${link}`}
                results.push({title: title, link: `http${link}`, urlMd5:md5(link)})
            })
            res.json(results)
            console.log(scrappedArticles)
        }
        })
    })

    app.post('/save-article', (req, res) => {
        // console.log(req)
        console.log('REQ BODY', req.body)
        const article = scrappedArticles[req.body.urlMd5]
        if (article) {
        article._id = req.body.urlMd5
        db.Article.create(article)
        .then(dbArticle => {
            res.json(dbArticle)
        })
        .catch(err => {
            res.json(err)
        })
    }
    else {
        res.json("Article not found")
    }
    })

    app.get('/saved-article', (req, res) => {
        db.Article.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
    })
}

module.exports = routePaths