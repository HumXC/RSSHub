const bookmarks = require('../../v2/pixiv/bookmarks');

module.exports = async (ctx) => {
    await bookmarks(ctx);
    ctx.state.data.title += '诶黑';
    for (const item of ctx.state.data.item) {
        const index = item.description.indexOf('</p>');
        if (index !== -1) {
            // 将新文本插入到 "</p>" 后面
            item.description = item.description.substring(0, index + 4) + `<a href="${item.link}">查看源</a>` + item.description.substring(index + 4);
        }
    }
};
