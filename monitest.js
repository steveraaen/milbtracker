var Moniker = require('moniker');

  var names = Moniker.generator([Moniker.adjective, Moniker.noun],{maxSize: 6, glue: ' '} );
  console.log(names.choose())




