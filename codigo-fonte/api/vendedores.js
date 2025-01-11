const express = require('express');
const db = require('./conexao');

const router = express.Router();

router.post('/vendedores',(req, res)=>{
    const {nome,email,telefone,data_contratacao,salario}=req.body;
    if(!nome || !email || !telefone || !data_contratacao || !salario){
        return res.status(400).json({message:'Nome, email, telefone, data de contratação e salario são obrigatórios'});
    }
    if (salario <= 0) {
        return res.status(400).json({ 
            message: 'O salário deve ser um valor positivo' 
        });
    }
    const query= 'INSERT INTO vendedores(nome, email, telefone, data_contratacao, salario)VALUES(?,?,?,?,?) ';
    db.query(query,[nome,email,telefone,data_contratacao,salario],(err, result)=>{
        if(err){
            console.error('Erro ao inserir os Dados', err);
            return res.status(500).json({message:'Erro ao inserir os Dados'});
        }
        res.status(201).json({message:'Vendedor inserido com Sucesso', userId:result.insertId});
    });
});

router.delete('/vendedores/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM vendedores WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir vendedor', err);
            return res.status(500).json({ message: 'Erro ao excluir vendedor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vendedor não encontrado' });
        }
        res.json({ message: 'Vendedor excluido com sucesso' });
    });
});

router.get('/vendedores', (req, res) => {
    const query = 'SELECT * FROM vendedores';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar os vendedores', err);
            return res.status(500).json({ message: 'Erro ao recuperar os vendedores' });
        }
        res.json(results);
    });
});

router.put('/vendedores/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, data_contratacao, salario } = req.body;
    if (!nome || !email || !telefone || !data_contratacao || !salario) {
        return res.status(400).json({ message: 'Nome, email, telefone, data de contratação e salario são obrigatórios' });
    }
    if (salario <= 0) {
        return res.status(400).json({ 
            message: 'O salário deve ser um valor positivo' 
        });
    }
    const query = 'UPDATE vendedores SET nome = ?, email = ?, telefone = ?, data_contratacao = ?, salario = ? WHERE id = ?';
    db.query(query, [nome, email, telefone, data_contratacao, salario, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar os Dados', err);
            return res.status(500).json({ message: 'Erro ao atualizar os dados' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vendedor não encontrado' });
        }
        res.json({ message: 'Vendedor atualizado com sucesso' });
    });
});

module.exports = router;