const json  = require("express");
const express=require("express");
const app=express();
const https = require('https');
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const key="c64d1c9f5ff4578043ed67b32b0fc7bc";
  const unit="metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);


        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp= weatherData.main.temp;
            const weatherDesc =weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;

            const weatherImg="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp);
            console.log(weatherDesc);
            res.write("<h1>the temprature in " +query+ " is " + temp + " degrees</h1>");
            res.write("<img src="+ weatherImg +">");
            res.send();
        });
    });

});




app.listen(3000,function(){
    console.log("app is runing on 3000 port");
});
