const express = require('express');
const db = require('./conexao');

const router = express.Router();

router.post('/clientes',(req, res)=>{
    const {nome,email,telefone,endereco} =req.body;
    if(!nome || !email || !telefone || !endereco){
        return res.status(400).json({message:'Nome, email, telefone e endereço são obrigatórios'});
    }
    const query= 'INSERT INTO clientes(nome, email, telefone, endereco)VALUES(?,?,?,?) ';
    db.query(query,[nome,email,telefone,endereco],(err, result)=>{
        if(err){
            console.error('Erro ao inserir os Dados', err);
            return res.status(500).json({message:'Erro ao inserir os Dados'});
        }
        res.status(201).json({message:'Cliente inserido com Sucesso', userId:result.insertId});
    });
});

router.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clientes WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir cliente', err);
            return res.status(500).json({ message: 'Erro ao excluir cliente' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente excluido com sucesso' });
    });
});

router.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar os clientes', err);
            return res.status(500).json({ message: 'Erro ao recuperar os clientes' });
        }
        res.json(results);
    });
});

router.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;
    if (!nome || !email || !telefone || !endereco) {
        return res.status(400).json({ message: 'Nome, email, telefone e endereço são obrigatórios' });
    }
    const query = 'UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?';
    db.query(query, [nome, email, telefone, endereco, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar cliente', err);
            return res.status(500).json({ message: 'Erro ao atualizar cliente' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente atualizado com sucesso' });
    });
});


module.exports = router;