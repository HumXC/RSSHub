const config = require('@/config').value;

function template(ctx, value) {
    ctx.type = 'text/html';
    ctx.body = `<body style="text-align: center; font-size: 24px; margin-top: 50px; background-color: black; color: white;">${value}</body>`;
}
module.exports = (func) => async (ctx) => {
    if (!config.baseUrl || config.baseUrl === '') {
        throw 'need BASE_URL';
    }
    try {
        await func(ctx);
        let body = JSON.stringify(ctx.body);
        if (body === '"{}"') {
            body = '';
        }
        template(ctx, `OK<br>${body}`);
    } catch (error) {
        template(ctx, `Error<br>${error}`);
    }
};
