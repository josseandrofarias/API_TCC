const moment = require('moment')

module.exports = app => {
    const getPedido = (req, res) => {
        app.db('pedido')
            .innerJoin('pessoa', 'pessoa.id', 'pedido.id_pessoa')
            .innerJoin('setor', 'setor.id', 'pedido.id_setor')
            .leftJoin('imagem', 'imagem.id_pedido', 'pedido.id')
            .where({id: req.params.id})
            .then(pedido => res.json(pedido))
            .catch(err => res.status(500).json(err))
    }

    const getPedidoPessoa = (req, res) => {
        console.log(req.params)
        app.db('pedido')
            .innerJoin('pessoa', 'pessoa.id', 'pedido.id_pessoa')
            .innerJoin('setor', 'setor.id', 'pedido.id_setor')
            .leftJoin('imagem', 'imagem.id_pedido', 'pedido.id')
            .where({id_pessoa: req.params.id_pessoa})
            .then(pedido => res.json(pedido))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
          app.db('pedido')
            .insert(req.body)
            .then(_ => res.status(204).send('pedido Cadastrada!'))
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('pedido')
            .where({id: req.params.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) res.status(204).send()
                else{
                    const msg = `Não foi encontrado pedido com id ${req.params.id}!`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, obj = null) => {
        if(obj == null) obj = req.params

        app.db('pedido')
            .where({id: req.params.id})
            .update(obj)
            .then(_ => res.status(204).send('Dados Atualizados!'))
            .catch(err => res.status(400).json(err))
    }


    return {
        getPedido,
        getPedidoPessoa,
        save,
        remove,
        update
    }

}
