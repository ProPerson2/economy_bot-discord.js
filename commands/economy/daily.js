module.exports = {
  name: "daily",
  aliases: [""],
  description: "Economy command!!",
  usage: "daily",
  run: async (client, message, args) => {
   const cs = (client.cs)

    let result = await cs.daily({
        user: message.author,
        guild: message.guild,
        amount: 100, //user will get 100 daily within 24 hrs by using this cmmd

    });
    if (result.error) return message.channel.send(`**You have used daily recently Try again in ${result.time}**`);
    else message.channel.send(`**You have earned $${result.amount}!!**`)
}
}