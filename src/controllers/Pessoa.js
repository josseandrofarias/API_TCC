const bcrypt = require('bcrypt-nodejs')  // gera um hash diferente cada vez mesmo sendo o mesmo valor, ele consegue recomnhecer que são iguais

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }
    console.log('teste pessoa')
    const save = (req, res) => { //metodo meddleware
        console.log('teste save')

        obterHash(req.body.senha, hash => {
            const password = hash
            let body = req.body
            console.log(body)
            app.db('pessoa')
                .insert({
                    nome: body.nome,
                    email: body.email,
                    cpf: body.cpf,
                    data_nascimento: body.data_nascimento,
                    status: body.status,
                    senha: password
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    return { save }
}