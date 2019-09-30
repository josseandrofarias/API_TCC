module.exports = app => {
    const getParecer = (req, res) => {
        app.db('parecer')
            .innerJoin('pedido', 'pedido.id', 'parecer.id_pedido')
            .where({id: req.params.id})
            .then(parecer => res.json(parecer))
            .catch(err => rest.status(500).json(err))
    }

    const getParecerPedido = (req, res) => {
        app.db('parecer')
            .innerJoin('pedido', 'pedido.id', 'parecer.id_pedido')
            .where({id_pedido: req.params.id_pedido})
            .orderBy('data_hora', 'asc')
            .then(parecer => res.json(parecer))
            .catch(err => rest.status(500).json(err))
    }

    const save = (req, res) => {
        // if(!req.body.id_pedido) return res.status(400).send('id_pedido é um campo obrigatório!')

        // req.body.id_pedido = idPedido

        app.db('parecer')
            .insert(req.body)
            .then(_ => res.status(204).send('parecer Cadastrada!'))
            .catch(err => res.status(400).json(err))
    }

    return {
        getParecer,
        getParecerPedido,
        save,
    }

}
