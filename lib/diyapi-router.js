const Router = require('@koa/router');
const router = new Router();
// 导入自定义 Api 路由
const dirname = __dirname + '/diyapi';

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

for (const dir in diyroutes) {
    const sub_route = new Router();
    diyroutes[dir](sub_route);
    router.use(`/${dir}`, sub_route.routes(), sub_route.allowedMethods());
}

module.exports = router;
