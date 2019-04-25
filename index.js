const Autenticacao = require('./src/autenticacao');
const TokenEletronico = require('./src/tokenEletronico');

class Csfpr {

    /**
     * @param {Object} opts
     * @param {string} opts.host
     * @param {string} [opts.path]
     * @param {string} opts.senha
     * @param {string} opts.usuario
     * @param {number} opts.codigoHierarquia
     * @param {string} opts.canalSolicitacao
     * @param {number} opts.chaveSolicitacao
     * @param {string} opts.codigoTransacaoNegocio
     * @returns {Csfpr}
     */
    constructor(opts) {

        this.autenticacao = new Autenticacao(opts);

        this.tokenEletronico = new TokenEletronico({ ...opts, autenticacao: this.autenticacao });

    }

}

module.exports = Csfpr;
