const Discord = require('discord.js');
const configs = require("../configs.json");
const moment = require('moment');
require('moment-duration-format')
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = (client, message, args) => {

let months = {"01": "Ocak","02": "Şubat","03": "Mart","04": "Nisan","05": "Mayıs","06": "Haziran","07": "Temmuz","08": "Ağustos","09": "Eylül","10": "Ekim","11": "Kasım","12": "Aralık"};

Database.find({}, function (err, link) {
if(err) console.log(err)

let filter = link.filter(k => k.userID == message.author.id)
let map = filter.map(r => ` **Link :** \`${r.link}\` \n **Eklenme Zamanı :** \`${moment(r.date).format('DD')} ${months[moment(r.date).format('MM')]} ${moment(r.date).format('YYYY')}\` \n **------------------------------------**`).join('\n')

let list;
if(!filter) list = `<a:upret:938468033041666109> Hiç Bir Linkiniz Veritabanımda Bulunmuyor!`
if(filter) list = `${map}`
if(filter.length == 0) list = `<a:upret:938468033041666109> Hiç Bir Linkiniz Veritabanımda Bulunmuyor!`

const embed = new Discord.MessageEmbed()
.setColor('#ffffff')
.setDescription(`${list}`)
.setFooter(`Kevzyy Uptime 💖 Luffyy`)

message.author.send(embed)
});
}
exports.infos = {
name: 'linklerim',
aliases: [],
}
