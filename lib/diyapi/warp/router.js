const path = require('path');
// 导入自定义 Api 路由
const dirname = path.dirname(__dirname);
class FakeRouter {
    constructor(routes, dir) {
        this.dir = dir ?? '';
        this.routes = routes;
    }
    get(path_, func) {
        this.routes.push(['get', '/' + path.join(this.dir, path_), func]);
    }
    post(path_, func) {
        this.routes.push(['post', '/' + path.join(this.dir, path_), func]);
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
const routes = [];
for (const dir in diyroutes) {
    diyroutes[dir](new FakeRouter(routes, dir));
}
const warp = require('./warp');
module.exports = (router) => {
    for (const route of routes) {
        if (route[0] === 'get') {
            router.get(route[1], warp(route[2]));
        } else if (route[0] === 'post') {
            router.post(route[1], warp(route[2]));
        }
    }
};
