module.exports = app => {
    // console.log(app)
    app.post('/cadastrar', app.src.controllers.Pessoa.save)
    app.post('/login', app.src.config.auth.login)
}