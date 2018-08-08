const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on("message", function(message) {

    bot.user.setActivity(`!ajuda | 4 Comandos`, {type: "WATCHING"});
           
});

    bot.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let prefix = '!'
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        if (command == `${prefix}ajuda`) {

            message.channel.send('**Olá,' + message.author + '! Esse comando ainda está sendo feito. Tente novamente mais tarde. :x:**')
}

        if (command == `${prefix}serverinfo`) {
            const embed = new Discord.RichEmbed()
         .addField(':computer: Id do servidor', message.guild.id)
        .setColor(0x00FFFF)
        .addField(':hammer: Criadores do bot', '`Harry#6281` e `_SpeedLight_#4293`')
        .addField(':newspaper: Seu Cargo', message.member.highestRole.name)
        .addField(':tophat: Criador do servidor', message.guild.owner)
        .addField(':earth_americas:   Região do servidor', message.guild.region)
        .addField(`:speech_balloon: Canais (${message.guild.channels.size})`, `:pencil: Texto: ${message.guild.channels.filter(m => m.type === 'text').size}\n:loud_sound: Voz: ${message.guild.channels.filter(m => m.type === 'voice').size}`)
        .addField(':book: Servidor criado em', message.guild.createdAt)
        .addField(':balloon: Entrei aqui em', message.guild.joinedAt)
        .addField(':busts_in_silhouette:  Membros', `${message.guild.memberCount}`)
        .setThumbnail(message.guild.iconURL)
        message.channel.send(embed)
}

if (command == `${prefix}anunciar`) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Você não tem permissão para utilizar este comando!** :x:`);
    let anuncio = args.join(" ");
    message.delete();

    const embed = new Discord.RichEmbed()
    .addField(" Anúncio ", anuncio)
    .setColor('#19a338')
    .addField("Atenciosamente,", message.author)

    let anunciochannel = message.guild.channels.find(`name`, 'anuncios')

    message.channel.send(`**Anuncio feito com sucesso.**`)

    anunciochannel.send("@everyone")
    anunciochannel.send(embed);
  }

  if (command == `${prefix}ban`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`**Você não tem permissão para utilizar esse comando!** :x:`);
    let staff = message.author
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(`${staff}**, Mencione o usuário!** :x:`);
      if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**Você não pode banir alguém com Administrador!** :x:");
    if(bUser.id === message.author.id) return message.channel.send(`**Você não pode se banir!** :x:`)
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send(`**Coloque uma razão para poder banir este usuário!** :x:`)
    message.delete();
              message.guild.member(bUser).ban(`Staff ${message.author.username}\n Motivo: ${bReason}`);

    let banEmbed = new Discord.RichEmbed()
    .setTitle(`Flash Ban`)
    .addField('Usuario banido:', bUser)
    .addField('Staff:', message.author)
    .addField('Razão:', bReason, true)
    .setColor("#ff0000")
    .setThumbnail(message.author.avatarURL)
    .setFooter(`Equipe de Moderação`)


    const embed = new Discord.RichEmbed()
    .setFooter(`Equipe de Moderação`)
    .setTitle(`Você foi Banido do ${message.guild.name}!`)
    .addField("Staff:", `${message.author.username}`)
    .addField("Razão:", bReason)
    .setColor("#ff0000")

    try{
      await bUser.send(embed)
    }catch(e){
    }

    let incidentchannel = message.guild.channels.find(`name`, 'punicoes');
    message.channel.send(`**Usuário banido com sucesso!**`)

    incidentchannel.send(banEmbed);
} 

  if (cmd == `${prefix}kick`) {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`<@${message.author.id}>, Você não tem permissão para usar esse Comando`);
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(`<@${message.author.id}>, Mencione um Usuário para Expulsar!`);
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Você não tem permissão para usar esse Comando");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(`<@${message.author.id}>, Não consigo kickar esse Usuário!`);

    let kickEmbed = new Discord.RichEmbed()
    .addField("Kick", `Isso que deu quando o ${kUser.user.username} não respeitou as Regras!`)
    .setColor("#e56b00")
    .addField(" Usuário Expulso:", `${kUser}`)
    .addField(" Autor:", `<@${message.author.id}>`)
    .addField(" Motivo:", kReason);

    let kickChannel = message.guild.channels.find(`name`, "punicoes");
    if(!kickChannel) return message.channel.send("Canal Punicoes Inexistente");

    message.channel.send(`<@${message.author.id}>, Usuário Kickado!`)

    const embed = new Discord.RichEmbed()
    .setTitle(`Você foi Expulso no Servidor ${message.guild.name}!`)
    .addField(" Pelo Staff", `${message.author.username}`)
    .addField(" Motivo", kReason)
    .setColor("#e56b00")

    try{
      await kUser.send(embed);
    }catch(e){
    }

    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(`Expulso pelo ${message.author.username} - Motivo: ${kReason}`);
    kickChannel.send(kickEmbed);
  
}        
        
    });
bot.login(TOKEN);
