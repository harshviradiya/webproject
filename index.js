
const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homefile = fs.readFileSync("home.html", "utf-8");


const replaceval=(tempVal,orgVal)=>{
 let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}",orgVal.name);
  temperature = temperature.replace("{%country%}",orgVal.sys.country); 
  temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);  
  return temperature;   
}
    
const server = http.createServer((req, res) => {
  if (req.url == "/") {
   
    requests("https://api.openweathermap.org/data/2.5/weather?q=pune&appid=5300063cc28daec1d703a0304aa157c2",)
      .on("data",(chunk) =>{
          const objdata=JSON.parse(chunk);
          const arrdata=[objdata];
        const realtimedata = arrdata
        .map((val) => replaceval(homefile,val))
        .join("");
        console.log(realtimedata)
         res.write(realtimedata);
      })
      .on("end",(err) => {
        if (err) return console.log("connection closed due to errors", err);
        console.log("end");
        // res.end()    
      });
  }
});

server.listen(8000,"127.0.0.1");
