<h1 align="center" style="font-weight: bold;">API de Gestão de Vendas, Clientes e Estoque 💻</h1>

<p align="center">
 <a href="#technologies">Tecnologias</a> • 
 <a href="#started">Começando</a> • 
  <a href="#routes">Endpoints da API</a> •
 <a href="#colab">Colaborador</a> •
</p>

<p align="center">
    <b>API desenvolvida para gerenciar operações de vendas, clientes, produtos, pedidos e vendedores, utilizando arquitetura de microsserviços em Node.js com Express.</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- Node.js
- Express.js
- MySQL
- Docker

<!--
<h2 id="started">🚀 Começando</h2>

Aqui você pode descrever como rodar seu projeto localmente.
-->

<h3>Pré-requisitos</h3>

Aqui estão os pré-requisitos necessários para rodar o projeto:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

<h3>Clonando o repositório</h3>

Para clonar o projeto, execute:

```bash
git clone https://github.com/EduardoArauj0/microsservicos
```

<h3>Configurando as variáveis .env</h3>

Crie seu arquivo .env com as configurações necessárias, como informações de conexão com o banco de dados, seguindo o modelo do arquivo .env.example:

```yaml
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabasename
```
<!--
<h3>Iniciando o projeto</h3>
Para rodar o projeto, siga as instruções:

```bash
cd microsservicos
npm install
npm start
```
-->

<h2 id="routes">📍 Endpoints da API</h2>

| rotas               | descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /clientes</kbd> |	Lista todos os clientes.
| <kbd>POST /clientes</kbd>	| Cria um novo cliente.
| <kbd>PUT /clientes/:id</kbd> | 	Atualiza os dados de um cliente pelo ID.
| <kbd>DELETE /clientes/:id</kbd> |	Remove um cliente pelo ID.
| <kbd>GET /estoque</kbd>	| Lista todos os produtos em estoque.
| <kbd>POST /estoque</kbd>	| Adiciona um novo produto ao estoque.
| <kbd>PUT /estoque/:id</kbd>	| Atualiza um produto pelo ID.
| <kbd>DELETE /estoque/:id</kbd>	| Remove um produto pelo ID.
| <kbd>GET /pedidos</kbd>	| Lista todos os pedidos.
| <kbd>POST /pedidos</kbd>	| Cria um novo pedido.
| <kbd>PUT /pedidos/:id</kbd>	| Atualiza um pedido pelo ID.
| <kbd>DELETE /pedidos/:id</kbd>	| Remove um pedido pelo ID.
| <kbd>GET /vendedores</kbd>	| Lista todos os vendedores.
| <kbd>POST /vendedores</kbd>	| Adiciona um novo vendedor.
| <kbd>PUT /vendedores/:id</kbd>	| Atualiza os dados de um vendedor pelo ID.
| <kbd>DELETE /vendedores/:id</kbd>	| Remove um vendedor pelo ID.
<h3 id="get-client-detail">GET /clientes</h3>

**RESPOSTA**
```json
[
  {
    "id": 1,
    "nome": "Joana Silva",
    "email": "joana.silva@example.com",
    "telefone": "123456789"
  },
  {
    "id": 2,
    "nome": "Carlos Souza",
    "email": "carlos.souza@example.com",
    "telefone": "987654321"
  }
]
```
<h3 id="post-client-detail">POST /clientes</h3>

**REQUISIÇÃO**
```json
{
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@example.com",
  "telefone": "1122334455"
}
```
**RESPOSTA**
```json
{
  "id": 3,
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@example.com",
  "telefone": "1122334455"
}
```
<h3 id="post-order-detail">POST /pedidos</h3>

**REQUISIÇÃO**
```json
{
  "cliente_id": 1,
  "vendedor_id": 2,
  "produtos": [
    {
      "produto_id": 1,
      "quantidade": 2
    }
  ]
}
```
**RESPOSTA**
```json
{
  "id": 5,
  "status": "Em processamento",
  "total": 200.00
}
```
<h2 id="colab">👥 Colaborador</h2>
Eduardo Araujo - Desenvolvimento da API
