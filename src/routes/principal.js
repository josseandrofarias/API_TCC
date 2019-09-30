const path = require('path')
const storage = require(path.resolve( 'src', 'config', 'multer'))
const upload = require('multer')(storage)


module.exports = app => {
    // console.log(app)
    app.post('/cadastrar', upload.single('avatar'), app.src.controllers.Pessoa.save)
    app.post('/atualizaCadastro', upload.single('avatar'), app.src.controllers.Pessoa.update)
    app.post('/login', app.src.controllers.auth.login)

    app.post('/pedido', app.src.controllers.Pedido.save)
    app.get('/pedidos/:id_pessoa', app.src.controllers.Pedido.getPedidoPessoa)
    app.get('/setores', app.src.controllers.Setor.getSetores)

    // app.route('/empresa')
    //     .all(app.src.config.passport.authenticate())
    //     .get(app.src.controllers.Empresa.getEmpresas)
    //     .post(app.src.controllers.Empresa.save)
    //
    // app.route('/empresa/:id') //:id é um parametro
    //     .all(app.src.config.passport.authenticate())
    //     .get(app.src.controllers.Empresa.getEmpresa)
    //     .delete(app.src.controllers.Empresa.remove)
    //
    // app.route('/empresa/:id/update') //:id é um parametro
    //     .all(app.src.config.passport.authenticate())
    //     .put(app.src.controllers.Empresa.update)
}
