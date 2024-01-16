module.exports = (router) => {
    router.get('/user/bookmarks/:id', require('./bookmarks'));
};
