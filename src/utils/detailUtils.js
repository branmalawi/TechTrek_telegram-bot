import { Markup } from "telegraf";
import { api_search, imageExtractor } from "../api/apiEndpoints.js";

export const detailHandler = async ctx => {
    const data = await api_search(ctx.state.query, ctx.state.page);
    const theLaptop = data.results.filter(
        laptop => laptop.id.raw == ctx.state.laptop_id
    );

    const images = await imageExtractor(theLaptop[0].url.raw);
    const messageImage = await sendImages(ctx, images);
    ctx.deleteMessage(ctx.state.message_id);

    const message_id = [];
    messageImage.forEach(message => {
        message_id.push(message.message_id);
    });
    ctx.state.message_delete_id = message_id.join("/");
    
    const dummyMessage = await ctx.reply("∘∘∘∘∘∘", {
        reply_to_message_id: messageImage[0].message_id
    });
    ctx.state.chat_id = dummyMessage.chat.id;
    ctx.state.message_id = dummyMessage.message_id;

    sendDeskripsi(ctx, theLaptop[0]);
};

const sendImages = async (ctx, images) => {
    let data = "";
    if (images.length <= 1) {
        data = await ctx.replyWithPhoto(images[0]);
    } else {
        const media = images.map(image => ({
            type: "photo",
            media: image
        }));
        data = await ctx.replyWithMediaGroup(media);
    }
    return data;
};

const sendDeskripsi = (ctx, laptop) => {
    const getReplyMarkup = replyMarkup(ctx, laptop.url.raw);
    ctx.telegram.editMessageText(
        ctx.state.chat_id,
        ctx.state.message_id,
        undefined,
        ekstrakDeskripsi(laptop),
        { reply_markup: getReplyMarkup, parse_mode: "HTML" }
    );
};

const ekstrakDeskripsi = laptop => {
    const dateObj = new Date(laptop.date_published.raw);
    const formattedDate = `${dateObj.getDate()}-${
        dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;

    return `<blockquote>💻 Name</blockquote> ➥ ${laptop.name.raw}\n\n<blockquote>🗃️ CPU</blockquote> ➥ ${laptop.cpu.raw} \n\n<blockquote>🗂 GPU</blockquote> ➥ ${laptop.gpu.raw} \n\n<blockquote>🖥️ Display</blockquote> ➥ ${laptop.display_name.raw} \n\n<blockquote>📼 SSD</blockquote> ➥ ${laptop.storage_ssd.raw} gb <b>SSD</b> \n\n<blockquote>💾 HDD</blockquote> ➥ ${laptop.storage_hdd.raw} gb <b>HDD</b> \n\n<blockquote>➖ RAM</blockquote> ➥ ${laptop.ram.raw} gb \n\n<blockquote>⚖️ Weight</blockquote> ➥ ${laptop.weight.raw} kg \n\n<blockquote>🗓 Published</blockquote> ➥ ${formattedDate}
  `;
};

const replyMarkup = (ctx, url) => {
    const back = ctx.state.page;
    const query = ctx.state.query;
    const chat_id = ctx.state.chat_id;
    const message_id = ctx.state.message_id;
    const delete_message = ctx.state.message_delete_id;

    const inlineKeyboard = {
        inline_keyboard: [
            [
                Markup.button.callback(
                    "Back",
                    `pagination-${back}-${query}-${chat_id}-${message_id}-${delete_message}`
                ),
                Markup.button.url("Open WebApp", url)
            ]
        ]
    };
    return inlineKeyboard;
};
