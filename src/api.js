const http = require( 'https' );
const { coronaOptions, dataCacheTTL } = require( '../config' );
const Cache = require( './cache' );
const dataCache = new Cache( dataCacheTTL );
const { sha1 } = require( './encrypt' );
const log = require( './logger' );

module.exports = {
  corona: {
    load: response => {
      const hash = sha1( coronaOptions.path );
      dataCache.send( hash, () => {
        return new Promise( resolve => {
          const req = http.request( coronaOptions, res => {
            const chunks = [];
            res.on( 'data', chunk => chunks.push( chunk ) );
            res.on( 'end', () => resolve( Buffer.concat( chunks ) ) );
          } );
          req.end();
        } );
      } ).then( result => {
        response.writeHead( 200, { 'Content-Type': 'application/json' } );
        response.end( result );
      } ).catch( error => {
        response.writeHead( 500 );
        response.end();
        log.error( `API error: ${ JSON.stringify( error ) }` );
      } );
    },
  },
};
