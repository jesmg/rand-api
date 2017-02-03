var config = {};

//Port to listen
config.port = 80;

//Whitelist of available providers
config.allowedProviders = ['xkcd', 'crypto'];

//Default provider
config.defaultProvider = 'xkcd';

//Default format
config.defaultFormat = 'raw';

//HMAC secret key
config.hmacSecret = 'secret value';

//Enable https
config.https = false;

//Cert paths (used when https is enabled)
config.privateKeyPath = './private.key';
config.certPath = './cert.crt';

module.exports = config;
