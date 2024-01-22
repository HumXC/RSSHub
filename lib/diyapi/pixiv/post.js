const { getToken } = require('@/v2/pixiv/token');
const config = require('@/config').value;
const maskHeader = require('@/v2/pixiv/constants').maskHeader;
const got = require('@/v2/pixiv/pixiv-got');
// Base: https://github.com/alphasp/pixiv-api-client/blob/master/index.js
const qs = require('qs');
const md5 = require('blueimp-md5');
const moment = require('moment');
const HASH_SECRET = '28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c';
async function post(ctx, url, data) {
    if (!config.pixiv || !config.pixiv.refreshToken) {
        throw 'pixiv RSS is disabled due to the lack of <a href="https://docs.rsshub.app/install/#pei-zhi-bu-fen-rss-mo-kuai-pei-zhi">relevant config</a>';
    }
    const data_qs = qs.stringify(data);

    const token = await getToken(ctx.cache.tryGet);
    if (!token) {
        throw 'pixiv not login';
    }
    const datetime = moment().format();
    return await got.post(url, {
        headers: {
            ...maskHeader,
            Authorization: 'Bearer ' + token,
            'X-Client-Time': datetime,
            'X-Client-Hash': md5(`${datetime}${HASH_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data_qs,
    });
}

module.exports = post;
