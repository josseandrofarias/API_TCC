module.exports = app => {
    const getSetor = (req, res) => {
        app.db('setor')
            .innerJoin('empresa', 'empresa.id', 'setor.id_empresa')
            .where({id: req.params.id, status: true})
            .then(setor => res.json(setor))
            .catch(err => res.status(500).json(err))
    }

    const getSetors = (req, res) => {
        app.db('setor')
            .innerJoin('empresa', 'empresa.id', 'setor.id_empresa')
            .where({status: true})
            .orderBy('nome' )
            .then(setor => res.json(setor))
            .catch(err => res.status(500).json(err))
    }

    const getSetores = (req, res) => {
        app.db('setor')
            .where({status: true})
            .orderBy('nome' )
            .then(setor => res.json(setor))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        if(!req.body.nome.trim()) return res.status(400).send('Nome é um campo obrigatório!')

        app.db('setor')
            .insert(req.body)
            .then(_ => res.status(204).send('Setor Cadastrada!'))
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('setor')
            .where({id: req.params.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) res.status(204).send()
                else{
                    const msg = `Não foi encontrado setor com id ${req.params.id}!`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, obj = null) => {
        if(obj == null) obj = req.params

        app.db('setor')
            .where({id: req.params.id})
            .update(obj)
            .then(_ => res.status(204).send('Dados Atualizados!'))
            .catch(err => res.status(400).json(err))
    }

    const ativaInativa = (req, res) => {
        app.db('setor')
            .where({id: req.params.id})
            .first()
            .then(setor => {
                if(!setor){
                    const msg = `Setor com id ${req.params.id} não encontrado!`
                    res.status(400).send(msg)
                }
                const status = setor.status != req.params.status ?  req.params.status : null
                if(status != null)
                    update(req, res, {status: req.params.status})
                else
                    res.status(204).send('Valor Atualizado!')
            })
            .catch(err => res.status(400).json(err))
    }

    return {
        getSetor,
        getSetors,
        getSetores,
        save,
        remove,
        update,
        ativaInativa
    }

}
