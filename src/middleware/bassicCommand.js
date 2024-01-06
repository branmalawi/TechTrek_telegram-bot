const start = ctx => {
    ctx.reply(
        `Hello ${ctx.from.first_name}, selamat datang di bot saya. ketikkan /help untuk mengetahui cara menggunakan bot ini`
    );
};

const help = ctx => {
    ctx.reply(`anda dapat menggunakan command berikut:
- /search => untuk mencari nama laptop`);
};

export { start, help };
