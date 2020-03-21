const crypto = require( 'crypto' );

module.exports = {
  sha1: function ( key ) {
    return crypto
     .createHash( 'sha1' )
     .update( key )
     .digest( 'hex' );
  },
};
