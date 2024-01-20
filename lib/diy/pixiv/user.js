const user = require('@/v2/pixiv/user');
const changePixivItem = require('./change-pixiv-item');
module.exports = async (ctx) => {
    await user(ctx);
    changePixivItem(ctx);
};
