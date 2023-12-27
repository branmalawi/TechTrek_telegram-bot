import { Markup } from "telegraf";
import { api_search } from "../api/apiMethods.js";

export const searchHandler = async ctx => {
    const data = await api_search(ctx.query);
    const inlineKeyboard = inlineKeyboardExtractor(data);
    //console.log(inlineKeyboard);

    //ctx.reply("berhasil:");
    ctx.reply(
        "berikut hasil pencarian anda : ",
        Markup.inlineKeyboard(inlineKeyboard)
    );
};

const inlineKeyboardExtractor = laptops => {
    const inlineKeyboard = [];
    let line = [];
    laptops.map((laptop, index) => {
        index++;
        inlineKeyboard.push([
            Markup.button.callback(laptop.name, `detail - ${laptop.id}`)
        ]);
    });
    
    const page = Math.ceil(laptops.length / 10)
    
    return inlineKeyboard;
};
