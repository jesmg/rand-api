module.exports = function () {

    get: function(provider, format, size, hash) {
        
       switch(provider) {
          case 'xkcd': return xkcdProvider(format, size, hash); break;
          default: return {error: '[Provider error] Provider not found', data: ''}     
       }
      
    };

    xkcdProvider(format, size, hash) {

        return 4; // chosen by fair dice roll
                  // guaranteed to be random
                  // https://xkcd.com/221/

    };     
   
}
