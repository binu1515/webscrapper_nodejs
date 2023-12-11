const PORT = 7999
const axios = require('axios')
const cheerio = require('cheerio')
//import { Express } from 'express';
const express = require('express')


const app = express()

const url = 'https://jaihindtv.in/'

axios(url)
    .then(response => {
        const html = response.data
        //console.log(html)
        const $ =cheerio.load(html)
        const articles = []
        $('.dotted-li', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
            
        })
        console.log(articles)
        const fs = require('fs')
        const WritableStream = fs.createWriteStream('data.csv')

        WritableStream.write(`articles \n`);
        WritableStream.write('[ "' + articles.join('","') + '" ]\n');
    }).catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
//console.log('Your friendly Express server, listening on port %s', listener.address().port);