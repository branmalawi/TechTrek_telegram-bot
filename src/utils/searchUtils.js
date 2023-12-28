import { Markup } from "telegraf";
import { api_search } from "../api/apiMethods.js";

export const searchHandler = async ctx => {
    const data = await api_search(ctx.query, ctx.year);
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

        if (index == laptops.length) {
            inlineKeyboard.push(paginationExtractor(laptop));
            return;
        }

        inlineKeyboard.push([
            Markup.button.callback(laptop.name, `detail - ${laptop.id}`)
        ]);

    });

    const page = Math.ceil(laptops.length / 10)

    return inlineKeyboard;
};

const paginationExtractor = (page) => {
    const pagination = [0, 0, 0];
    pagination[0] = Markup.button.callback("prev", page.page_prev);
    pagination[1] = Markup.button.callback(`${page.page_now} / ${page.pages}`, ' ');
    pagination[2] = Markup.button.callback("next", page.page_next);

    if (page.page_prev == 0) {
        pagination[0] = Markup.button.callback("⊘", " ");
    } else if (page.page_now == page.pages) {
        pagination[2] = Markup.button.callback("⊘", " ");
    }

    return pagination;
}
