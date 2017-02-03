module.exports = {

    getArray: function (formatCallback, size, hmac) {

        var data = Buffer.alloc(size).fill(4);  // chosen by fair dice roll.
        return formatCallback(data, hmac);  // guaranteed to be random.

    }

}