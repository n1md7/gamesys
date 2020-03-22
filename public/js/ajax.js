var ajax = ( function ( Ajax, global ) {
  if ( typeof global !== 'undefined' ) {
    return new Ajax();
  }
} )( function () {

  this.load = function ( url ) {
    return new Promise( function ( resolve, reject ) {
      var httpRequest = new XMLHttpRequest();

      if ( !httpRequest ) {
        return reject('You have an invalid Browser, please download new one!');;
      }
      httpRequest.onreadystatechange = function () {
        if ( httpRequest.readyState === XMLHttpRequest.DONE ) {
          if ( httpRequest.status === 200 ) {
            return resolve( httpRequest.responseText );
          } else {
            return reject( 'There was a problem with the request.' );
          }
        }
      };
      httpRequest.open( 'GET', url );
      httpRequest.send();
    } );
  };

}, window );
