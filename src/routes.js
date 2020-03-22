const {
  getContentType,
  sendResponse,
} = require( './communications' );
const {corona} = require( './api' );
const log = require( './logger' );

function routes( request, response ) {
  log.message( `Requested URL: [${ request.url }]; from: ${ request.connection.remoteAddress }` );
  switch ( request.url ) {
    case '/':
      sendResponse( 'index.html', 'text/html', response );
      break;
    case '/api/v1.0/corona/all':
      corona.load(response);
      break;
    default:
      sendResponse( request.url, getContentType( request.url ), response );
  }
}

exports.handler = routes;
