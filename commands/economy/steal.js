module.exports = {
  name: "steal",
  aliases: [""],
  description: "Economy command!!",
  usage: "steal <@user>",
  run: async (client, message, args) => {
    const cs = (client.cs)

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]);
      if (user) user = user.user;;
    }

    if (user.bot || user === client.user) return message.channel.send("This user is a bot..");
    if (!user) return message.channel.send('*Sorry, you forgot to mention somebody..*');

    let result = await cs.rob({
      user: message.author,
      user2: user,
      guild: message.guild,
      minAmount: 100,
      successPercentage: 5,
      cooldown: 25, //25 seconds,
      maxRob: 1000
    });
    if (result.error) {
      if (result.type === 'time') return message.channel.send(`*You have already robbed recently Try again in* ${result.time}`);
      if (result.type === 'low-money') return message.channel.send(`**You need atleast** $${result.minAmount} **to rob somebody!!**`);
      if (result.type === 'low-wallet') return message.channel.send(`${result.user2.username} **have less than $**${result.minAmount} **to rob.. LOL**`)
      if (result.type === 'caught') return message.channel.send(`${message.author.username} **you robbed** ${result.user2.username} **and got caught and you payed** ${result.amount} **to ${result.user2.username}!!**`)
    } else {
      if (result.type === 'success') return message.channel.send(`${message.author.username} **you robbed ${result.user2.username} and got away with ${result.amount}!!**`)

    }
  }
}