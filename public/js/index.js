( function ( app ) {
  var defaultModal = null;

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
    '#show-max'.find().removeAttribute('disabled');
    this.onRender( function () {
      'button.btn'.findAll()
       .forEach( function ( btn ) {
         btn.removeEventListener( 'click', readMoreHandler );
         btn.addEventListener( 'click', readMoreHandler );
       } );
    } );
  } );

  function readMoreHandler( e ) {
    console.log('clickdas')
    if ( defaultModal ) {
      defaultModal.hide();
    }
    defaultModal = modal( {
      text: e.target.parentNode.querySelector( 'h3' ).innerText,
      title: ' my modal is here',
    } ).show( function () {
      console.log( this, 'first modal shown' );
    } );
    defaultModal.on.confirm( function () {
      defaultModal = null;
      console.log( 'confirmed' );
    } );
    defaultModal.on.hide( function () {
      defaultModal = null;
      console.log( 'canceled/hide' );
    } );
  }

} )( new App( '#stats' ) );

