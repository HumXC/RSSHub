module.exports = (router) => {
    router.get('/user/bookmarks/:id', require('./bookmarks'));
    router.get('/user/:id', require('./user'));
    router.get('/ranking/:mode/:date?', require('./ranking'));
};
