 const fs = require("fs");
 const axios = require("axios");

function leiamnash(){
 return{
  "name": "anigoing",
  "author": "leiamnash",
  "version": "1.0.0",
  "commandMap": {
  "anigoing": {
    "func": "anigoing",
    "cooldown": 20
   }
  }
 }
}

async function anigoing(event, api, leiam, log, alice) {
try{
const leiamRes = await axios.get(`${global.alice.api}/leiam/ongoing`);
const leiamGoing = leiamRes.data.result;
const leiamAniSub = leiamRes.data.anisub;
  api.setMessageReaction("✅", event.messageID, (err) => {}, true);
     const leiamImage = []
     const leiamData = []
for (var leiamLoop = 0; leiamLoop <= leiamGoing.length - 1; leiamLoop++) {
 leiamData.push(`------------------------------------------\ntitle: ${leiamGoing[leiamLoop].animeTitle}\nenglish: ${leiamGoing[leiamLoop].subOrDub}\nnew episode: ${leiamGoing[leiamLoop].episodeNum}\n\n`);
    const leiamFile = `${__dirname}/cache/anigoing${leiamLoop}_${event.senderID}.png`;
    const leiamGet = (await axios.get(leiamGoing[leiamLoop].animeImg, { responseType: 'arraybuffer'})).data;
fs.writeFileSync(leiamFile, Buffer.from(leiamGet, 'utf-8'));
leiamImage.push(fs.createReadStream(leiamFile).on("end", () => {
    fs.unlinkSync(leiamFile);
 }));
}
  api.chat({body: leiamData.join(""), attachment: leiamImage}, event.threadID, (err) => {
    if (err) return api.chat(leiamData.join(""), event.threadID, event.messageID);
  }, event.messageID);
 } catch (err) { 
  log.err(err); 
  api.chat(`Error: {\nstatus: 9299\nsummary: {\n'leiamnash server is offline',\nconnection refuse to response,\n},\nhttp: cannot get data from leiamnash server\n}`, event.threadID, () => api.setMessageReaction("❎", event.messageID, (err) => {}, true), event.messageID);
 } 
}

module.exports = {
    anigoing,
    leiamnash
}