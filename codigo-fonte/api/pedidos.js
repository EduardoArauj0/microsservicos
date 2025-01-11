const express = require('express');
const db = require('./conexao');

const router = express.Router();

router.post('/pedidos', (req, res) => {
    const { cliente_id, vendedor_id, valor_total } = req.body;
    if (!cliente_id || !vendedor_id || !valor_total) {
        return res.status(400).json({ message: 'Id do cliente, Id do vendedor e valor total são obrigatórios' });
    }
    if (valor_total <= 0) {
        return res.status(400).json({ message: 'O valor total deve ser maior que zero' });
    }
    const query = 'INSERT INTO pedidos(cliente_id, vendedor_id, valor_total) VALUES (?, ?, ?)';
    db.query(query, [cliente_id, vendedor_id, valor_total], (err, result) => {
        if (err) {
            console.error('Erro ao inserir os dados', err);
            return res.status(500).json({ message: 'Erro ao inserir os dados' });
        }
        res.status(201).json({ message: 'Pedido criado com sucesso', pedidoId: result.insertId });
    });
});

router.delete('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM pedidos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao cancelar o pedido', err);
            return res.status(500).json({ message: 'Erro ao cancelar o pedido' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.json({ message: 'Pedido cancelado com sucesso' });
    });
});

router.put('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    const { cliente_id, vendedor_id, valor_total } = req.body;
    if (!cliente_id || !vendedor_id || !valor_total) {
        return res.status(400).json({ message: 'Id do cliente, Id do vendedor e valor total são obrigatórios' });
    }
    if (valor_total <= 0) {
        return res.status(400).json({ message: 'O valor total deve ser maior que zero' });
    }
    const query = 'UPDATE pedidos SET cliente_id = ?, vendedor_id = ?, valor_total = ? WHERE id = ?';
    db.query(query, [cliente_id, vendedor_id, valor_total, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar os dados', err);
            return res.status(500).json({ message: 'Erro ao atualizar os dados' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.json({ message: 'Pedido atualizado com sucesso' });
    });
});

router.get('/pedidos', (req, res) => {
    const query = 'SELECT * FROM pedidos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar os pedidos', err);
            return res.status(500).json({ message: 'Erro ao recuperar os pedidos' });
        }
        res.json(results);
    });
});

router.post('/itens_pedido', (req, res) => {
    const { pedido_id, produtos } = req.body;
    if (!pedido_id || !produtos || produtos.length === 0) {
        return res.status(400).json({ message: 'Pedido ID e a lista de produtos são obrigatórios' });
    }
    let queryItensPedido = 'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco) VALUES ?';
    let itens = produtos.map(produto => [pedido_id,produto.id,produto.quantidade,produto.preco]);

    db.query(queryItensPedido, [itens], (err, result) => {
        if (err) {
            console.error('Erro ao inserir itens do pedido', err);
            return res.status(500).json({ message: 'Erro ao adicionar itens ao pedido' });
        }
        produtos.forEach(produto => {
            const queryEstoque = 'UPDATE produtos SET estoque = estoque - ? WHERE id = ?';
            db.query(queryEstoque, [produto.quantidade, produto.id], (err) => {
                if (err) {
                    console.error('Erro ao atualizar estoque', err);
                }
            });
        });
        res.status(201).json({ message: 'Itens do pedido adicionados com sucesso', itens_pedido: result.affectedRows });
    });
});

module.exports = router;
