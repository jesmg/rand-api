module.exports = function (router, config, providers) {

    //Methods
    var newRandom = function (req, res) {
        var provider = req.params.provider;
        var format = req.params.format;
        var size = req.params.size;
        var hash = req.params.hash;

        if (config.allowedProviders.indexOf(provider) > -1) {
            res.status('400').jsonp({ status: '-1', error: 'invalid provider', data: '' });
        }

        if (!provider) {
            provider = config.defaultProvider;
        }

        if (format && format != 'raw' && format != 'hex' && format != 'number') {
            res.status('400').jsonp({ status: '-2', error: 'invalid format', data: '' });
        }

        if (!format) {
            format = config.defaultFormat;
        }

        if (!size) {
            size = 256;
        }

        if (isNaN(size) || size > 4096) {
            res.status('400').jsonp({ status: '-4', error: 'size must be a number', data: '' });
        }

        if (!hash) {
            hash = true;
        }

        if (hash !== true && hash !== false) {
            res.status('400').jsonp({ status: '-5', error: 'hash must be boolean', data: '' });
        }

        result = providers.get(provider, format, size, hash);

        if (result.error) {
            res.status('500').jsonp({ status: -6, error: result.error, data: '' });
        } else {
            res.status('200').jsonp({ status: 1, error: '', data: result.data });
        }

    };

    // Routes
    router.get('/newRand', newRandom);

}
