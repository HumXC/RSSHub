const ranking = require('@/v2/pixiv/ranking');
const changePixivItem = require('./change-pixiv-item');
module.exports = async (ctx) => {
    await ranking(ctx);
    changePixivItem(ctx.state.data.item);
};
