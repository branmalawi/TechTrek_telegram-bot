import { Markup } from "telegraf";
import { api_search } from "../api/apiEndpoints.js";

export const searchHandler = async ctx => {
    const data = await api_search(ctx.query);
    const inlineKeyboard = inlineKeyboardExtractor(data, ctx.query);

    ctx.reply(
        "berikut hasil pencarian anda : ",
        Markup.inlineKeyboard(inlineKeyboard)
    );
};

const inlineKeyboardExtractor = (data, query) => {
    const laptops = data.results;
    const inlineKeyboard = [];

    laptops.map((laptop, index) => {
        index++;

        if (index == laptops.length) {
            inlineKeyboard.push(paginationExtractor(data.meta.page, query));
            return;
        }

        const laptopDetails = JSON.stringify(laptop);
        console.log(typeof laptopDetails);

        inlineKeyboard.push([
            Markup.button.callback(laptop.name.raw, `detail - ${laptopDetails}`)
        ]);

    });
    return inlineKeyboard;
};

const paginationExtractor = (page, query) => {
    const prev = page.current - 1;
    const current = page.current;
    const next = page.current + 1;
    const total_pages = page.total_pages > 100 ? 100 : page.total_pages;


    const pagination = [0, 0, 0];
    pagination[0] = Markup.button.callback("prev", `page - ${prev} - ${query}`);
    pagination[1] = Markup.button.callback(`${current} / ${total_pages}`, ' ');
    pagination[2] = Markup.button.callback("next", `page - ${next} - ${query}`);

    if (prev == 0) {
        pagination[0] = Markup.button.callback("⊘", " ");
    } else if (current == page.pages) {
        pagination[2] = Markup.button.callback("⊘", " ");
    }

    return pagination;
}
