$(function() {
$('.btn-scrape').on('click', function() {
    location = '/scrape'

    // $.ajax('/scrape')
    // .then(data => {
    //     console.log(data)
    //     populateArticles(data)
    // })
})

$('.btn-saved-articles').on('click', () => {
    location = '/saved-articles'
})

$(document).on('click', '.btn-save-article', () => {
    console.log('Saving the article')
    // Get id from the button
    const urlMd5 = $(this).data('url-md5')
    console.log(urlMd5)
    $.post('/save-article', {urlMd5: urlMd5})
    .then(data => {
        console.log('Article saved')
    })
    .catch(err => {
        console.log('Error saving article')
    })
})

function populateArticles(articles) {
    let container = $('.container')

    articles.forEach(element => {
        buildArticleRow(element)
    });

    // function buildArticleRow(article) {
    //     let rowDiv = $('<div>').addClass('row')
    //     let colDiv = $('<div>').addClass('col-sm')
    //     let cardDiv = $('<div>').addClass('card')
    //     let cardBodyDiv = $('<div>').addClass('card-body')
    //     let cardTitle = $('<h5>').addClass('card-title')
    //     let cardText = $('<p>').addClass('card-text')
    //     let saveDiv = $('<div>').addClass('btn btn-primary btn-save-article')

    //     cardTitle.text(article.title)
    //     cardText.text(article.link)
    //     saveDiv.text("Save Article")
    //     saveDiv.data('url-md5', article.urlMd5)

    //     cardTitle.appendTo(cardBodyDiv)
    //     cardText.appendTo(cardBodyDiv)
    //     saveDiv.appendTo(cardBodyDiv)
    //     cardBodyDiv.appendTo(cardDiv)
    //     cardDiv.appendTo(colDiv)
    //     colDiv.appendTo(rowDiv)
    //     rowDiv.appendTo(container)
    // }
}
})