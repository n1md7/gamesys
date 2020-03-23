( function ( app, defaultModal, toggleModal ) {
  app.load( function ( root, result ) {
    console.info( 'Data have been loaded!' );
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
    ajax.load( '/api/v1.0/lorem/?p=3' )
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
         text: 'Click <b>Confirm</b> to toggle Modal!' + result,
         allowHTML: true,
       } ).show( function () {
         // callback if necessary
       } ).on.confirm( function () {
         defaultModal = null;
         // now start toggling of small/long content modal
         ( function toggle( type ) {
           ajax.load( '/api/v1.0/lorem/?p=' + ( type === 'small' ? 1 : 12 ) )
            .then( function ( text ) {
              toggleModal = modal( {
                title: type + ' text',
                text: 'Do you want to see ' + ( ( type === 'small' ? 'long' : 'small' ) ) + ' text?' + text,
                allowHTML: true,
              } ).show().on.confirm( function () {
                toggleModal = null;
                toggle( type === 'small' ? 'long' : 'small' );
              } );
            } );
         } )( 'small' );
       } ).on.hide( function () {
         defaultModal = null;
       } );
     } );
  }
} )( new App( '#stats' ), null, null );

