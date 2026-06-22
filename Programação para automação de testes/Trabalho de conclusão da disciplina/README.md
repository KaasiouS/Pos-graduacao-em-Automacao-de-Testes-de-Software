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

## Pipeline CI/CD — GitHub Actions

### Requisitos atendidos

| Requisito | Como foi atendido |
|---|---|
| Execução por push | trigger `on: push` na branch main |
| Execução manual | trigger `on: workflow_dispatch` |
| Execução agendada | trigger `on: schedule` (cron 02:10 UTC) |
| Geração de relatório | mochawesome — HTML interativo |
| Relatório armazenado | upload-artifact (30 dias de retenção) |

### Conceitos utilizados

**Triggers** — Eventos que disparam o workflow automaticamente. Podem ser ações no repositório (`push`, `pull_request`), agendamento via cron (`schedule`) ou disparo manual (`workflow_dispatch`). Permitem controle granular sobre quando a pipeline executa.

**Concurrency** — Mecanismo que evita execuções redundantes do mesmo workflow. Quando um novo run é disparado para o mesmo branch, o anterior é cancelado automaticamente, economizando minutos de Actions e evitando resultados desatualizados.

**Jobs** — Unidades de trabalho independentes dentro do workflow. Cada job roda em seu próprio runner (máquina virtual), podendo executar em paralelo ou em sequência conforme dependências declaradas com `needs`.

**Steps** — Passos sequenciais dentro de um job. Cada step executa um comando shell (`run`) ou uma action reutilizável (`uses`). Compartilham o mesmo runner e sistema de arquivos, permitindo que artefatos gerados em um step sejam usados nos seguintes.

**Actions Marketplace** — Repositório público de actions reutilizáveis mantidas pela comunidade e pelo GitHub. Actions como `actions/checkout`, `actions/setup-node` e `actions/upload-artifact` encapsulam lógica complexa em uma linha de configuração, promovendo reuso e padronização.

**Artifacts** — Arquivos gerados durante o workflow e armazenados pelo GitHub para download posterior. No projeto, o relatório HTML do mochawesome é publicado como artefato com 30 dias de retenção, acessível pela aba *Summary* de cada run.

### Como executar localmente

```bash
npm run test:report
```

O relatório HTML será gerado em `mochawesome-report/report.html`.
