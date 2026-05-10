const assert = require('assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {

  it('pagar deve adicionar o pagamento na lista', () => {
    const servico = new ServicoDePagamento();
    servico.pagar('0987-7656-3475', 'Samar', 156.87);

    assert.strictEqual(servico.pagamentos.length, 1);
  });

  it('pagamento acima de 100 deve ter categoria cara', () => {
    const servico = new ServicoDePagamento();
    servico.pagar('0987-7656-3475', 'Samar', 156.87);

    assert.strictEqual(servico.pagamentos[0].categoria, 'cara');
  });

  it('pagamento abaixo de 100 deve ter categoria padrao', () => {
    const servico = new ServicoDePagamento();
    servico.pagar('1234-5678-9012', 'Empresa X', 50);

    assert.strictEqual(servico.pagamentos[0].categoria, 'padrão');
  });

  it('pagamento com valor exatamente 100 deve ter categoria padrao', () => {
    const servico = new ServicoDePagamento();
    servico.pagar('3333-3333-3333', 'Empresa Y', 100);

    assert.strictEqual(servico.pagamentos[0].categoria, 'padrão');
  });

  it('pagamento com valor de 100.01 deve ter categoria cara', () => {
    const servico = new ServicoDePagamento();
    servico.pagar('4444-4444-4444', 'Empresa Z', 100.01);

    assert.strictEqual(servico.pagamentos[0].categoria, 'cara');
  });

  it('pagar deve salvar todos os dados do pagamento', () => {
    const servico = new ServicoDePagamento();
    servico.pagar('0987-7656-3475', 'Samar', 156.87);

    assert.deepStrictEqual(servico.pagamentos[0], {
      codigoBarras: '0987-7656-3475',
      empresa: 'Samar',
      valor: 156.87,
      categoria: 'cara'
    });
  });

  it('consultar ultimo pagamento retorna o mais recente', () => {
    const servico = new ServicoDePagamento();
    servico.pagar('1111-1111-1111', 'Empresa A', 50);
    servico.pagar('2222-2222-2222', 'Empresa B', 200);

    const ultimo = servico.consultarUltimoPagamento();

    assert.deepStrictEqual(ultimo, {
      codigoBarras: '2222-2222-2222',
      empresa: 'Empresa B',
      valor: 200,
      categoria: 'cara'
    });
  });

  it('consultar sem nenhum pagamento nao deve quebrar', () => {
    const servico = new ServicoDePagamento();

    const ultimo = servico.consultarUltimoPagamento();

    assert.strictEqual(ultimo, undefined);
  });

});
