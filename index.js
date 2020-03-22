const http = require( 'http' );
const routes = require( './src/routes' );
const { port, hostname } = require( './config' );

http.createServer( routes.handler )
 .listen( port, hostname, () => {
   console.log( `Server is running at http://${ hostname }:${ port }/` );
 } );
