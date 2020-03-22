function App( root ) {
  this.state = {
    url: '/api/v1.0/corona/all',
    result: null,
    root: root.find(),
  };

  this.load = function ( callback ) {
    ajax.load( this.state.url ).then( function ( result ) {
      var json = JSON.parse( result );
      console.log( json.data );
      this.state.result = json.data.covid19Stats;
      if ( typeof callback === 'function' ) {
        callback.call( this, this.state.root, this.state.result );
        render.call( this );
      }
    }.bind( this ) );

    return this;
  };

  this.setState = function ( update ) {
    Object.entries( update )
     .forEach( function ( item ) {
       this.state[ item[ 0 ] ] = item[ 1 ];
     }, this );

    render.call( this );
  };

  function render() {
    // clear playground
    root.find().innerHTML = '';
    var stats = this.state.result;
    if ( stats ) {
      stats.forEach( function ( stat ) {
        var card = createCard(
         stat.country + '[' + stat.province + ']: ' + stat.confirmed,
        );
      } );
    }
  }

  function createCard( html ) {
    var card = document.createElement( 'div' );
    card.innerHTML = html || 'Default text';
    root.find().appendChild( card );
    return card;
  }
}
