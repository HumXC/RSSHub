const post = require('./post');
module.exports = async (ctx) => {
    const data = {
        illust_id: ctx.params.illust_id,
        restrict: 'public',
    };
    const resp = await post(ctx, 'https://app-api.pixiv.net/v2/illust/bookmark/add', data);
    ctx.body = { resp };
};
