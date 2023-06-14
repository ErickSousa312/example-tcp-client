const net = require('net');


function startClientTCP(){
    const client = new net.Socket();

    const port = 3001;
    const serverAddress = 'localhost';
    
    client.connect(port, serverAddress, () => {
      console.log(`Conectado ao servidor`);
    
      const message = '1;5;FVFFF';
    
      client.write(message);
    });
    
    client.on('data', (data) => {
      console.log(`Resposta do servidor: ${data}`);
    });
    
    client.on('close', () => {
      console.log('Conexão fechada');
    });
    
    client.on('error', (error) => {
      console.error(`Erro na conexão: ${error.message}`);
    });
  
}

module.exports = startClientTCP