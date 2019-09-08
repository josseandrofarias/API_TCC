const moment = require('moment')

module.exports = app => {
    const getempresa = (req, res) => {
        app.db('empresa')
            .innerJoin('pessoa', 'pessoa.id', 'empresa.id_pessoa')
            .innerJoin('setor', 'setor.id', 'empresa.id_setor')
            .where({id: req.params.id})
            .then(empresa => res.json(empresa))
            .catch(err => rest.status(500).json(err))
    }

    const getempresas = (req, res) => {
        app.db('empresa')
            .innerJoin('empresa', 'empresa.id', 'empresa.id_empresa')
            .where({status: true})
            .orderBy('empresa.nome')
            .then(empresa => res.json(empresa))
            .catch(err => rest.status(500).json(err))
    }

    const save = (req, res) => {
        if(!req.body.nome.trim()) return res.status(400).send('Nome é um campo obrigatório!')

        app.db('empresa')
            .insert(req.body)
            .then(_ => res.status(204).send('empresa Cadastrada!'))
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('empresa')
            .where({id: req.params.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) res.status(204).send()
                else{
                    const msg = `Não foi encontrado empresa com id ${req.params.id}!`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, obj = null) => {
        if(obj == null) obj = req.params

        app.db('empresa')
            .where({id: req.params.id})
            .update(obj)
            .then(_ => res.status(204).send('Dados Atualizados!'))
            .catch(err => res.status(400).json(err))
    }

    const ativaInativa = (req, res) => {
        app.db('empresa')
            .where({id: req.params.id})
            .first()
            .then(empresa => {
                if(!empresa){
                    const msg = `empresa com id ${req.params.id} não encontrado!`
                    res.status(400).send(msg)
                }
                const status = empresa.status != req.params.status ?  req.params.status : null
                if(status != null)
                    update(req, res, {status: req.params.status})
                else
                    res.status(204).send('Valor Atualizado!')
            })
            .catch(err => res.status(400).json(err))
    }

    return {
        getempresa,
        getempresas,
        save,
        remove,
        update,
        ativaInativa
    }

}
