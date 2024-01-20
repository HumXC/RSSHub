const path = require('path');
// 导入自定义 Api 路由
const dirname = path.dirname(__dirname);
class FakeRouter {
    constructor(routes, dir) {
        this.dir = dir ?? '';
        this.routes = routes;
    }
    get(path_, func) {
        this.routes.set('/' + path.join(this.dir, path_), func);
    }
}
// 遍历整个 routes 文件夹，收集模块路由 router.js
const RouterPath = require('require-all')({
    dirname,
    filter: /router\.js$/,
    excludeDirs: /warp/,
});

const diyroutes = {};
// 将收集到的自定义模块路由进行合并
for (const dir in RouterPath) {
    const project = RouterPath[dir]['router.js']; // Do not merge other file
    diyroutes[dir] = project;
}
const routes = new Map();
for (const dir in diyroutes) {
    diyroutes[dir](new FakeRouter(routes, dir));
}
const warp = require('./warp');
module.exports = (router) => {
    for (const path of routes.keys()) {
        router.get(path, warp(routes.get(path)));
    }
};
