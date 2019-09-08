module.exports = app => {
    const getImagem = (req, res) => {
        app.db('imagem')
            .innerJoin('pedido', 'pedido.id', 'imagem.id_pedido')
            .where({id: req.params.id})
            .then(imagem => res.json(imagem))
            .catch(err => rest.status(500).json(err))
    }

    const save = (req, res, idPedido) => {
        if(!req.body.caminho) return res.status(400).send('Caminho é um campo obrigatório!')
        // if(!req.body.id_pessoa) return res.status(400).send('id_pessoa é um campo obrigatório!')

        req.body.id_pedido = idPedido

        app.db('imagem')
            .insert(req.body)
            .then(_ => res.status(204).send('imagem Cadastrada!'))
            .catch(err => res.status(400).json(err))

    }

    const remove = (req, res) => {
        app.db('imagem')
            .where({id: req.params.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) res.status(204).send()
                else{
                    const msg = `Não foi encontrada imagem com id ${req.params.id}!`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('imagem')
            .where({id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send('Dados Atualizados!'))
            .catch(err => res.status(400).json(err))
    }

    return {
        getImagem,
        save,
        remove,
        update,
    }

}
