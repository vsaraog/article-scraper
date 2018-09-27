/* <div class="container">
<div class="row">
    <div class="col-sm">
        One of three columns
    </div>
</div>
<div class="row">
    <div class="col-sm">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Card title <a href="#" class="btn btn-primary">Go somewhere</a></h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
            </div>
        </div>
    </div>
</div>
</div> */

$(function() {
$('.btn-scrape').on('click', function() {
    console.log('Sending to scrape route')
    $.ajax('/scrape')
    .then(data => {
        console.log(data)
        populateArticles(data)
    })

})

$('.btn-saved-article').on('click', function() {
    console.log('Getting saved articles')
    $.ajax('/saved-article')
    .then(data => {
        console.log(data)
        // populateArticles(data)
    })

})

$('.container').on('click', '.btn-save-article', function(evt) {
    console.log('Saving the article')
    // Get id from the button
    const urlMd5 = $(evt.target).data('url-md5')
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

    function buildArticleRow(article) {
        let rowDiv = $('<div>').addClass('row')
        let colDiv = $('<div>').addClass('col-sm')
        let cardDiv = $('<div>').addClass('card')
        let cardBodyDiv = $('<div>').addClass('card-body')
        let cardTitle = $('<h5>').addClass('card-title')
        let cardText = $('<p>').addClass('card-text')
        let saveDiv = $('<div>').addClass('btn btn-primary btn-save-article')

        cardTitle.text(article.title)
        cardText.text(article.link)
        saveDiv.text("Save Article")
        saveDiv.data('url-md5', article.urlMd5)

        cardTitle.appendTo(cardBodyDiv)
        cardText.appendTo(cardBodyDiv)
        saveDiv.appendTo(cardBodyDiv)
        cardBodyDiv.appendTo(cardDiv)
        cardDiv.appendTo(colDiv)
        colDiv.appendTo(rowDiv)
        rowDiv.appendTo(container)
    }
}
})