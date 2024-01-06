import { searchHandler } from "../utils/searchUtils.js";

export const pagination = ctx => {
    ctx.state.page = parseInt(ctx.match[1]);
    ctx.state.query = ctx.match[2];
    ctx.state.chat_id = parseInt(ctx.match[3]);
    ctx.state.message_id = parseInt(ctx.match[4]);
    const message_toDelete_id = ctx.match[5].split("/");

    message_toDelete_id.forEach(id => {
        const number_id = parseInt(id);
        if (number_id) {
            ctx.deleteMessage(number_id);
        }
    });

    searchHandler(ctx);
};
