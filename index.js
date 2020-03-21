const http = require( 'http' );
const routes = require( './src/routes' );
const hostname = '127.0.0.1';
const port = 8080;

http.createServer( routes.handler )
 .listen( port, hostname, () => {
   console.log( `Server is running at http://${ hostname }:${ port }/` );
 } );
