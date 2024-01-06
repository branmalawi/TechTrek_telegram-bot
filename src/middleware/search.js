import { searchHandler } from "../utils/searchUtils.js";

export const search = async ctx => {
    const rawMessage = ctx.message.text;
    const extractQuery = rawMessage.match(/\/search\s+(.+)/);
    if (extractQuery) {
        const resolve = await ctx.reply("sedang melakukan pencarian");
        ctx.state.chat_id = resolve.chat.id;
        ctx.state.message_id = resolve.message_id;
        ctx.state.query = extractQuery[1];
    searchHandler(ctx);
    } else {
        ctx.reply(
            `tolong sertakan keyword pencariannya, contoh :
/search Lenovo`
        );
    }
};
