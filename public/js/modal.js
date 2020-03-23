var modal = ( function ( Modal, global ) {
  if ( typeof global !== 'undefined' ) {
    return function ( config ) {
      return new Modal( config );
    };
  }
} )( function ( config ) {
  var modal = null;
  var modalHeader = 'My title';
  var modalBody = config;
  if ( typeof config === 'object' ) {
    modalBody = config.text;
    modalHeader = config.title;
  }

  function createModal() {
    var id = Math.random().toString( 36 ).substring( 7 );
    document
     .body
     .insertAdjacentHTML(
      'afterbegin',
      '' +
      '<div id="' + id + '" class="modal">' +
      '  <div class="modal-header">' +
      '   <span></span><b class="close">&#10006;</b>' +
      '  </div>' +
      '  <div class="modal-body"></div>' +
      '  <div class="modal-footer">' +
      '    <button class="close btn btn-primary">Cancel</button>' +
      '    <button class="confirm btn btn-success">Confirm</button>' +
      '  </div>' +
      '</div>' );

    if ( !'.modal-cover'.find() ) {
      var modalCover = document.createElement( 'div' );
      modalCover.setAttribute( 'class', 'modal-cover hidden' );
      document.body.appendChild( modalCover );
    }

    return document.getElementById( id );
  }

  var callbacks = {
    hide: [],
    confirm: [],
    show: [],
  };

  this.on = {
    confirm: function ( callback ) {
      callbacks[ 'confirm' ].push( callback );
      return this;
    }.bind( this ),
    hide: function ( callback ) {
      callbacks[ 'hide' ].push( callback );
      return this;
    }.bind( this ),
    show: function ( callback ) {
      callbacks[ 'show' ].push( callback );
      return this;
    }.bind( this ),
  };


  this.show = function ( instantCallback ) {
    this.hide();
    modal = createModal();
    // set header/body text
    modal
     .querySelector( 'div.modal-header>span' )
     .innerText = modalHeader;
    if ( config.allowHTML ) {
      modal
       .querySelector( 'div.modal-body' )
       .innerHTML = modalBody;
    } else {
      modal
       .querySelector( 'div.modal-body' )
       .innerText = modalBody;
    }
    // bind event listeners
    modal
     .querySelector( 'button.close' )
     .addEventListener( 'click', this.cancel.bind( this ) );
    modal
     .querySelector( 'b.close' )
     .addEventListener( 'click', this.cancel.bind( this ) );
    modal
     .querySelector( 'button.confirm' )
     .addEventListener( 'click', this.confirm.bind( this ) );

    if ( typeof instantCallback === 'function' ) instantCallback.call( modal );
    if ( callbacks.hasOwnProperty( 'show' ) ) {
      callbacks.show.forEach( function ( fn ) {
        if ( typeof fn === 'function' ) fn.call( modal );
      } );
    }

    'div.modal-cover'.find().show();

    return this;
  };

  this.hide = function () {
    if ( modal ) {
      modal
       .querySelector( 'button.close' )
       .removeEventListener( 'click', this.hide );
      modal
       .querySelector( 'button.confirm' )
       .removeEventListener( 'click', this.confirm );
      modal.parentNode.removeChild( modal );
      // exec callbacks
      if ( callbacks.hasOwnProperty( 'hide' ) ) {
        callbacks.hide.forEach( function ( fn ) {
          if ( typeof fn === 'function' ) fn();
        } );
      }
      'div.modal-cover'.find().hide();
    }

    return this;
  };

  this.confirm = function () {
    modal
     .querySelector( 'button.close' )
     .removeEventListener( 'click', this.hide );
    modal
     .querySelector( 'button.confirm' )
     .removeEventListener( 'click', this.confirm );
    modal.parentNode.removeChild( modal );

    if ( callbacks.hasOwnProperty( 'confirm' ) ) {
      callbacks.confirm.forEach( function ( fn ) {
        if ( typeof fn === 'function' ) fn();
      } );
    }
    'div.modal-cover'.find().hide();
  };

  this.cancel = function () {
    this.hide();
  };

}, window );


