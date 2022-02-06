const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = async (client, message, args) => {

    const check = Database.find(x => x.id === message.author.id);
    
     if (check) {
      if (check.link.length === 5) {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Link Ekleme Limitine Ulaştın! **Sadece 5 proje ekleyebilirsin.**")
         .setColor("#ffffff")
         .setFooter("Kevzyy Uptime 💖 Luffyy")
        )
      }
    }

if(!args[0] || !args[0].startsWith('https://')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:upret:938468033041666109> **Bir Glitch Linki Belirtmelisin!** \n\n \`Örnek:\` **!ekle https://Luffyy-uptime.glitch.me/**`))



Database.findOne({ 'link': args[0] }, function (err, link) { 
if(err) console.log(err)
if(link) {
return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:upret:938468033041666109> **Veritabanımda Linkin Bulunuyor!**`))

} else {
const uptime = new Database({
_id: new mongoose.Types.ObjectId(),
userID: message.author.id,
link: args[0],
date: Date.now()
});

uptime.save().then(result => console.log(result)).catch(error => console.log(error));

message.channel.send(new Discord.MessageEmbed().setColor('#ffffff').setDescription(`<a:uptik:938466506650566686> Başarıyla Linkin ([LİNK](${args[0]})) Veritabanıma Eklendi!`).setFooter(`Kevzyy Uptime 💖 Luffyy`))
client.channels.cache.get("938884219638263858").send(new Discord.MessageEmbed().setColor('GOLD').setTitle("Yeni Bir Link Eklendi!").setDescription(`**Link:** \`${args[0]}\` \n **Kullanıcı:** <@!${message.author.id}>`).setTimestamp())
}
})
}
  
exports.infos = {
name: 'ekle',
aliases: ['uptime','add-link'],
}
