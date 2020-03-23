const http = require( 'http' );
const routes = require( './src/routes' );
const {
  port,
  hostname,
  fileCacheTTL,
  dataCacheTTL,
} = require( './config' );

http.createServer( routes.handler )
 .listen( port, hostname, () => {
   console.log( `Server is running at http://${ hostname }:${ port }/` );
   console.log('Cache values are in seconds.')
   console.log( { fileCacheTTL, dataCacheTTL } );
 } );
