const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'relatorios_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao Banco de Dados:', err);
    }
    console.log('Conectado ao Banco de Dados (relatórios) com sucesso');
});

const app = express();

app.get('/relatorio/produtos-mais-vendidos', (req, res) => {
    const query =  
    ` SELECT p.nome AS produto, 
        SUM(iv.quantidade) AS total_vendido
        FROM itens_pedido iv
        JOIN produtos p ON iv.produto_id = p.id
        GROUP BY iv.produto_id
        ORDER BY total_vendido DESC
        LIMIT 10;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao gerar relatório de produtos mais vendidos:', err);
            return res.status(500).json({ message: 'Erro ao gerar relatório' });
        }
        res.json(results);
    });
});

app.get('/relatorio/produtos-por-cliente', (req, res) => {
    const query = 
    ` SELECT c.nome AS cliente, p.nome AS produto, 
        SUM(iv.quantidade) AS total_consumido
        FROM pedidos pd
        JOIN clientes c ON pd.cliente_id = c.id
        JOIN itens_pedido iv ON iv.pedido_id = pd.id
        JOIN produtos p ON iv.produto_id = p.id
        GROUP BY c.id, p.id
        ORDER BY c.nome, total_consumido DESC;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao gerar relatório de produtos por cliente:', err);
            return res.status(500).json({ message: 'Erro ao gerar relatório' });
        }
        res.json(results);
    });
});

app.get('/relatorio/consumo-medio', (req, res) => {
    const query = 
    ` SELECT c.nome AS cliente, 
        AVG(pd.valor_total) AS consumo_medio
        FROM pedidos pd
        JOIN clientes c ON pd.cliente_id = c.id
        GROUP BY c.id
        ORDER BY consumo_medio DESC;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao gerar relatório de consumo médio:', err);
            return res.status(500).json({ message: 'Erro ao gerar relatório' });
        }
        res.json(results);
    });
});

app.get('/relatorio/baixo-estoque', (req, res) => {
    const query = 
    ` SELECT nome AS produto, estoque
        FROM produtos
        WHERE estoque < 10
        ORDER BY estoque ASC;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao gerar relatório de baixo estoque:', err);
            return res.status(500).json({ message: 'Erro ao gerar relatório' });
        }
        if (results.length === 0) {
            return res.status(200).json({ message: 'Nenhum item com baixo estoque encontrado.' });
        }
        res.json(results);
    });
});

const PORT = process.env.SALES_REPORTS_PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serviço de Relatórios rodando na porta ${PORT}`);
});
