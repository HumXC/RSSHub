const config = require('@/config').value;
const { JSDOM } = require('jsdom');
module.exports = function (ctx) {
    if (!config.baseUrl) {
        throw 'need BASE_URL';
    }
    for (const item of ctx.state.data.item) {
        const index = item.description.indexOf('</p>');
        if (index !== -1) {
            // 将新文本插入到 "</p>" 后面
            const illust_id = item.link.split('/').filter(Boolean).pop();
            const addBookmarkUrl = new URL(`/diyapi/warp/pixiv/bookmark/add/${illust_id}`, config.baseUrl);
            const dom = new JSDOM(item.description);
            const document = dom.window.document;
            if (ctx.query.key) {
                addBookmarkUrl.searchParams.set('key', ctx.query.key);
            }
            const firstP = document.querySelector('p');

            const addMarkbookP = document.createElement('p');
            const addMarkbookA = document.createElement('a');
            addMarkbookA.href = addBookmarkUrl.href;
            addMarkbookA.text = '❤️ 收藏';
            addMarkbookP.append(addMarkbookA);
            // 在第一个 <p> 元素后面插入新的元素
            firstP.parentNode.insertBefore(addMarkbookP, firstP.nextSibling);
            item.description = dom.serialize();
        }
    }
};
