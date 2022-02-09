const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const app = express();

let opened = false;
let selected = false;

let video = {
    selected : false, 
    URL: "",
}

let yt = {
    selected : false, 
    frame: "",
}

let logOut = false;

app.set("port", process.env.PORT || 300);
app.set("views", path.join(__dirname, "views"));;
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/PUBLIC/")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));




app.get("/", (req, res)=>{
    if (opened){
        res.redirect("/select");
    }else{
        res.render("index", {
            tryed: false
        });
    }
});


app.post("/", (req, res)=>{
    opened = false;
    if (req.body.username == "Riccino" && req.body.password == "12345") {
        opened = true;
        res.redirect("/select");
    }else{
        res.render("index", {
            tryed: true
        });
    }
});


app.get("/select", (req,res)=>{
    if (opened) {
        res.render("select");
    }
    else{
        res.redirect("/");
    }
});


app.post("/select", (req,res)=>{
        
        opened = false;
        res.redirect("/");

        video.selected = false;
        video.URL = "";

        yt.selected = false;
        yt.frame = "";
})


app.get("/video", (req, res)=>{
    if (!opened) {
        res.redirect("/");
    }else{
        if (video.selected){
            res.redirect("/video-play");
        }else{
            res.render("videoLocal");
        }
    }
})


app.post("/video", (req, res)=>{
    video.selected = true;
    video.URL = req.body.urlVideo;
    res.redirect("/video-play");
})


app.get("/video-play", (req,res)=>{
        if (!opened) {
            res.redirect("/");
        }else{
            if (video.URL == "") {
                res.redirect("/video");
            }else{
                res.render("playVideo", {
                    URLVideo: video.URL,
                })    
            }
        }
})


app.get("/yt", (req, res)=>{
    if (!opened) {
        res.redirect("/");
    }else{
        if (yt.selected){
            res.redirect("/yt-play");
        }else{
            res.render("videoYT");
        }
    }
})

app.post("/yt", (req, res)=>{
    yt.selected = true;
    yt.frame = req.body.fromYT;
    res.redirect("/yt-play");
})


app.get("/yt-play", (req,res)=>{
    if (!opened) {
        res.redirect("/");
    }else{
        if (yt.frame == "") {
            res.redirect("yt");
        }else{  
            res.render("playYT", {
                frameYT: yt.frame,
            })
        }
    }
})


app.get("*", (req, res)=>{
    res.render("404");
});


app.listen(app.get("port"), ()=>{
    console.log(`Go to http://localhost:${app.get("port")} or (IPv4):${app.get("port")}`)
})

