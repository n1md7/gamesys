function App( root ) {
  this.state = {
    url: '/api/v1.0/corona/all',
    result: null,
    root: root.find(),
    allData: null,
  };

  this.load = function ( callback ) {
    ajax.load( this.state.url ).then( function ( result ) {
      var json = JSON.parse( result );
      this.state.allData = json.data;
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

  var renderCallbacks = [];
  this.onRender = function ( callback ) {
    if ( typeof callback === 'function' ) {
      renderCallbacks.push(callback);
    }
  };

  function render() {
    // clear playground
    root.find().innerHTML = '';
    var stats = this.state.result;
    if ( stats ) {
      var row = null;
      stats.forEach( function ( stat, index ) {
        var col = document.createElement( 'div' );
        col.classList.add( 'col' );
        if ( index % 3 === 0 ) {
          row = document.createElement( 'div' );
          row.classList.add( 'row' );
          row.classList.add( 'no-gutters' );
        }
        var country = stat.country;
        if ( stat.province ) {
          country += ' - ' + stat.province;
        }
        col.insertAdjacentHTML(
         'afterbegin',
         '<div class="card">' +
         '        <h3>' + country + '</h3>' +
         '        <ul>' +
         '          <li>Cases: <b>' + stat.confirmed + '</b></li>' +
         '          <li>Death: <b>' + stat.deaths + '</b></li>' +
         '          <li>Recovered: <b>' + stat.recovered + '</b></li>' +
         '        </ul>' +
         '        <button class="btn btn-primary">Read more</button>' +
         '      </div>',
        );
        row.appendChild( col );
        if ( index % 3 === 0 ) {
          root.find().appendChild( row );
        }
      } );
    }
    renderCallbacks.forEach( function ( fn ) {
      if ( typeof fn === 'function' ) {
        fn();
      }
    } );
  }

}
