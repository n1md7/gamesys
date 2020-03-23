const {
  getContentType,
  sendResponse,
} = require( './communications' );
const { corona, loremIpsum } = require( './api' );
const log = require( './logger' );

function routes( request, response ) {
  log.message( `Requested URL: [${ request.url }]; from: ${ request.connection.remoteAddress }` );
  switch ( true ) {
    case request.url === '/':
      sendResponse( 'index.html', 'text/html', response );
      break;
    case request.url === '/api/v1.0/corona/all':
      corona.load( response );
      break;
    case /^\/api\/v1\.0\/lorem\/\?p=[0-9]{1,2}$/.test( request.url ):
      const http = request.connection.encrypted ? 'https' : 'http';
      const myURL = new URL( `${ http }://${ request.headers.host }${ request.url }` );
      loremIpsum.load( response, myURL.searchParams.get( 'p' ) || 30 );
      break;
    default:
      sendResponse( request.url, getContentType( request.url ), response );
  }
}

exports.handler = routes;
