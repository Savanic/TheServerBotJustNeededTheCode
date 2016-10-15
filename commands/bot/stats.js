let serverUptime = require('os').uptime();

module.exports = {
    usage: "Returns some basic stats for the bot.",
    delete: false,
    cooldown: 20,
    process: (msg, args, bot) => {
        return new Promise(resolve => {
            let commandUsage = 0;
            for (var command in commands) {
                if (commands[command].execTimes !== 0) commandUsage++;
            }
            resolve({
                message: `
\`\`\`markdown
# ${bot.user.username} Statistics:
[Bot Uptime](${~~(bot.uptime / 864000000)}d : ${~~((bot.uptime / 3600000) % 24)}h : ${~~((bot.uptime / 60000) % 60)}m : ${~~((bot.uptime / 1000) % 60)}s)
[Process Uptime](${~~(process.uptime() / 86400)}d : ${~~((process.uptime() / 3600) % 24)}h:${~~((process.uptime() / 60) % 60)}m : ${~~((process.uptime()) % 60)}s)
[Server Uptime](${~~(serverUptime / 86400)}d : ${~~((serverUptime / 3600) % 24)}h : ${~~((serverUptime / 60) % 60)}m : ${~~((serverUptime) % 60)}s)
[Memory Usage](RSS: ${(process.memoryUsage().rss / 1024 / 1000).toFixed(2)}MB | Heap Used: ${(process.memoryUsage().heapUsed / 1024 / 1000).toFixed(2)}MB)
[Shards](${bot.shards.size})

# Available to:
[Channels](${Object.keys(bot.channelGuildMap).length})
[Private Channels](${bot.privateChannels.size})
[Guilds](${bot.guilds.size})
[Users](${bot.users.size})
[Average](${bot.users.size/bot.guilds.size})

# Command Usage:
[Total | Commands | Cleverbot](${commandUsage}|${commandUsage - commands['chat'].execTimes}|${commands['chat'].execTimes})
[Average](${(commandUsage/(process.uptime() / 60)).toFixed(2)}/min)
\`\`\`
`
            })
        });
    }
}