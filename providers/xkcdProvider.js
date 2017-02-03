module.exports = {

    getArray: function (formatCallback, size, hmac) {

        var data = [];
        data.fill('1', size);   // chosen by fair dice roll.
        return formatCallback(data, hmac);  // guaranteed to be random.

    }

}