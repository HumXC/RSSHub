module.exports = (router) => {
    router.get('/bookmark/add/:illust_id', require('./bookmarks-add'));
};
