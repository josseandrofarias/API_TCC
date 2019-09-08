module.exports = app => {
    const getAvaliacao = (req, res) => {
        app.db('avaliacao')
            .innerJoin('pedido', 'pedido.id', 'avaliacao.id_pedido')
            .where({id: req.params.id})
            .then(avaliacao => res.json(avaliacao))
            .catch(err => rest.status(500).json(err))
    }

    const getAvaliacaos = (req, res) => {
        app.db('avaliacao')
            .innerJoin('pedido', 'pedido.id', 'avaliacao.id_pedido')
            .then(avaliacao => res.json(avaliacao))
            .catch(err => rest.status(500).json(err))
    }

    const save = (req, res) => {
        if(!req.body.avaliacao) return res.status(400).send('Avaliação é um campo obrigatório!')
        // if(!req.body.id_pessoa) return res.status(400).send('id_pessoa é um campo obrigatório!')

        // req.body.id_pedido = idPedido

        app.db('avaliacao')
            .insert(req.body)
            .then(_ => res.status(204).send('avaliacao Cadastrada!'))
            .catch(err => res.status(400).json(err))
    }

    return {
        getAvaliacao,
        getAvaliacaos,
        save,
    }

}
