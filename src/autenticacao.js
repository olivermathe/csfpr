import Soap from 'soap';

import Conf from './conf';

export default class Autenticacao {

    /**
     * @param {Object} opts
     * @param {string} opts.host
     * @param {string} opts.path
     * @param {string} opts.senha
     * @param {string} opts.usuario
     * @param {number} opts.codigoHierarquia
     * @param {string} opts.canalSolicitacao
     * @param {number} opts.chaveSolicitacao
     */
    constructor(opts) {

        this.host = opts.host;
        this.path = opts.path || '/Carrefour.Servico.Autenticacao/Autenticacao.svc';
        this.senha = opts.senha;
        this.usuario = opts.usuario;
        this.codigoHierarquia = opts.codigoHierarquia;
        this.canalSolicitacao = opts.canalSolicitacao;
        this.chaveSolicitacao = opts.chaveSolicitacao;

        this.client = null;
        this.tokenPlataformaRelacionamento = null;

    }

    async getClient() {

        const { host, path } = this;

        const wsdl = `http://${host + path}?wsdl`;

        if (!this.client)
            this.client = await Soap.createClientAsync(wsdl, Conf);

        return this.client;

    }

    /**
     * @param {string} senha
     * @param {string} usuario
     * @returns {object}
     */
    async autenticarConsumidor(senha, usuario) {

        const client = await this.getClient();

        const args = {
            solicitacao: {
                CanalSolicitacao: this.canalSolicitacao,
                ChaveSolicitacao: this.chaveSolicitacao,
                CodigoHierarquia: this.codigoHierarquia,
                Senha: senha,
                Usuario: usuario,
            },
        };

        const result = await client.AutenticarConsumidorAsync(args);

        return result[0];

    }

    /**
     * @returns {string}
     */
    async getTokenPlataformaRelacionamento() {

        if (!this.tokenPlataformaRelacionamento) {

            const result = await this.autenticarConsumidor(this.senha, this.usuario);
            this.tokenPlataformaRelacionamento = result.AutenticarConsumidorResult.Token;

        }

        return this.tokenPlataformaRelacionamento;

    }

}
