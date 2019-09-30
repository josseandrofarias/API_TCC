module.exports = app => {
    const getTelefone = (req, res) => {
        app.db('telefone')
            .innerJoin('pessoa', 'pessoa.id', 'telefone.id_pessoa')
            .where({id: req.params.id})
            .then(telefone => res.json(telefone))
            .catch(err => rest.status(500).json(err))
    }

    const save = (req, res, idPessoa) => {
        if(!req.body.numero) return res.status(400).send('Número é um campo obrigatório!')
        // if(!req.body.id_pessoa) return res.status(400).send('id_pessoa é um campo obrigatório!')

        req.body.id_pessoa = idPessoa

        app.db('telefone')
            .insert(req.body)
            .then(_ => res.status(204).send('telefone Cadastrada!'))
            .catch(err => res.status(400).json(err))

    }

    const remove = (req, res) => {
        app.db('telefone')
            .where({id: req.params.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) res.status(204).send()
                else{
                    const msg = `Não foi encontrado telefone com id ${req.params.id}!`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('telefone')
            .where({id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send('Dados Atualizados!'))
            .catch(err => res.status(400).json(err))
    }

    return {
        getTelefone,
        save,
        remove,
        update,
    }

}
