let eightBall = require("./../../lists/8ball.json");

module.exports = {
    usage: "A magical 8ball\n`8ball [questions]`",
    cooldown: 5,
    process: (bot, msg) => {
        bot.createMessage(msg.channel.id, `**${msg.author.username}**-senpai the 8ball reads: **${eightBall[Math.floor(Math.random() * (eightBall.length))]}**`)
    }
}