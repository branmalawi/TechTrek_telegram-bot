import { detailHandler } from "../utils/detailUtils.js";

export const detail = async ctx => {
    ctx.state.page = parseInt(ctx.match[1]);
    ctx.state.query = ctx.match[2];
    ctx.state.chat_id = parseInt(ctx.match[3]);
    ctx.state.message_id = parseInt(ctx.match[4]);
    ctx.state.laptop_id = ctx.match[5];

    ctx.deleteMessage(ctx.state.message_id);
    const loadingMessage = await ctx.reply("permintaan anda sedang di proses...");
    
    ctx.state.message_id = loadingMessage.message_id;
    detailHandler(ctx);
};
