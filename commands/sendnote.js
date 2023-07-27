 const fs = require("fs");
 const axios = require("axios");

function leiamnash(){
 return{
  "name": "sendnote",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "sendnote": {
    "func": "sendnote",
    "cooldown": 30
   }
  }
 }
}

async function sendnote(event, api, leiam, log, alice) {
try{
const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
const leiamChat = leiam.join(" ");
  if (global.alice.admin != event.senderID) {
  api.setMessageReaction("⚠️", event.messageID, (err) => {}, true);
  await alice(event.senderID);
  api.chat({body: "sorry but you don't have an access to use this command", attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat("sorry but you don't have an access to use this command", event.threadID, event.messageID);
    }, event.messageID);
} else if (!leiamChat) {
  await alice(event.senderID);
  api.chat({body: `please add some context\n\nhow to use?\n${global.alice.prefix}sendnote ⟨ context ⟩\n\nexample:\n${global.alice.prefix}sendnote hello everyone`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat(`please add some context\n\nhow to use?\n${global.alice.prefix}sendnote ⟨ context ⟩\n\nexample:\n${global.alice.prefix}sendnote hello everyone`, event.threadID, event.messageID);
    }, event.messageID);
} else {
  const list = (await api.getThreadList(99, null, ["INBOX"]));
for (var threadID of list) {
  const leiamName = (await api.getUserInfo(global.alice.admin))[global.alice.admin].name;
  api.setMessageReaction("✅", event.messageID, (err) => {}, true);
 await alice(event.senderID);
  api.chat({body: `📣𝗮𝗻𝗻𝗼𝘂𝗻𝗰𝗲𝗺𝗲𝗻𝘁\n\n\n${leiamChat}\n\n\n\n~ ${leiamName}`, attachment: fs.createReadStream(aliceFile)}, threadID, (err) => {
  fs.unlinkSync(aliceFile);
  api.chat(`your note has been successfully send to\n⟨ ${list.length - 2} group chats ⟩`, event.threadID, event.messageID);
    if (err) return api.chat("[ ERROR ] » your note cannot be send to a group chats maybe you're sending a spammy link url", event.threadID, event.messageID);
    });
   }
  }
 } catch (err) {
  log.err(err);
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    sendnote,
    leiamnash
}