import { searchHandler } from "../utils/searchUtils.js";

export const search = ctx => {
    const rawMessage = ctx.message.text;
    const extractQuery = rawMessage.match(/\/search\s+(.+)/);

    if (extractQuery) {
        ctx.query = extractQuery[1];
    } else {
        ctx.reply("maaf format penulisan anda salah");
    }

    searchHandler(ctx);
};
