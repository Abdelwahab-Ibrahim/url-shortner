// استدعاء المكتبة
const express = require('express');
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const URL = require("url");

const Link = require('./link');


const myurl = "http://localhost:3000";
function randomAlias(length = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const PORT = 3000;

const app = express();
const dburl = "mongodb+srv://mgvito:password4db@nodetuto.aewezzn.mongodb.net/?appName=nodeTUTO";
mongoose.connect(dburl)
    .then(() => {
        console.log("connected to datebase");
        // تشغيل السيرفر
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }).catch((err) => {
        console.log(err);
    });

// إنشاء التطبيق
 
// تحديد البورت
// إعداد مسار رئيسي
app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/index.html');
});

app.get('/all-links', async (req, res) => {
    try {
        const links = await Link.find().select('long short alias clicks -_id');
        res.status(200).json(links); // return as JSON
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});



app.use(express.json());

app.post('/data', async (req, res) => {
    data = req.body;
    if (!data.alias) {
        data.alias = randomAlias(7);
    }
    const shorturl = `${myurl}/${data.alias}`;
    data.short = shorturl;
    try {
        const long = data.long;
        const url = await Link.findOne({ long });
        if (!url) {
           
            await Link.create(data);
        }

        const links = await Link.find({}, { long: 1, short: 1, alias: 1, clicks: 1, _id: 0 });
        res.send(links);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
    // const newlink = new Link(data);
    // await newlink.save();


    console.log(data);
});


app.use(async (req, res) => {
    const alias = req.path.slice(1);
    try {
        const url = await Link.findOne({ alias });

        if (!url) return res.status(404).sendFile(__dirname + '/404.html');

        url.clicks++;
        await url.save();
        res.redirect(url.long);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

