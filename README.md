# rand-api
## Random numbers and entropy RESTful API provider

### Requeriments

* NodeJS 4.5.0+ (Developed on 4.7.3)
* Express 4.7.1+

### How to use

Execute **nodejs app.js**.

### API Calls

* GET /newRand
    * Query:
        * **provider** -> The random data provider. Available providers: xkcd and crypto. OPTIONAL, DEFAULT: XKCD.
        * **format** -> Output format. Options: Raw, number or base64. OPTIONAL, DEFAULT: RAW.
        * **size** -> Random data buffer size. Number between 0 and 4096. OPTIONAL, DEFAULT: 256.
        * **hmac** -> Returned value must be the hmac function of the output. True or false. OPTIONAL, DEFAULT: FALSE.

### Configuration

Edit config.js to change default configuration. 
Config.js default values:

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

### License

See LICENSE file.