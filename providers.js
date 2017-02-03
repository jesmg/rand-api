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

    //Formatters. Data is a byte array.
    var rawFormat = function (data, hmac) {
        return { error: '', data: hmac ? hmacFormat(data) : data };
    };

    var base64Format = function (data, hmac) {
        return { error: '', data: hmac ? hmacFormat(data.toString('base64')) : data.toString('base64') };
    };

    var numberFormat = function (data, hmac) {
        var number = 0;
        for (var i = 0; i < len(data); i++) {
            (data[i] == 1) ? number += 2 ^ i : number;
        }
        return { error: '', data: hmac ? hmacFormat(number) : number };
    };

    //Always returns base64
    var hmacFormat = function (data) {
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', config.hmacSecret);
        hmac.update(data);
        hmac.digest('base64');
    };

    return providers;

}
