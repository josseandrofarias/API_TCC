const path = require('path')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const { authSecret } = require(path.resolve(__dirname, '.env'))

module.exports = app => {
    const login = async  (req, res) => {
        if(!req.body.email || !req.body.senha) return res.status(400).send('Dados incompletos')

        const user = await app.db('pessoa')
            .where({email: req.body.email})
            .first()

        if(user){
            bcrypt.compare(req.body.senha, user.senha, (err, isMath) => {

                if(err || !isMath) return res.status(401).send()

                const payload = {id: user.id} //colocar dentro do token jwt para maior segurança
                res.json({
                    nome: user.nome,
                    email: user.email,
                    token: jwt.encode(payload, authSecret),
                })

            })
        }else{
            res.status(400).send('Usuário não cadastrado!')
        }
    }

    return { login }
}