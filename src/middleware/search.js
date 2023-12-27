import { searchHandler } from "../utils/searchUtils.js";

export const search = ctx => {
    const rawMessage = ctx.message.text;
    const extractMessageWithYear = rawMessage.match(
        /\/search\s+(.+)\s+-\s+(\d{4})/
    );
    const extractMessageWithOutYear = rawMessage.match(/\/search\s+(.+)/);

    if (extractMessageWithYear) {
        ctx.query = extractMessageWithYear[1];
        ctx.year = extractMessageWithYear[2];
    } else if (extractMessageWithOutYear) {
        ctx.query = extractMessageWithOutYear[1];
        ctx.year = "";
    } else {
        ctx.reply("maaf format penulisan anda salah");
    }

    searchHandler(ctx);

    // const year = rawMessage[rawMessage - 1];
    // const year = typeof parseInt(rawMessage[rawMessage.length - 1]) === 'number' ? rawMessage[rawMessage.length - 1] : " ";

    // rawMessage.shift();
    // rawMessage.pop();
    // const message = rawMessage.join(" ");
};
