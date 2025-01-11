const express = require('express');
const db = require('./conexao');

const router = express.Router();

router.post('/produtos',(req, res)=>{
    const {nome,preco,estoque}=req.body;
    if(!nome || preco === undefined || estoque === undefined){
        return res.status(400).json({message:'Nome do produto, preço e estoque são obrigatórios'});
    }
    if (preco <= 0) {
        return res.status(400).json({ message: 'O preço deve ser um valor positivo' });
    }
    if (estoque < 0) {
        return res.status(400).json({ message: 'O estoque não pode ser negativo' });
    }
    const query= 'INSERT INTO produtos(nome, preco, estoque)VALUES(?,?,?) ';
    db.query(query,[nome,preco,estoque],(err, result)=>{
        if(err){
            console.error('Erro ao inserir os Dados', err);
            return res.status(500).json({message:'Erro ao inserir os Dados'});
        }
        res.status(201).json({message:'Produto inserido com Sucesso', productId:result.insertId});
    });
});

router.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { estoque } = req.body;
    if (estoque === undefined || estoque < 0) {
        return res.status(400).json({ message: 'Estoque inválido' });
    }
    const query = 'UPDATE produtos SET estoque = ? WHERE id = ?';
    db.query(query, [estoque, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o estoque', err);
            return res.status(500).json({ message: 'Erro ao atualizar o estoque' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Estoque atualizado com sucesso' });
    });
});

router.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os produtos', err);
            return res.status(500).json({ message: 'Erro ao buscar os produtos' });
        }
        res.json(results);
    });
});

router.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao cancelar o produto', err);
            return res.status(500).json({ message: 'Erro ao cancelar o produto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto excluido com sucesso' });
    });
});

module.exports = router;
