const express = require('express');
const bodyParser = require('body-parser');
const tabelas = require('./tabelas');
const clientesRoutes = require('./clientes');
const vendedoresRoutes = require('./vendedores');
const estoqueRoutes = require('./estoque');
const pedidosRoutes = require('./pedidos');

const app = express();

if (process.env.RUN_SEED === 'true') {
    tabelas.init();
    tabelas.seed();
}

app.use(bodyParser.json());
app.use('/clientes', clientesRoutes);
app.use('/vendedores', vendedoresRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/pedidos', pedidosRoutes);


const PORT = process.env.NODE_LOCAL_PORT || 3000;;
app.listen(PORT, ()=> {
    console.log(`Servidor Rodando na PORTA ${PORT}/`);
});