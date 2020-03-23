( function ( app, defaultModal ) {
  app.load( function ( root, result ) {
    console.log( 'stats have been loaded!' );
    // update dashboard stats
    'p.last-checked-time'.find().innerText = new Date( this.state.allData.lastChecked );
    var calculatedValues = result.reduce( function ( acc, current ) {
      acc.hasOwnProperty( 'deaths' ) ? acc.deaths += current.deaths : acc.deaths = current.deaths;
      acc.hasOwnProperty( 'confirmed' ) ? acc.confirmed += current.confirmed : acc.confirmed = current.confirmed;
      acc.hasOwnProperty( 'recovered' ) ? acc.recovered += current.recovered : acc.recovered = current.recovered;
      return acc;
    }, {} );
    'h1.death-cases'.find().innerText = calculatedValues.deaths;
    'h1.recovered-cases'.find().innerText = calculatedValues.recovered;
    'h1.total-cases'.find().innerText = calculatedValues.confirmed;
    '#actions'.find( 'select' )
     .addEventListener( 'change', function ( e ) {
       this.setState( {
         result: this.state.allData.covid19Stats.slice( 0, +e.target.value ),
       } );
     }.bind( this ) );
    // enable limit button
    '#show-max'.find().removeAttribute( 'disabled' );
    this.onRender( function () {
      'button.btn'.findAll()
       .forEach( function ( btn ) {
         btn.removeEventListener( 'click', readMoreHandler );
         btn.addEventListener( 'click', readMoreHandler );
       } );
    } );
  } );

  function readMoreHandler( e ) {
    this.innerText = 'loading...';
    this.disable();
    ajax.load( '/api/v1.0/lorem/?p=30' )
     .then( function ( result ) {
       e.target.innerText = 'Read more';
       e.target.enable();
       return result;
     } )
     .then( function ( result ) {
       if ( defaultModal ) {
         defaultModal.hide();
       }
       defaultModal = modal( {
         title: e.target.parentNode.querySelector( 'h3' ).innerText,
         text: result,
         allowHTML: true,
       } ).show( function () {
         'body'.find().overflowHidden();
         console.log( this, 'My modal is visible' );
       } ).on.confirm( function () {
         'body'.find().overflowAuto();
         defaultModal = null;
         console.log( 'Confirmed' );
       } ).on.hide( function () {
         'body'.find().overflowAuto();
         defaultModal = null;
         console.log( 'Canceled/hide' );
       } );
     } );
  }
} )( new App( '#stats' ), null );

