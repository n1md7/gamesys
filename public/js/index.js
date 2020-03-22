var defaultModal = modal( {
  text: 'my content is here',
  title: ' my modal is here',
} ).show( function () {
  console.log( this, 'first modal shown' );
} ).on.confirm( function () {
  console.log( 'confirmed' );
} ).hide( function () {
  console.log( 'canceled/hide' );
} );


var app = new App( '#stats' );
app.load( function ( root, result ) {
  console.log( 'stats have been loaded!' );
  // for test show only 10 records after 3 seconds
  setTimeout( function () {
    this.setState( {
      result: result.slice( 0, 10 ),
    } );
  }.bind( this ), 3000 );
} );
