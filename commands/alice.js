 const fs = require("fs");
 const axios = require("axios");
 
function leiamnash(){
 return{
  "name": "alice",
  "author": "leiamnash",
  "version": "1.0.0", 
  "noPrefix": "alice"
 }
}

async function alice(event, api, alice) {
try{
  const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
  const leiamChat = event.body;
  if (leiamChat == "alice" || leiamChat == "Alice") {
   await alice(event.senderID);
   api.chat({body: `please ask me anything\n\nhow to use?\nalice ⟨ ask ⟩\n\nexample:\nalice why we're born as human`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
    fs.unlinkSync(aliceFile);
    if (err) return api.chat(`please ask me anything\n\nhow to use?\nalice ⟨ ask ⟩\n\nexample:\nalice why we're born as human`, event.threadID, event.messageID);
    }, event.messageID);
} else if (leiamChat.startsWith("alice") || leiamChat.startsWith("Alice")) {
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    const leiamRes = (await axios.get(`${global.alice.api}/gpt4?ask=${leiamChat.replace(/alice/g, "\n")}`)).data.answer;
    api.chat(leiamRes, event.threadID, event.messageID);
  }
 } catch (err) {} 
}

module.exports = {
    alice,
    leiamnash
}