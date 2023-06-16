const net = require('net');
const fs = require('fs');
const path = require('path');

const serverHost = 'localhost';
const serverPort = 3001;
const arquivoRespostas = path.join(__dirname, 'questoes.txt');


// Variável para armazenar as estatísticas
const estatisticas = {};

// Função para ler o arquivo de respostas
function lerArquivoRespostas() {
  try {
    const data = fs.readFileSync(arquivoRespostas, 'utf-8');
    console.log(data)
    return data;
  } catch (error) {
    console.error(`Erro ao ler o arquivo de respostas: ${error}`);
    return '';
  }
}

// Função para atualizar as estatísticas
function atualizarEstatisticas(resultado) {
  const [numeroQuestao, acertos, erros] = resultado.split(';');
  estatisticas[numeroQuestao] = {
    acertos: parseInt(acertos),
    erros: parseInt(erros),
  };
}

// Função para exibir as estatísticas
function exibirEstatisticas() {
  console.log('Estatísticas:');
  Object.entries(estatisticas).forEach(([questao, { acertos, erros }]) => {
    console.log(`Questão ${questao}: acertos=${acertos} erros=${erros}`);
  });
}

// Conexão com o servidor
const client = new net.Socket();

// Evento de conexão estabelecida

function a(){
  
client.connect(serverPort, serverHost, () => {
  console.log(`Conectado ao servidor: ${serverHost}:${serverPort}`);

  const respostas = lerArquivoRespostas();

  // Envia as respostas para o servidor
  client.write(respostas);
});

// Evento de recebimento de dados do servidor
client.on('data', (data) => {
  const resultado = data.toString().trim();
  console.log(`Resultado do servidor: ${resultado}`);

  // Atualiza as estatísticas com base no resultado recebido
  atualizarEstatisticas(resultado);
});

// Evento de fechamento da conexão
client.on('close', () => {
  console.log('Conexão encerrada');

  // Exibe as estatísticas ao encerrar a conexão
  exibirEstatisticas();
});

// Evento de erro na conexão
client.on('error', (error) => {
  console.error(`Erro na conexão: ${error}`);
});
}

module.exports = a