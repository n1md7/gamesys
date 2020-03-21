const fs = require( 'fs' );
const path = require( 'path' );
const Cache = require( './cache' );
const localCache = new Cache( 30 );
const { sha1 } = require( './encrypt' );
const log = require( './logger' );

function sendResponse( url, contentType, response ) {
  const view = `${ __dirname }/../public/`;
  const file = path.join( view, url );
  localCache.send( sha1( file ), function () {
    return new Promise( ( resolve, reject ) => {
      fs.readFile( file, ( error, content ) => {
        if ( error ) {
          log.error( 'ReadFile error. ' + JSON.stringify( error ) );
          return reject( `No such file. ${ file } not found!` );
        }
        return resolve( content );
      } );
    } );
  } ).then( content => {
    response.writeHead( 200, { 'Content-Type': contentType } );
    response.write( content );
    response.end();
  } ).catch( error => {
    response.writeHead( 404 );
    response.write( '404 Not found' );
    response.end();
    log.warning( `content for ${ file } not found. StatusCode: 404.` );
  } );
}

function getContentType( url ) {
  switch ( path.extname( url ) ) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octate-stream';
  }
}

module.exports = {
  sendResponse,
  getContentType,
};
