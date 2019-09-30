const path = require('path')
const { authSecret } = require(path.resolve( 'src', 'config', '.env'))
const passport = require('passport')
const passportjwt = require('passport-jwt')
const { Strategy, ExtractJwt} = passportjwt // ler header da solicitação e pegar o token

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('pessoa')
            .where({id: payload.id})
            .first()
            .then(user => user ? done(null, {id: user.id, email: user.email})
                : done(null, false)
            )
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    //necessário para inicializar
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false }) //qual estratégia usar
    }
}