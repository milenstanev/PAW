/// https://github.com/babel/babelify

var fs = require("fs");
var browserify = require("browserify");

browserify("./index.js")
    .transform("babelify", {
        presets: ["es2015"]
    })
    .bundle()
    .pipe(fs.createWriteStream("index.bundle.js"));