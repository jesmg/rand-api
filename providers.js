module.exports = function (config) {

    //Load providers
    var xkcdProvider = require('./providers/xkcdProvider.js');
    var cryptoProvider = require('./providers/cryptoProvider.js');

    //Main function
    var providers = {};

    providers.get = function (provider, format, size, hmac) {

        var formatCallback;
        switch (format) {
            case 'raw': formatCallback = rawFormat; break;
            case 'base64': formatCallback = base64Format; break;
            case 'number': formatCallback = numberFormat; break;
        }

        switch (provider) {
            case 'xkcd': return xkcdProvider.getArray(formatCallback, size, hmac);
            case 'crypto': return cryptoProvider.getArray(formatCallback, size, hmac);
            default: return { error: '[Provider error] Provider not found', data: '' }
        }

    };

    //Formatters. Data is a buffer.
    var rawFormat = function (data, hmac) {
        return { error: '', data: (hmac ? hmacFormat(data) : data.toJSON().data) };
    };

    var base64Format = function (data, hmac) {
        return { error: '', data: (hmac ? hmacFormat(data.toString('base64')) : data.toString('base64')) };
    };

    var numberFormat = function (data, hmac) {
        return { error: '', data: (hmac ? hmacFormat(data.readUInt32BE().toString()) : data.readUInt32BE()) };
    };

    //Always returns base64
    var hmacFormat = function (data) {
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', config.hmacSecret);
        hmac.update(data);
        return hmac.digest('base64');
    };

    return providers;

}
