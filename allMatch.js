let request = require("request");
let cheerio = require("cheerio");
let scoreBoardObj = require("./scorecard");

function allMatchPageCb(url) {
    request(url, function(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        } else {
            getAllScoreCardLink(html);
        }
    })
}

function getAllScoreCardLink(html) {
    let searchTool = cheerio.load(html);
    let scorecardsArr = searchTool("a[data-hover ='Scorecard']");
    for (let i = 0; i < scorecardsArr.length; i++) {
        let link = searchTool(scorecardsArr[i]).attr("href");
        let fullAllMatchPageLink = "https://www.espncricinfo.com" + link;
        console.log(fullAllMatchPageLink);
        scoreBoardObj.ps(fullAllMatchPageLink);
    }
}

module.exports = {
    getAllMatch: allMatchPageCb
}