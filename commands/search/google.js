let GoogleSearch = require('google-search'),
    options = require("./../../options/options.json"),
    googleSearch = new GoogleSearch({
        key: options.google_api_key,
        cx: options.google_search_key
    });


module.exports = {
    usage: "Prints out the first search result for the mentioned terms\n`google [search terms]`",
    delete: true,
    cooldown: 5,
    process: (bot, msg, suffix) => {
        let search = "google";
        if (suffix) search = suffix;
        googleSearch.build({
            q: search,
            num: 1
        }, (error, response) => {
            if (response.items == undefined) bot.createMessage(msg.channel.id, "Your search for `" + search + "` returned no results. Please forgive me **" + msg.author.username + "**-senpai!").then(message => utils.messageDelete(bot, message, null));
            else bot.createMessage(msg.channel.id, "I searched for **\"" + search + "\"** and found this, **" + msg.author.username + "**-senpai: \n**<" + response.items[0].link + ">**");
        })
    }
}