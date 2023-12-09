import { parse } from "node-html-parser";
import fs from "fs";
import https from "https";

async function getHtml(url){
    const response  = await fetch(url);
    if (response.status == 200){
        var responseText = await response.text();
        return responseText;
    }else{
        return "<html><body>page not found</body></html>";
    }
    
}

async function run(){
    let html = await getHtml("https://pinterest.com/albert_12_12/teagan-croft/");
    const document = parse(html);
    var loop = document.getElementsByTagName("img");

    // console.log(loop);
    for (let i = 0; i<loop.length; i++){
        const source = loop[i].getAttribute("src");
        
        async function download(url, path){
            var fullUrl = url;
            
            var localPath = fs.createWriteStream(path);
            
            var request = https.get(fullUrl, function(response){

                response.pipe(localPath);

            })
        }
        download(source, "./download/" + Date.now() + ".jpg")
    }
 }
run();