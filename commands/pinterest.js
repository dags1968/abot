 const fs = require("fs");
 const axios = require("axios");

function leiamnash(){
 return{
  "name": "pinterest",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "pinterest": {
    "func": "pinterest",
    "cooldown": 60
   }
  }
 }
}

async function pinterest(event, api, leiam, log, alice) {
try{
const aliceFile = __dirname + "/cache/leiamnash_" + event.senderID + ".png";
const leiamChat = leiam.join(" ");
  if (!leiamChat) {
  await alice(event.senderID);
    api.chat({body: `search cannot be left blank\n\nhow to use?\n${global.alice.prefix}pinterest ⟨ search ⟩\n\nexample:\n${global.alice.prefix}pinterest alice sao`, attachment: fs.createReadStream(aliceFile)}, event.threadID, (err) => {
  fs.unlinkSync(aliceFile);
    if (err) return api.chat(`search cannot be left blank\n\nhow to use?\n${global.alice.prefix}pinterest ⟨ search ⟩\n\nexample:\n${global.alice.prefix}pinterest alice sao`, event.threadID, event.messageID);
    }, event.messageID);
         return;
 }
  api.chat(`🔍𝘀𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗳𝗼𝗿\n⟨ ${leiamChat} ⟩`, event.threadID, () => api.setMessageReaction("✅", event.messageID, (err) => {}, true), event.messageID);
     const leiamImage = []
  for (var leiamLoop = 0; leiamLoop <= 23; leiamLoop++) {
    const leiamFile = `${__dirname}/cache/pinterest${leiamLoop}_${event.senderID}.png`;
    const leiamRes = (await axios.get(`${global.alice.api}/pinterest?search=${leiamChat}`)).data.images[leiamLoop];
    const leiamGet = (await axios.get(leiamRes, { responseType: 'arraybuffer'})).data;
fs.writeFileSync(leiamFile, Buffer.from(leiamGet, 'utf-8'));
leiamImage.push(fs.createReadStream(leiamFile).on("end", () => {
    fs.unlinkSync(leiamFile);
 }));
}
  api.chat({body: `𝗽𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁 𝗿𝗲𝘀𝘂𝗹𝘁𝘀 𝗳𝗼𝗿\n⟨ ${leiamChat} ⟩`, attachment: leiamImage}, event.threadID, (err) => {
    if (err) return api.chat(`Error: {\nstatus: 3792\nsummary: {\n'leiamnash server is offline',\n'this is temporary issue please request again'\n'undefined leiamnash server'\n},\nalicezetion: this error happens if your account get muted by facebook\n}`, event.threadID, event.messageID);
  }, event.messageID);
 } catch (err) { 
  log.err(err);
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    pinterest,
    leiamnash
}