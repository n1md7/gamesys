String.prototype.find = function ( selector ) {
  var parent = document.querySelector( this );

  if ( selector ) {
    return parent.querySelector( selector );
  }

  return parent;
};

String.prototype.findAll = function ( selectors ) {
  var parents = Array.from( document.querySelectorAll( this ) );

  if ( selectors ) {
    return parents.map( function ( parent ) {
      return Array.from( parent.querySelectorAll( selectors ) );
    } );
  }

  return parents;
};

Element.prototype.show = function () {
  this.classList.remove( 'hidden' );
};

Element.prototype.hide = function () {
  this.classList.add( 'hidden' );
};

Element.prototype.overflowHidden = function () {
  this.classList.add( 'overflow-hidden' );
};

Element.prototype.overflowAuto = function () {
  this.classList.remove( 'overflow-hidden' );
};

Element.prototype.disable = function () {
  this.setAttribute( 'disabled', '' );
};

Element.prototype.enable = function () {
  this.removeAttribute( 'disabled' );
};
