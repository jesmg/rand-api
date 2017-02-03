module.exports = {

    getArray: function(formatCallback, size, hmac) {
        
        const crypto = require('crypto');
        var data = crypto.randomBytes(size);
        return formatCallback(data, hmac);

    }

}