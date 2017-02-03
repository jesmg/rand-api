module.exports = function () {

    var providers = {};

    providers.get = function (provider, format, size, hash) {

        switch (provider) {
            case 'xkcd': return xkcdProvider(format, size, hash);
            default: return { error: '[Provider error] Provider not found', data: '' }
        }

    };



    var xkcdProvider = function (format, size, hash) {

        return { error: '', data: xkcdSource() }

    };

    var xkcdSource = function () {

        return 4; // chosen by fair dice roll
        // guaranteed to be random
        // https://xkcd.com/221/

    };

    return providers;

}
