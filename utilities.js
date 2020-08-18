(function(window){
  // You can enable the strict mode commenting the following line  
  // 'use strict';

  // This function will contain all our code
  function snvaFunctions(){
    var _myFunctions = {};

    // We will add functions to our library here !

    return _myFunctions;
  }

  // We need that our library is globally accesible, then we save in the window
  if(typeof(window.snvaLibrary) === 'undefined'){
    window.snvaLibrary = snvaFunctions();
  }
})(window);

console.log("Iniciando");
console.log(snvaLibrary);