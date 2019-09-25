const tmi = require('tmi.js'),
	  config = require('./config'),
	  entry = require('./entry.js'),
	  mongoose = require('mongoose');


 mongoose.connect(config.db.uri, {useNewUrlParser: true});
const options = {
	options: {
		debug: true,
	},
	connection: {
		cluster: 'aws',
		reconnect: true,
	},
	identity: {
		username: 'TestBot',
		password: 'oauth:9ydjg22jak3scpq73f835n48loiuh5'
	},

	channels: ['DankPepe']
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (address,port) => { //arrow function allows shorter syntax for function calling
	client.action('DankPepe', 'Hello TestBot is now connected try typing !zads');

});

setInterval(()=>{ // writes message every user specified minute

client.action("DankPepe", 'You can Subscribe for FREE with Twitch Prime :)');

},30*60000); //ms-> minutes = minutes*60000


//using chat commands to querier and grab data entries
client.on('chat',function(channel, user, message, self){

	//can perform more robust quereies if needed
	if(message === '!workout'){
		entry.find({},(err,data)=>{ 
			if (err) throw(err);
			for(key in data){
				console.log(data[key].name + ": " + data[key].amount); // will turn into client.action but didn't want to crowd test enviroment with entries
			}
		});
	}

	if(message === "!zirco"){
		client.action('DankPepe', "What's up " + user.username + " I'm zads I hope you're ready to witness the highest jumps see when I'm live by following me on twitter https://twitter.com/Rezirco")
	}

	//example for creating banned words
	if(message == 'banable word'){
		client.ban("DankPepe", user.username, "Used Banned Word Check Logs"); // could change to client.timeout depending on what is desired reprimand
	}

	if(message == "!roll"){ //returns a number between 1-100
		client.action('DankPepe' , user.username+"'s roll is...." + Math.floor(Math.random()*101));
	}
});

