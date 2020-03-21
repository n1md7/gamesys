const fs = require('fs');

function Logger(){
  function write( type, text ) {
    fs.appendFile(
     `${ __dirname }/../.server-logs`,
     `[${type}] [${new Date()}] - ${text} \n`,
     function (error) {
      if (error) return console.log(error);
    });
  }

  return {
    error: function ( msg ) {
      write('error', msg);
      return this;
    },
    warning: function ( msg ) {
      write('warning', msg);
      return this;
    },
    message: function ( msg ) {
      write('message', msg);
      return this;
    }
  }
}

module.exports = Logger();
