let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let allMatchObj = require("./allMatch");
let iplPath = path.join(__dirname, "ipl");
dirCreator(iplPath);
request(url, cb);
// home page start
function cb(error, response, html) {
    if (error) {
        console.log(error); // Print the error if one occured
    } else if (response.statusCode == 404) {
        console.log("Page Not Found");
    } else {
        dataExtractor(html); //Print the html code for the request made
    }
}

function dataExtractor(html) {
    let searchTool = cheerio.load(html);
    let anchorrep = searchTool("a[data-hover ='View All Results']");
    let link = anchorrep.attr("href");
    //console.log(link)
    let fullAllMatchPageLink = "https://www.espncricinfo.com" + link;
    //console.log(fullAllMatchPageLink)
    allMatchObj.getAllMatch(fullAllMatchPageLink)
}
// home page code end


function dirCreator(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }
}