const CurrencySystem = require("currency-system");

module.exports = {
  name: "add-money",
  aliases: [""],
  description: "Economy command!!",
  usage: "add-money <@user> <amount>",
  run: async (client, message, args) => {
   const cs = (client.cs)

        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        } else if (!args[0]) {
            return message.channel.send("Specify a user!");
        }
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You do not have requied permissions.")
        let wheretoPutMoney = args[2] || "wallet"; //or bank
        let amount = parseInt(args[1]);
        if (!amount) return message.channel.send("Enter amount of money to add.");
        let money = parseInt(amount);
        let result = await cs.addMoney({
            user: user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.channel.send("You cant add negitive money");
        else message.channel.send(`Successfully added $${money} to ${user.username}, ( in ${wheretoPutMoney} )`)
    }
}