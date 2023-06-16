const StartClientTCP = require('./clientTCP');
class Loaders {
  start (){
    StartClientTCP();
  }
}
module.exports = new Loaders (); 

