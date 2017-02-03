module.exports = function (router, config, providers) {

    //Methods
    var newRandom = function (req, res) {
        var provider = req.query.provider;
        var format = req.query.format;
        var size = parseInt(req.query.size);
        var hmac = req.query.hmac == 'true' ? true : false;

        if (config.allowedProviders.indexOf(provider) < 0) {
            res.status('400').jsonp({ status: '-1', error: 'invalid provider', data: '' });
            return;
        }

        if (!provider) {
            provider = config.defaultProvider;
        }

        if (format && format != 'raw' && format != 'base64' && format != 'number') {
            res.status('400').jsonp({ status: '-2', error: 'invalid format', data: '' });
            return;
        }

        if (!format) {
            format = config.defaultFormat;
        }

        if (!size) {
            size = 256;
        }

        if (size > 4096 || size < 0) {
            res.status('400').jsonp({ status: '-4', error: 'size must be a number between 0 and 4096', data: '' });
            return;
        }

        if (!hmac) {
            hmac = false;
        }

        if (hmac !== true && hmac !== false) {
            res.status('400').jsonp({ status: '-5', error: 'hmac must be a boolean', data: '' });
            return;
        }

        result = providers.get(provider, format, size, hmac);

        if (result.error) {
            res.status('500').jsonp({ status: -6, error: result.error, data: '' });
            return;
        } else {
            res.status('200').jsonp({ status: 1, error: '', data: result.data });
            return;
        }

    };

    // Routes
    router.get('/newRand', newRandom);

}
