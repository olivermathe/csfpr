import Autenticacao from './src/autenticacao';

export default class Csfpr {

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

        this.autenticacao = new Autenticacao(opts);

    }

}
