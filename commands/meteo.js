const weather = require('weather-js')

exports.run = async (client, message, args, ops) => {

    var location = message.content.substr(6);
    var unit = "C";  
    try {
    weather.find({search: location, degreeType: unit}, function(err, data) {
    if(err) {
    console.log(Date.now(), "DANGER", "Je ne peut pas trouvé d'information pour la méteo de " + location);
    message.reply("\n" + "Je ne peut pas trouvé d'information pour la méteo de " + location);
    } else {
    message.delete();
    data = data[0];
    console.log("**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
    message.author.send(message.author + "\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.")  .then(msg => {
        msg.delete(100000)
      });
    }
    })
    } catch(err) {
    console.log(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
    message.reply("Erreur");
    }
}