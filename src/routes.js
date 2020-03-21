const {
  getContentType,
  sendResponse,
} = require( './communications' );
const log = require('./logger');

function routes( request, response ) {
  log.message(`Requested URL: [${request.url}]; from: ${request.connection.remoteAddress}`);
  switch ( request.url ) {
    case '/':
      sendResponse( 'index.html', 'text/html', response );
      break;
    default:
      sendResponse( request.url, getContentType( request.url ), response );
  }
}

exports.handler = routes;
