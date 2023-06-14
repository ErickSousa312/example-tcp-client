const StartClientUDP = require('./clientTCP');
class Loaders {
  start (){
    StartClientUDP();
  }
}
module.exports = new Loaders (); 

