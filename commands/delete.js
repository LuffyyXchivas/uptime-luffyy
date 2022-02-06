const Discord = require('discord.js');
const configs = require("../configs.json")
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');


exports.run = async (client, message, args) => {

await Database.find({}, async (err, link) => {

if(!link) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:upret:938468033041666109> **Veritabanımda Link Bulunmuyor!**`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!args[0] || !args[0].startsWith('https://')) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:upret:938468033041666109> **Lütfen Geçerli Bir Glitch Linki Belirtmelisin!** \n\n \`Örnek:\` **!sil https://Luffyy-uptime.glitch.me/**`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!link.find(a => a.link === args[0])) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:upret:938468033041666109> **Linkiniz Veritabanımda Bulunmuyor!**`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!link.filter(a => a.userID === message.author.id).find(c => c.link == args[0])) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`**Veritabanıma Bu Linki Eklememişsin!**`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))


  
  
await Database.deleteOne({ link: args[0]}, async (err, link) => { 

const embed = new Discord.MessageEmbed()
.setColor('#ffffff')
.setDescription(`<a:uptik:938466506650566686> Başarıyla Linkin ([LİNK](${args[0]})) Veritabanımdan Silindi!`).setFooter(`Kevzyy Uptime 💖 Luffyy`)

await message.channel.send(embed)
client.channels.cache.get("938884219638263858").send(new Discord.MessageEmbed().setColor('GOLD').setTitle("Bir Link Kaldırıldı!").setDescription(`**Link:** \`${args[0]}\` \n **Kullanıcı:** <@!${message.author.id}>`).setTimestamp())
})
})
}


                    
exports.infos = {
name: 'sil',
aliases: ["linkdelete","delete"],
}
