const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'api' 
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados (relatórios):', err);
    }
    console.log('Conectado ao banco de dados (relatórios) com sucesso');
});

module.exports = db;
