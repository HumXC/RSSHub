const v2routes = require('./v2router');
const dirname = __dirname + '/diy';

// 遍历整个 routes 文件夹，收集模块路由 router.js
const RouterPath = require('require-all')({
    dirname,
    filter: /router\.js$/,
});

const diyroutes = {};

// 将收集到的自定义模块路由进行合并
for (const dir in RouterPath) {
    const project = RouterPath[dir]['router.js']; // Do not merge other file
    diyroutes[dir] = project;
}

// 合并 v2router 和 router
const routes = Object.assign(v2routes, diyroutes);
module.exports = routes;
