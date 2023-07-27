 const fs = require("fs");
 const axios = require("axios");

function leiamnash(){
 return{
  "name": "discord",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "discord": {
    "func": "discord",
    "cooldown": 0
   }
  }
 }
}

async function discord(event, api, leiam, log, alice) {
try{
const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
const leiamChat = leiam.join(" ");
  if (!leiamChat) {
  await alice(event.senderID);
    api.chat({body: `context cannot be left blank\n\nhow to use?\n${global.alice.prefix}discord ⟨ context ⟩\n\nexample:\n${global.alice.prefix}discord sup nigga`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat(`context cannot be left blank\n\nhow to use?\n${global.alice.prefix}discord ⟨ context ⟩\n\nexample:\n${global.alice.prefix}discord sup nigga`, event.threadID, event.messageID);
    }, event.messageID);
         return;
}
  const leiamRes = (await axios.get(`${global.alice.api}/discord?chat=${leiamChat}`)).data.answer;
  api.chat(leiamRes, event.threadID, event.messageID);
 } catch (err) { 
  log.err(err); 
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    discord,
    leiamnash
}