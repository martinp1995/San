const Discord= require("discord.js");
const client = new Discord.Client();
var fs = require('fs-extra');
var prefix =("&")

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const db = low(adapter)
db.defaults({ xp: []}).write()

client.on("ready", () => {
  client.user.setActivity("Bot du serveur -=D&R=- Village");
  console.log("--------------------------------------");
  var TailleMembres = client.users.size;
  var TailleServeurs = client.guilds.size; 
  console.log(`Je suis sur ${TailleServeurs} serveur(s) avec ${TailleMembres} utilisateurs \nLe préfix actuelle : `+prefix);
  client.channels.get("500396940715098112").send("Je suis prêt à travailler,donner moi des commandes a faire \net mon préfix est "+prefix);
});

client.on('guildMemberAdd', member => {  

  const salon = member.guild.channels.find(x => x.name === '🌀accueil');
      let Villageois = member.guild.roles.find(x => x.name === "🏡 Simples Villageois 🏡");
      member.addRole(Villageois)
  const messageB = new Discord.Attachment('Loup04.jpg')
      salon.send("Un nouveau survivant **"+ member.user.username +"**,vient d'échapper aux loups !\n Bienvenue au -=D&R=- Village :beer::tada: !");
      salon.send(messageB) 
  });

    client.on('message', message => {

      //xp
      var msgauthor = message.author.toString()

      if(message.author.bot) return

      if(!db.get("xp").find({user: msgauthor}).value()){
          db.get("xp").push({user: msgauthor, xp: 1}).write()
      }
      else{
        
        var userxpdb = db.get("xp").filter({user: msgauthor}).find("xp").value()
        var userxp = Object.values(userxpdb)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor,xp: userxp[1] +=1}).write()
      }
      if(message.content.startsWith(prefix +"xpstat")){
        var xp = db.get("xp").filter({user: msgauthor}).find("xp").value()
        var xp_final = Object.values(xp)
        var valboucle = 0
        var min = 0
        var max =20
        var valLevel = 0
        var valniv = 0
        while (valboucle === 0){
          if(min <= xp_final[1] && xp_final[1]<max ){
            levels = valLevel
            valboucle = 1

          }
          else{
            min += 20
            max += 20
            valLevel += 1
          }
        }
                while (valniv === 0){
          if(xp_final[1]<max ){
            diffxp = max - xp_final[1]
            valniv = 1

          }
          else{
            max += 20
          }
        }

        var xp_embed = new Discord.RichEmbed()
        .setTitle(`Xp de ${message.author.username}`)
        .setThumbnail(message.author.avatarURL)
        .setDescription("Voici tout vos Xp et votre level !")
        .addField("Level :military_medal:",levels)
        .addField("Xp :crossed_swords:",`${xp_final[1]} xp`)
        .addField("Xp restant","Il vous reste **"+diffxp+" xp** pour passer au level suivant")
        message.channel.send({embed: xp_embed})
      }
      //if(message.content.startsWith(prefix +"xpclass")){}
      //------------------------------------------------------------------------
      //logout

      if (message.content.startsWith(prefix + "logout")) {
        let modRole3 = message.guild.roles.find(x => x.name === "configBot");
        if(!message.member.roles.has(modRole3.id)) {
        return message.channel.send("", {embed: {
            title: "Erreur:",
            color: 0xff0000,
            description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
            footer: {
              text: "Message par Sanbot."
            }
          }})
        } 
        temps = 5
        t =""
        while(temps >= 0){
          t += temps+"\n"
          temps = temps-1
        }
        client.channels.get("500396940715098112").send(t+"\nArrêt en cours...");

        if(message.author.id == "352846093748404224"){
        

                console.log('Je suis off \nJe vais aller dormir');
        
                client.destroy();
        
   
        
            } else {
        
            message.channel.send("Pour quoi vouloir m'éteindre ;-;")
          }
        }
        //------------------------------------------------------
        //help
      if (message.content === prefix + "help"){
    
        var help_embed = new Discord.RichEmbed()
            .setColor('#575957')
            .setThumbnail(client.user.avatarURL)
            .setTitle("SanBot")
            .setDescription("Je suis le bot  du serveur **-=D&R=- Village**,\nMon prefix actuel est: "+prefix)
            .addField("Les commandes","`ban`,`kick`,`purge`,`warn`,`seewarns`,`delwarns`")
            .addField("Level","`xpstat`")
            .addField("Aide","`staff`")
            .setFooter(`demandé par @${message.author.username}`)
            .setTimestamp()
            message.channel.send(help_embed)
      }
      //-------------------------------------------------------------------------------------
            //staff
      if (message.content === prefix + "staff"){
        let RoleChef = message.guild.members.filter(member => { 
          return member.roles.find(x => x.name === "🐾 l'Infect père des Loups 🐾");
      }).map(member => {
          return member.user.username;
      })
      let RoleSecond = message.guild.members.filter(member => { 
        return member.roles.find(x => x.name === "⚜️ Shérif Général ⚜️");
    }).map(member => {
        return member.user.username;
    })
        var help_embed = new Discord.RichEmbed()
        .setColor('#4286f4')
        .setTitle("Voici les personnes a contacter si vous avez des problèmes ou besoin de conseil")
        .addField("ADMINISTRATEUR/FONDATEUR",RoleChef)
        .addField("SECOND",RoleSecond)
        .setFooter(`demandé par @${message.author.username}`)
        .setTimestamp()
        message.channel.send(help_embed)
      }
      //-------------------------------------------------------------------------------------
        //ban
        if(message.content.startsWith(prefix +'ban')){
           let banMember = message.guild.member(message.mentions.users.first());

          let modRole = message.guild.roles.find(x => x.name === "⚜️ Shérif Général ⚜️");
          if(!message.member.roles.has(modRole.id)) {
          return message.channel.send("", {embed: {
              title: "Erreur:",
              color: 0xff0000,
              description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
              footer: {
                text: "Message par Sanbot."
              }
            }})
          } 
            if (banMember.roles.has("493731750229442563")) return message.reply('Tu peux pas bannir un admin')

            if (message.channel.type === "dm") return;
            if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
            if(message.mentions.users.size === 0) {
              return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
            }
            if(!banMember) {
              return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
            }
            if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
              return message.reply("**:x: Je n'ai pas la permission pour ban...**").catch(console.error);
            }
                     
            banMember.ban().then(member => {
                message.channel.send(`**${member.user.tag}** est banni :eyes:`)
                    }).then(message.guild.channels.find('name','admin-logs').send({
                      embed: {
                        type: 'rich',
                        description: '',
                        fields: [{
                          name: '**L\'utilisateur <~>**',
                          value: banMember.user.username,
                          inline: true
                        }, {
                          name: 'User id',
                          value: banMember.id,
                          inline: true
                        },{
                          name: '**Action <~>**',
                          value: "Ban",
                          inline: true
                    },{
                          name: 'Modérateur',
                          value: message.author.username,
                          inline: true
                    }],
                     
                        color: 0xD30000,
                        footer: {
                          text: 'Moderation',
                          proxy_icon_url: ' '
                        },
                    
                        author: { 
                          name: banMember.user.username + "#"+ banMember.user.discriminator,
                          icon_url: " ",
                          proxy_icon_url: ' '
                        }
                      }
                    })).catch(console.error);
                  }
        /*-------------------------------------------------------------------------------
        kick*/
                  else if(message.content.startsWith(prefix+'kick')){
                    let kickMember = message.guild.member(message.mentions.users.first());

                    let modRole = message.guild.roles.find(x => x.name === "⚜️ Shérif Général ⚜️");
                    if(!message.member.roles.has(modRole.id)) {
                    return message.channel.send("", {embed: {
                        title: "Erreur:",
                        color: 0xff0000,
                        description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
                        footer: {
                          text: "Message par Sanbot."
                        }
                      }})
                    }
                    
                  if (kickMember.roles.has("493731750229442563")) return message.reply('Tu peux pas kicker un admin')
                    
                    let modRole2 = message.guild.roles.find("name", "⚜️ Shérif Général ⚜️");
              if(!message.member.roles.has(modRole2.id)) {
              return message.channel.send("", {embed: {
                  title: "Erreur:",
                  color: 0xff0000,
                  description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
                  footer: {
                    text: "Message par Sanbot."
                  }
                }}).catch(console.error);
              } 
              if(!message.guild.roles.exists("name", "⚜️ Shérif Général ⚜️")) {
                return  message.channel.send("", {embed: {
                  title: "Erreur:",
                  color: 0xff0000,
                  description: " :no_entry_sign: Le rôle **⚜️ Shérif Général ⚜️** n'existe pas dans ce serveur veuillez le créer pour Kick! :no_entry_sign: ",
                  footer: {
                    text: "Message par Sanbot."
                  }
                }}).catch(console.error);
              } 
              if(message.mentions.users.size === 0) {
              return message.channel.send("", {embed: {
                  title: "Erreur:",
                  color: 0xff0000,
                  description: " :no_entry_sign: Merci de spécifié l'utilisateur que vous voulez Kick. **Format ~> `!kick @mention`** ! :no_entry_sign: ",
                  footer: {
                    text: "Message par Sanbot."
                  }
                }}).catch(console.error);
              }
              if(!kickMember) {
              return message.channel.send("", {embed: {
                  title: "Erreur:",
                  color: 0xff0000,
                  description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
                  footer: {
                    text: "Message par Sanbot."
                  }
                }}).catch(console.error);
              }
              if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
              return message.reply("Je n'ai pas la permissions ** __(KICK_MEMBERS)__ **!").catch(console.error);
              }
                 if(!message.guild.channels.exists("name", "admin-logs")){
              // créer le channel
              message.guild.createChannel('admin-logs');
              // Affiche un message d'erreur expliquant que le channel n'existait pas
              return message.channel.send("", {embed: {
              title: "Erreur:",
              color: 0xff0000,
              description: " :no_entry_sign: Le salon textuel `admin-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
              footer: {
              text: "Message par Sanbot."
              }
              }}).catch(console.error);
              }   
              kickMember.kick().then(member => {
              message.channel.send("", {embed: {
                  title: "Succès :white_check_mark:",
                  color: 0xff0000,
                  description: `${member.user.username}`+` à bien été kick`,
                  footer: {
                    text: "Message par Sanbot."
                  }
                }}).catch(console.error);
              }).then(message.guild.channels.find(x => x.name === "admin-logs").send({
                embed: {
                  type: 'rich',
                  description: '',
                  fields: [{
                    name: '**L\'utilisateur <~>**',
                    value: kickMember.user.username,
                    inline: true
                  }, {
                    name: 'User id',
                    value: kickMember.id,
                    inline: true
                  },{
                    name: '**Action <~>**',
                    value: "Kick",
                    inline: true
              },{
                    name: 'Modérateur',
                    value: message.author.username,
                    inline: true
              }],
               
                  color: 0xD30000,
                  footer: {
                    text: 'Moderation',
                    proxy_icon_url: ' '
                  },
              
                  author: { 
                    name: kickMember.user.username + "#"+ kickMember.user.discriminator,
                    icon_url: " ",
                    proxy_icon_url: ' '
                  }
                }
              })).catch(console.error);
                }
        /*-------------------------------------------------------------------------------
        warns*/
        let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
if (message.content.startsWith(prefix + "warn")){
  let modRole = message.guild.roles.find(x => x.name === "⚜️ Shérif Général ⚜️");
  if(!message.member.roles.has(modRole.id)) {
  return message.channel.send("", {embed: {
      title: "Erreur:",
      color: 0xff0000,
      description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
      footer: {
        text: "Message par Sanbot."
      }
    }})
  } 
if (message.channel.type === "dm") return;
var mentionned = message.mentions.users.first();
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
}else{
    const args = message.content.split(' ').slice(1);
    const mentioned = message.mentions.users.first();
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          if (args.slice(1).length != 0) {
            const date = new Date().toUTCString();
            if (warns[message.guild.id] === undefined)
              warns[message.guild.id] = {};
            if (warns[message.guild.id][mentioned.id] === undefined)
              warns[message.guild.id][mentioned.id] = {};
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
            } else {
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
                time: date,
                user: message.author.id};
            }
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
message.delete();
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
          } else {
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
          }
        } else {
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
        }
      } else {
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
      }
    } else {
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    }
  }
}

  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
    let modRole = message.guild.roles.find(x => x.name === "⚜️ Shérif Général ⚜️");
    if(!message.member.roles.has(modRole.id)) {
    return message.channel.send("", {embed: {
        title: "Erreur:",
        color: 0xff0000,
        description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
        footer: {
          text: "Message par Sanbot."
        }
      }})
    } 
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
    const mentioned = message.mentions.users.first();
    const args = message.content.split(' ').slice(1);
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size !== 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
          try {
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
              return;
            }
          } catch (err) {
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
            return;
          }
          let arr = [];
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
          for (var warn in warns[message.guild.id][mentioned.id]) {
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
          }
          message.channel.send(arr.join('\n'));
        } else {
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
          console.log(args);
        }
      } else {
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
      }
    } else {
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    }
  }


  if (message.content.startsWith(prefix+"delwarns")||message.content===prefix+"delwarns") {
    let modRole = message.guild.roles.find("name", "⚜️ Shérif Général ⚜️");
    if(!message.member.roles.has(modRole.id)) {
    return message.channel.send("", {embed: {
        title: "Erreur:",
        color: 0xff0000,
        description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
        footer: {
          text: "Message par Sanbot."
        }
      }})
    } 
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
   const mentioned = message.mentions.users.first();
    const args = message.content.split(' ').slice(1);
    const arg2 = Number(args[1]);
    if (message.member.hasPermission('MANAGE_GUILD')){
      if (message.mentions.users.size != 0) {
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
          if (!isNaN(arg2)) {
            if (warns[message.guild.id][mentioned.id] === undefined) {
              message.channel.send(mentioned.tag+" n'a aucun warn");
              return;
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
              message.channel.send("**:x: Ce warn existe pas**");
              return;
            }
            delete warns[message.guild.id][mentioned.id][arg2];
            var i = 1;
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
              var val=warns[message.guild.id][mentioned.id][key];
              delete warns[message.guild.id][mentioned.id][key];
              key = i;
              warns[message.guild.id][mentioned.id][key]=val;
              i++;
            });
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              delete warns[message.guild.id][mentioned.id];
            }
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
            return;
          } if (args[1] === "tout") {
            delete warns[message.guild.id][mentioned.id];
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
            return;
          } else {
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
          }
        } else {
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
        }
      } else {
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
      }
    } else {
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    }
  }
    /*-------------------------------------------------------------------------------
        purge*/
        if (message.content.startsWith(prefix + "purge")) {
          if (message.channel.type === "dm") return;
          if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
          
          const user = message.mentions.users.first();
           const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]) 
          if (!amount) return message.reply('**:x: Veuillez spécifier une limite de message**'); 
          if (!amount && !user) 
          return message.reply('**:x: Veuillez spécifier une limite de message**');
          if (!user){
          if(isNaN(message.content.split(' ')[1]) || parseInt(message.content.split(' ')[1]) < 2 || parseInt(message.content.split(' ')[1]) > 100){
          message.channel.send('**:x: Veuillez spécifier une limite de message comprise entre 2 et 100**')
          }
          }
          if(message.content.split(' ')[2]){
          if(isNaN(message.content.split(' ')[2]) || parseInt(message.content.split(' ')[2]) < 2 || parseInt(message.content.split(' ')[2]) > 100){
          message.channel.send('**:x: Veuillez spécifier une limite de message comprise entre 2 et 100**')
          }
          }
           message.channel.fetchMessages({ limit: amount, }).then((messages) => {
           if (user) {
          const filterBy = user ? user.id : Client.user.id;
          messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
           }
           message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
          
          message.channel.send(":wastebasket: | `" + amount + "` messages supprimés");
              
          });
          }
    })  
client.login(process.env.TOKEN)
