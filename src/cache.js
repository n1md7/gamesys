function Cache( timeToLiveSeconds = 120 ) {
  // convert to milliseconds
  this.ttl = +timeToLiveSeconds * 1000;
  this.cache = {};
}

Cache.prototype.send = function ( key, storeFunction ) {
  if ( this.cache.hasOwnProperty( key ) ) {
    const { ttl, cache } = this;
    const { time } = cache[ key ];
    const requestTime = 1 * new Date();
    if ( requestTime > ttl + time ) {
      // expired
      console.log( 'Cache expired', {
        requestTime,
        cacheTime: time,
      } );
      return this.set( key, storeFunction )
       .then( result => result.content );
    }
    return this.get( key )
     .then( result => result.content );
  }

  // set new cache
  return this.set( key, storeFunction )
   .then( result => result.content );
};

Cache.prototype.get = function ( key ) {
  if ( this.cache.hasOwnProperty( key ) ) {
    console.log( 'Cache taken from memory' );
    return Promise.resolve( this.cache[ key ] );
  }
};

Cache.prototype.set = function ( key, storeFunction ) {
  if ( typeof storeFunction === 'function' ) {
    console.log('Cache has been set');
    return storeFunction()
     .then( result => this.cache[ key ] = {
       time: 1 * new Date(),
       content: result,
     } );
  }
};

module.exports = Cache;
