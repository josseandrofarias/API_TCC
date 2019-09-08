module.exports = app => {
    const getAcessoPessoa = (req, res) => {
        app.db('acesso')
            .innerJoin('pessoa', 'pessoa.id', 'acesso.id_pessoa')
            .where({id: req.params.id})
            .then(acesso => res.json(acesso))
            .catch(err => rest.status(500).json(err))
    }

    const getAcessoFuncionario = (req, res) => {
        app.db('acesso')
            .innerJoin('funcionario', 'funcionario.id', 'acesso.id_funcionario')
            .innerJoin('setor', 'setor.id', 'acesso.id_setor')
            .where({id: req.params.id})
            .then(acesso => res.json(acesso))
            .catch(err => rest.status(500).json(err))
    }

    const save = (req, res) => {
        if(!req.body.id_funcioanrio.trim()) return res.status(400).send('id_funcionario é um campo obrigatório!')
        if(!req.body.id_pessoa) return res.status(400).send('id_pessoa é um campo obrigatório!')
        if(!req.body.ip) return res.status(400).send('ip é um campo obrigatório!')

        app.src.controllers.Pessoa.save.then(_ => {
            app.db('acesso')
                .insert(req.body)
                .then(_ => res.status(204).send('Acesso Cadastrado!'))
                .catch(err => res.status(400).json(err))
        })

    }

    return {
        getAcessoPessoa,
        getAcessoFuncionario,
        save,
    }

}
