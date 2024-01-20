const got = require('@/utils/got');
const config = require('@/config').value;
module.exports = async (ctx) => {
    if (!config.baseUrl || config.baseUrl === '') {
        throw 'need BASE_URL';
    }
    ctx.type = 'text/html';
    const url = new URL(ctx.url.replace(/^\/warp/, '/diyapi'), config.baseUrl).href;
    try {
        await got(url);
        ctx.body = `<body style="text-align: center; font-size: 24px; margin-top: 50px; background-color: black; color: white;">Ok</body>`;
    } catch (error) {
        ctx.body = `<body style="text-align: center; font-size: 24px; margin-top: 50px; background-color: black; color: white;">Error<br>${error}</body>`;
    }
};
