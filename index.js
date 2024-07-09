const fs = require("fs")
const http = require("http")
const url = require("url")
const replaceTemplate = require("./modules/replaceTemplate")

// Blocking, synchronous
fs.readFileSync('./txt/input.txt', 'utf-8')
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
//fs.writeFileSync('./txt/input.txt', textOut);

// Non blocking, asynchronous
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    // Do something
})

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8") // __dirname is a built in variable for the root drectory
const dataObj = JSON.parse(data) //JSON.parse creates a new JS object with JSON as a parameter

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")
const tempProd = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")

const server = http.createServer( (req, res) => {
    const { query, pathname } = url.parse(req.url, true)
    // Same as doing these two lines below
    // const pathName = url.parse(req.url, true).pathname
    // const query = url.parse(req.url, true).query

    //Overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {"Content-type": "text/html"})
        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join("")
        // Loop through data.json
        // Call replaceTemplate, looping through indexes of data.json
        // At each iteration of the loop, replace values in template-card with correspoding values from data.json
        // cardsHTML is then assigned an array of these
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML)
        res.end(output) // If data is specified, it is similar in effect to calling response.write(data, encoding) followed by response.end(callback).
    }

    //Product
    else if (pathname === '/product') {
        res.writeHead(200, {"Content-type": "text/html"})
        const productHTML = replaceTemplate(tempProd, dataObj[query.id])
        res.end(productHTML)
    }

    //Not found
    else {
        res.writeHead(404, {"Content-type": "text/html"})
        res.end('<h1>Page not found</h1>')
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000")
})

