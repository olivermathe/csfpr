# csfpr
CSF Portal Relacionamento

[![NPM Version](https://img.shields.io/npm/v/csfpr.svg?color=blue)](https://www.npmjs.com/package/csfpr)

## Conteúdo

- [Instalação](#instalação)
- [Introdução](#introdução)
- [Serviços](#serviços)

## Instalação

Esse é um modulo [Node.js](https://nodejs.org/en/) diponivel através do [npm](https://www.npmjs.com/).

Antes de usar é necessário instalar Node.js 10.15 ou maior.

A instalação é feita através do comando [`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install csfpr
```

## Introdução

Este projeto tem como objetivo facilitar a utilização dos serviços disponibilizados pelo CSF através do portal de relacionamento, centralizando os métodos dos serviços SOAP em um só modulo Node.js.

Exemplo de utilização:

```js
const Csfpr = require('csfpr');

const csfpr = new Csfpr({
  host: '10.234.5.17',
  canalSolicitacao: 'MEUCANAL',
  chaveSolicitacao: 201924,
  senha: 'minhasenha',
  usuario: 'meuusuario',
  codigoHierarquia: 2019,
  codigoTransacaoNegocio: 'PRNINT0002'
});

csfpr.tokenEletronico.obterSmsToken('03872962023', 982154887, 51, 55)
	.then(response => console.log('Token enviado!'))
	.catch(error => console.log('OOPS algo deu errado!');

```

Neste exemplo um cliente SOAP é iniciado com algumas configurações especificas, após é chamado o metodo **obterSmsToken()** do serviço **tokenEletronico** onde sera enviado um sms para o número **(51)98215-4887**.

## Serviços
Veja a [documentação](DOC.md) dos serviços disponiveis.
