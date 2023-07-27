 const fs = require("fs");
 const canvas = require(`${__dirname}/../alice/wrapper/leiamnashF.js`).makeBed;

function leiamnash(){
 return{
  "name": "bed",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "bed": {
    "func": "bed",
    "cooldown": 10
   }
  }
 }
}

async function bed(event, api, leiam, log, alice) {
try{
const leiamFile = __dirname + "/cache/bed_" + event.senderID + ".png";
const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
const leiamnash = Object.keys(event.mentions);
const leiamTxt = "you guys are so cute";
  if (!leiamnash[0]) {
  await alice(event.senderID);
    api.chat({body: `please mention 1 person\n\nhow to use?\n${global.alice.prefix}bed ⟨ @mention ⟩\n\nexample:\n${global.alice.prefix}bed @𝗹𝗲𝗶𝗮𝗺𝗻𝗮𝘀𝗵`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat(`please mention 1 person\n\nhow to use?\n${global.alice.prefix}bed ⟨ @mention ⟩\n\nexample:\n${global.alice.prefix}bed @𝗹𝗲𝗶𝗮𝗺𝗻𝗮𝘀𝗵`, event.threadID, event.messageID);
    }, event.messageID);
 } else if (leiamnash) {
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    const leiamName = (await api.getUserInfo(leiamnash))[leiamnash].name;
  await canvas({
    avatar1: `${global.alice.api}/alice/profile?user=${event.senderID}`,
    avatar2: `${global.alice.api}/alice/profile?user=${leiamnash}`,
    file: event.senderID
  });
  api.chat({body: `${leiamTxt} ${leiamName}`, mentions: [{ tag: leiamName, id: leiamnash[0] }], attachment: fs.createReadStream(leiamFile)}, event.threadID, (err) => {
    fs.unlinkSync(leiamFile);
    if (err) return api.chat(`Error: {\nstatus: 3792\nsummary: {\n'leiamnash server is offline',\n'this is temporary issue please request again'\n'undefined leiamnash server'\n},\nalicezetion: this error happens if your account get muted by facebook\n}`, event.threadID, event.messageID);
   }, event.messageID);
  }
 } catch (err) { 
  log.err(err); 
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    bed,
    leiamnash
}