'use strict';

const assert = require('assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {
  let servico;

  beforeEach(() => {
    servico = new ServicoDePagamento();
  });

  describe('pagar()', () => {
    it('deve classificar pagamento com valor > 100 como "cara"', () => {
      servico.pagar('1234.5678 9012.3456 7890.1234 5', 'EmpresaA', 150);
      const pagamento = servico.consultarUltimoPagamento();
      assert.strictEqual(pagamento.categoria, 'cara');
    });

    it('deve classificar pagamento com valor <= 100 como "padrão"', () => {
      servico.pagar('9876.5432 1098.7654 3210.9876 5', 'EmpresaB', 80);
      const pagamento = servico.consultarUltimoPagamento();
      assert.strictEqual(pagamento.categoria, 'padrão');
    });

    it('deve armazenar todos os campos do pagamento: codigoBarras, empresa, valor e categoria', () => {
      const codigo = '1111.2222 3333.4444 5555.6666 7';
      const empresa = 'EmpresaC';
      const valor = 200;
      servico.pagar(codigo, empresa, valor);
      const pagamento = servico.consultarUltimoPagamento();
      assert.strictEqual(pagamento.codigoBarras, codigo);
      assert.strictEqual(pagamento.empresa, empresa);
      assert.strictEqual(pagamento.valor, valor);
      assert.ok(Object.prototype.hasOwnProperty.call(pagamento, 'categoria'));
    });
  });

  describe('consultarUltimoPagamento()', () => {
    it('deve retornar o último pagamento realizado', () => {
      servico.pagar('0001.0001 0001.0001 0001.0001 1', 'EmpresaX', 50);
      const pagamento = servico.consultarUltimoPagamento();
      assert.strictEqual(pagamento.empresa, 'EmpresaX');
    });

    it('deve retornar apenas o último pagamento quando múltiplos pagamentos foram realizados', () => {
      servico.pagar('0001.0001 0001.0001 0001.0001 1', 'Primeiro', 10);
      servico.pagar('0002.0002 0002.0002 0002.0002 2', 'Segundo', 20);
      servico.pagar('0003.0003 0003.0003 0003.0003 3', 'Terceiro', 300);
      const pagamento = servico.consultarUltimoPagamento();
      assert.strictEqual(pagamento.empresa, 'Terceiro');
      assert.strictEqual(pagamento.valor, 300);
    });
  });
});
