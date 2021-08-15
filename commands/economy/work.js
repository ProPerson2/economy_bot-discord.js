module.exports = {
  name: "work",
  aliases: [""],
  description: "Economy command!!",
  usage: "work",
  run: async (client, message, args) => {
const cs = (client.cs)

	let result = await client.cs.work({
            user: message.author,
            guild: message.guild,
            maxAmount: 100,
            replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
            cooldown: 25 //25 seconds of cooldown

        });
        if (result.error) return message.channel.send(`**You have already worked recently Try again in ${result.time}**`);
        else message.channel.send(`**You worked as a ${result.workType} and earned $${result.amount}!!**`)

		}
}