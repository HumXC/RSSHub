const config = require('@/config').value;
module.exports = function (items) {
    if (!config.baseUrl) {
        throw 'need BASE_URL';
    }
    for (const item of items) {
        const index = item.description.indexOf('</p>');
        if (index !== -1) {
            // 将新文本插入到 "</p>" 后面
            const illust_id = item.link.split('/').filter(Boolean).pop();
            const addBookmarkUrl = new URL(`/diyapi/warp/pixiv/bookmark/add/${illust_id}`, config.baseUrl).href;
            const text = `<p><a href="${addBookmarkUrl}">❤️ 收藏</a></p>`;
            item.description = item.description.substring(0, index + 4) + text + item.description.substring(index + 4);
        }
    }
};
