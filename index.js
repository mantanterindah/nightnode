const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
var express = require('express')
var app = express()

const Nightmare = require('nightmare');
const electron = require('electron');
const client = new Discord.Client();

var nightmare = new Nightmare({show:false});


const url = "http://oqhadev.com/vend"
const selector = '#table'

var prefix = "!"

client.on('ready', () => {
    console.log('Ready!!')
});

client.on('message', async message => {
    if(message.content.startsWith(prefix + 'cek')) {

        let messageArray = message.content.split(/\s+/g);
        let command = messageArray[0];
        let args = messageArray.slice(1);

        let tunggu = message.reply('Bentar Ane Cari dulu yak!')
        

        nightmare
            .goto(url)
            .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
            .wait(2000)
            .type('input[id="carii"]', `${args[0]}`)
            .wait(2000)
            .wait('#table td')
            .type('input[id="carii"]', '')
            .evaluate((selector) => {

                return document.body.innerHTML;
            }, selector)
            .then(function(body) {
                var $ = cheerio.load(body);

                $('tr').each(function(index, element) {
                    var anu = $(this).children();
                    var anu1 = anu.eq(0).text();
                    var anu2 = anu.eq(1).text();
                    var anu3 = anu.eq(2).text();
                    var anu4 = anu.eq(3).text();
                    var anu5 = anu.eq(5).text();
                    var pager = '```'
            
                    console.log('result'+'\n'+anu1 +' '+anu2 +' '+anu3 +' '+anu4 +' '+anu5 +' ' )
                    message.channel.send('```'+'js'+'\n'+anu1 +'   '+anu2 +'   '+anu3 +'   '+'\n'+anu4 +'   '+anu5+'\n'+'```')
                    

                    

            })


            })

        


    }
})

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});


process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Error: \n${error.stack}`);
});


client.login(process.env.BOT_TOKEN)

