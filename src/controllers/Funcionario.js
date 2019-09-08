module.exports = app => {
    const getFuncionario = (req, res) => {
        app.db('funcionario')
            .innerJoin('pessoa', 'pessoa.id', 'funcionario.id_pessoa')
            .innerJoin('setor', 'setor.id', 'funcionario.id_setor')
            .where({id: req.params.id, status: true})
            .then(funcionario => res.json(funcionario))
            .catch(err => rest.status(500).json(err))
    }

    const getFuncionarios = (req, res) => {
        app.db('funcionario')
            .innerJoin('pessoa', 'pessoa.id', 'funcionario.id_pessoa')
            .innerJoin('setor', 'setor.id', 'funcionario.id_setor')
            .where({status: true})
            .orderBy('nome')
            .then(funcionario => res.json(funcionario))
            .catch(err => rest.status(500).json(err))
    }

    const save = (req, res) => {
        if(!req.body.nome.trim()) return res.status(400).send('Nome é um campo obrigatório!')
        if(!req.body.id_setor) return res.status(400).send('Setor é um campo obrigatório!')

        app.src.controllers.Pessoa.save.then(_ => {
            app.db('funcionario')
                .insert(req.body)
                .then(_ => res.status(204).send('Funcionario Cadastrada!'))
                .catch(err => res.status(400).json(err))
        })

    }

    const remove = (req, res) => {
        app.db('funcionario')
            .where({id: req.params.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) res.status(204).send()
                else{
                    const msg = `Não foi encontrado funcionario com id ${req.params.id}!`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, obj = null) => {
        if(obj == null) obj = req.params

        app.db('funcionario')
            .where({id: req.params.id})
            .update(obj)
            .then(_ => res.status(204).send('Dados Atualizados!'))
            .catch(err => res.status(400).json(err))
    }

    const ativaInativa = (req, res) => {
        app.db('funcionario')
            .where({id: req.params.id})
            .first()
            .then(funcionario => {
                if(!funcionario){
                    const msg = `Funcionario com id ${req.params.id} não encontrado!`
                    res.status(400).send(msg)
                }
                const status = funcionario.status != req.params.status ?  req.params.status : null
                if(status != null)
                    update(req, res, {status: req.params.status})
                else
                    res.status(204).send('Valor Atualizado!')
            })
            .catch(err => res.status(400).json(err))
    }

    return {
        getFuncionario,
        getFuncionarios,
        save,
        remove,
        update,
        ativaInativa
    }

}
