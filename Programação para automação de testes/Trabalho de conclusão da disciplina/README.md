# Serviço de Pagamento

Trabalho de conclusão da disciplina de [Programação para Automação de Testes (PGTS)](https://pgats.juliodelima.com.br/trabalho-trilha-pos-graduacao-em-automacao-de-testes-de-software--pgats-2026/4/).


O projeto implementa uma classe `ServicoDePagamento` com dois métodos: um para realizar pagamentos e outro para consultar o último pagamento realizado.

## Requisitos

- Node.js instalado na máquina

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Executando os testes

```bash
npm test
```

## Exemplo de uso

```js
const ServicoDePagamento = require('./src/ServicoDePagamento');

const servico = new ServicoDePagamento();
servico.pagar('0987-7656-3475', 'Samar', 156.87);
console.log(servico.consultarUltimoPagamento());
```

Saída:

```js
{
  codigoBarras: '0987-7656-3475',
  empresa: 'Samar',
  valor: 156.87,
  categoria: 'cara'
}
```
