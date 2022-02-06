const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = (client, message, args) => {
    
Database.find({}, function (err, link) {
if(err) console.log(err)
	
const say = link.length || 0
const ait = link.filter(a => a.userID === message.author.id).length || 0

const embed = new Discord.MessageEmbed()
.setColor('#ffffff')
.setDescription(`<a:upduyuru:938467956730503219> Veritabanımda Toplamda **${say}** Link Bulunuyor! \n <a:updev:938467981296566323> Bu Linklerden Sadece **${ait}** Tanesi Sana Ait.`).setFooter(`Kevzyy Uptime 💖 Luffyy`)

return message.channel.send(embed)
})
}
exports.infos = {
name: 'say',
aliases: ['count','link-count'],
}
