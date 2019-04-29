const Soap = require('soap');

const Conf = require('./conf');

// eslint-disable-next-line no-unused-vars
const Autenticacao = require('./autenticacao');

/**
 * Este serviço é responsável por obter e validar o Token Eletrônico do cliente 
 * solicitante de determinadas funcionalidades. Endereço para acesso ao serviço
 * @class
 * @param {Object} opts
 * @param {Autenticacao} opts.autenticacao - Class responsavel por autenticar 
 * @param {string} opts.host
 * @param {string} [opts.path]
 * @param {number} opts.codigoHierarquia
 * @param {string} opts.canalSolicitacao
 * @param {number} opts.chaveSolicitacao
 * @param {string} opts.codigoTransacaoNegocio
 */
class TokenEletronico {

    constructor(opts) {

        this.autenticacao = opts.autenticacao;

        this.host = opts.host;
        this.path = opts.path || '/Csf.PR.Svc.TokenEletronico/GerenciadorTokenEletronico.svc';
        this.codigoHierarquia = opts.codigoHierarquia;
        this.canalSolicitacao = opts.canalSolicitacao;
        this.chaveSolicitacao = opts.chaveSolicitacao;
        this.codigoTransacaoNegocio = opts.codigoTransacaoNegocio;

        this.client = null;

    }

    async getClient() {

        const { host, path } = this;

        const wsdl = `http://${host + path}?wsdl`;

        let { client } = this;

        if (!client)
            client = await Soap.createClientAsync(wsdl, Conf);

        // Retorna um token valido
        const token = await this.autenticacao.getTokenPlataformaRelacionamento();

        const header = { TokenPlataformaRelacionamento: token };

        // Atualiza token no cabeçalho xml
        client.clearSoapHeaders();
        client.addSoapHeader(header);

        this.client = client;

        return this.client;

    }

    /**
     * Método responsável por realizar a criação de um token eletrônico de segurança e, opcionalmente, 
     * realizar a tentativa de entrega ao cliente final, conforme os parâmetros passados.
     * @method
     * @param {string} cpf
     * @param {number} numero
     * @param {number} ddd
     * @param {number} ddi
     * @returns {object}
     */
    async obterSmsToken(cpf, numero, ddd, ddi) {

        const client = await this.getClient();

        const args = {
            solicitacao: {
                CanalSolicitacao: this.canalSolicitacao,
                ChaveSolicitacao: this.chaveSolicitacao,
                CodigoTransacaoNegocio: this.codigoTransacaoNegocio,
                Email: '',
                NumeroCpf: cpf,
                TelefoneSeguro: {
                    DDD: ddd,
                    DDI: ddi,
                    Numero: numero,
                },
                TipoEntrega: 'SMS',
            },
        };

        const result = await client.ObterTokenAsync(args);

        return result[0];

    }

    /**
     * @param {string} cpf
     * @param {number} numero
     * @param {number} ddd
     * @param {number} ddi
     * @returns {object}
     */
    async obterEmailToken(cpf, email) {

        const client = await this.getClient();

        const args = {
            solicitacao: {
                CanalSolicitacao: this.canalSolicitacao,
                ChaveSolicitacao: this.chaveSolicitacao,
                CodigoTransacaoNegocio: this.codigoTransacaoNegocio,
                Email: email,
                NumeroCpf: cpf,
                TelefoneSeguro: {
                    DDD: '',
                    DDI: '',
                    Numero: '',
                },
                TipoEntrega: 'EMAIL',
            },
        };

        const result = await client.ObterTokenAsync(args);

        return result[0];

    }

}

module.exports = TokenEletronico;
