client.ev.on("group-participants-update", async (_events) => {
  let userId = _events.participants;
  let groupId = _events.jid;
  let groupM = await client.groupMetadata(groupId);
  let member = groupM.participants;
  let imgurl = `https://i.ibb.co/f884QwX/https-i-pinimg-com-originals-90-90-de-9090de6f0bdfdf9a9506c96023509a8b.jpg`
  let buffer = this.functions.getBuffer(imgurl);
  switch (_events.action) {
    case "remove": {
      for (let id of userId) {
        let txt = `Selamat tinggal @${id.split("@")[0]}`;
        client.sendMessage(groupId, txt, "conversation", { 
          contextInfo: { 
          	externalAdReply: { title: "Leave Message", body: `${member.length} Members`, previewType: "PHOTO", jpegThumbnail: buffer, sourceUrl: `` }, 
            mentionedJid: userId 
          }
        });
      }
      break;
    }
    case "add": {
      for (let id of userId) {
        let txt = `Selamat datang @${id.split("@")[0]}`;
        client.sendMessage(groupId, txt, "conversation", { 
          contextInfo: {
          	externalAdReply: { title: "Welcome Message", body: `${member.length} Members`, previewType: "PHOTO", jpegThumbnail: buffer, sourceUrl: `` }, 
            mentionedJid: userId
          }
        });
      }
      break;
    }
    case "promote": {
      for (let id of userId) {
        let txt = `@${id.split("@")[0]} was Promoted`;
        client.sendMessage(groupId, txt, "conversation", { 
          contextInfo: {
          	externalAdReply: { title: "Promote Message", body: `@Rzxbot`, previewType: "PHOTO", jpegThumbnail: buffer, sourceUrl: `` }, 
            mentionedJid: userId
          }
        });
      }
      break;
    }
    case "demote": {
      for (let id of userId) {
        let txt = `@${id.split("@")[0]} was Demoted`;
        client.sendMessage(groupId, txt, "conversation", { 
          contextInfo: {
          	externalAdReply: { title: "Demote Message", body: `@Rzxbot`, previewType: "PHOTO", jpegThumbnail: buffer, sourceUrl: `` }, 
            mentionedJid: userId
          }
        });
      }
      break;
    }
  }
});

client.ev.on("group-update", async (_events) => {
  let groupId = _events.jid;
  let groupM = await client.groupMetadata(groupId);
  // Group Info Setting
  switch (_events["restrict"]) {
    case "true": {
      let txt = `Group Info settings on "Only Admin Mode" in Group ${groupM.subject}`;
      client.sendMessage(groupId, txt, "conversation");
      break;
    }
    case "false": {
      let txt = `Group Info settings on "Public Mode" in Group ${groupM.subject}`;
      client.sendMessage(groupId, txt, "conversation");
      break;
    }
  }
  // Group Message Setting
  switch (_events["announce"]) {
    case "true": {
      let txt = `Group Message settings on "Only Admin Mode" in Group ${groupM.subject}`;
      client.sendMessage(groupId, txt, "conversation");
      break;
    }
    case "false": {
      let txt = `Group Message settings on "Public Mode" in Group ${groupM.subject}`;
      client.sendMessage(groupId, txt, "conversation");
      break;
    }
  }
  console.log(JSON.stringify(_events, null, 2));
});
