module.exports = app => {
    app.post('/signup', app.src.controllers.Pessoa.save)
}