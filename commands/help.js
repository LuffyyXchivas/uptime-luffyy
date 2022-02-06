const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});


exports.run = async (client, message) => {
        
          
      return message.channel.send(new Discord.MessageEmbed()
          .setColor('#ffffff')
                                  .setFooter("Luffyy Was Here!")
          .setAuthor(`Uptime Komutlarım`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`
          \<a:upiaret:938468107809349662> **!ekle (show link) :** Veritabanıma Linkinizi Eklersiniz.
          \<a:upiaret:938468107809349662> **!linklerim :** Veritabanımda Bulunan Kendi Linklerinizi Listeler.
          \<a:upiaret:938468107809349662> **!sil (show link) :** Veritabanımdan Linkinizi Silersiniz.
          \<a:upiaret:938468107809349662> **!say :** Uptime İstatistiklerini Gösterir.
          
          `))

}

exports.infos = {
name: 'help',
aliases: [],
}


