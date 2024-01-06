import { Markup } from "telegraf";
import { api_search } from "../api/apiEndpoints.js";

export const searchHandler = async ctx => {
    const data = await api_search(ctx.state.query, ctx.state.page);
    const inlineKeyboard = inlineKeyboardExtractor(
        data,
        ctx.state.query,
        ctx.state.chat_id,
        ctx.state.message_id
    );

    ctx.telegram.editMessageText(
        ctx.state.chat_id,
        ctx.state.message_id,
        undefined,
        "berikut hasil pencariannya : ",
        Markup.inlineKeyboard(inlineKeyboard)
    );
};

// Markup.inlineKeyboard(inlineKeyboard)

const inlineKeyboardExtractor = (data, query, chat_id, message_id) => {
    const laptops = data.results;
    const inlineKeyboard = [];

    laptops.map((laptop, index) => {
        inlineKeyboard.push([
            Markup.button.callback(
                laptop.name.raw,
                `detail-${data.meta.page.current}-${query}-${chat_id}-${message_id}-${laptop.id.raw}`
            )
        ]);
    });

    inlineKeyboard.push(
        paginationExtractor(data.meta.page, query, chat_id, message_id)
    );
    return inlineKeyboard;
};

const paginationExtractor = (page, query, chat_id, message_id) => {
    const prev = page.current - 1;
    const current = page.current;
    const next = page.current + 1;
    const total_pages = page.total_pages > 100 ? 100 : page.total_pages;

    const pagination = [0, 0, 0];
    pagination[0] = Markup.button.callback(
        "prev",
        `pagination-${prev}-${query}-${chat_id}-${message_id}-0`
    );
    pagination[1] = Markup.button.callback(`${current} / ${total_pages}`, " ");
    pagination[2] = Markup.button.callback(
        "next",
        `pagination-${next}-${query}-${chat_id}-${message_id}-0`
    );

    if (prev == 0) {
        pagination[0] = Markup.button.callback("⊘", " ");
    } else if (current == page.pages) {
        pagination[2] = Markup.button.callback("⊘", " ");
    }

    return pagination;
};
