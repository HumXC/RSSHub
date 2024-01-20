const bookmarks = require('@/v2/pixiv/bookmarks');
const changePixivItem = require('./change-pixiv-item');
module.exports = async (ctx) => {
    await bookmarks(ctx);
    changePixivItem(ctx);
};
