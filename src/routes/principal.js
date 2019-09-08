module.exports = app => {
    console.log(app)
    app.post('/signup', app.src.controllers.Pessoa.save)
    app.post('/signin', app.src.config.auth.signin)
}