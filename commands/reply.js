 const axios = require("axios");
 
function leiamnash(){
 return{
  "name": "reply",
  "author": "leiamnash",
  "version": "1.0.0", 
  "noPrefix": "reply"
 }
}

async function reply(event, api, alice) {
try{
const leiamChat = event.body;
 if (leiamChat == undefined) {
   return;
 } else if (leiamChat.startsWith(`${global.alice.prefix}`)) {
   return;
 } else if (event.messageReply.senderID == api.getCurrentUserID()) {
   const leiam = (await axios.get(`${global.alice.api}/simsimi?chat=${leiamChat}`)).data.answer;
   api.chat(leiam, event.threadID, event.messageID);
  }
 } catch (err) {} 
}

module.exports = {
    reply,
    leiamnash
}