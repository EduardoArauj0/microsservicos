const db = require('./conexao');

class tabelas {
    init() {
        console.log('Criando tabelas no banco MySQL...');
        
        const clientes = 
        `CREATE TABLE IF NOT EXISTS clientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            telefone VARCHAR(15),
            endereco TEXT 
            )`;
        db.query(clientes, (err) => {
            if (err) console.error('Erro ao criar tabela clientes:', err.message);
        });

        const vendedores = 
        `CREATE TABLE IF NOT EXISTS vendedores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            telefone VARCHAR(15),
            data_contratacao DATE,
            salario DECIMAL(10, 2)
            )`;
        db.query(vendedores, (err) => {
            if (err) console.error('Erro ao criar tabela vendedores:', err.message);
        });

        const produtos = 
        `CREATE TABLE IF NOT EXISTS produtos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            estoque INT NOT NULL DEFAULT 0
            )`;
        db.query(produtos, (err) => {
            if (err) console.error('Erro ao criar tabela produtos:', err.message);
        });

        const pedidos = 
        `CREATE TABLE IF NOT EXISTS pedidos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            cliente_id INT NOT NULL,
            vendedor_id INT NOT NULL,
            valor_total DECIMAL(10, 2) NOT NULL,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id),
            FOREIGN KEY (vendedor_id) REFERENCES vendedores(id))`;
        db.query(pedidos, (err) => {
            if (err) console.error('Erro ao criar tabela pedidos:', err.message);
        });

        const itens_pedido = 
        ` CREATE TABLE IF NOT EXISTS itens_pedido (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pedido_id INT NOT NULL,
            produto_id INT NOT NULL,
            quantidade INT NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
            FOREIGN KEY (produto_id) REFERENCES produtos(id))`;
        db.query(itens_pedido, (err) => {
            if (err) console.error('Erro ao criar tabela itens_pedido:', err.message);
        });
        
        console.log('Tabelas criadas');
    }

    seed() {
        console.log('Populando banco de dados...');

        const clientes = 
        ` INSERT IGNORE INTO clientes (nome, email, telefone, endereco)
        VALUES 
        ('Eduardo', 'eduardo@gmail.com', '71987848518', 'Rua da Paciência, 42'),
        ('Tiago', 'tiago@gmail.com', '71984403622', 'Avenida Sete de Setembro, 211'),
        ('Tauan', 'tauan@gmail.com', '71981941258', 'Rua Carlos Gomes, 58'),
        ('Arley', 'arley@gmail.com', '71997136389', 'Rua das Pedras, 103'),
        ('Marcelo', 'marcelo@gmail.com', '71999951812', 'Rua de Boa Viagem, 17')
        ON DUPLICATE KEY UPDATE nome = VALUES(nome), email = VALUES(email), telefone = VALUES(telefone), endereco = VALUES(endereco);`;
        db.query(clientes, (err) => {
            if (err) {
                console.error('Erro ao inserir clientes iniciais:', err.message);
            } else {
                console.log('Clientes iniciais adicionados com sucesso.');
            }
        });

        const vendedores = 
        ` INSERT IGNORE INTO vendedores (nome, email, telefone, data_contratacao, salario)
        VALUES
        ('Adailton de Jesus', 'adailton@vendedor.com', '71912345678', '2024-01-01', 3000.00),
        ('Marivaldo Pereira', 'marivaldo@vendedor.com', '79981618829', '2024-01-01', 3000.00)
        ON DUPLICATE KEY UPDATE nome = VALUES(nome), email = VALUES(email), telefone = VALUES(telefone), data_contratacao = VALUES(data_contratacao), salario = VALUES(salario);`;
        db.query(vendedores, (err) => {
            if (err) {
                console.error('Erro ao inserir vendedores iniciais:', err.message);
            } else {
                console.log('Vendedores iniciais adicionados com sucesso.');
            }
        });

        const produtos = 
        ` INSERT IGNORE INTO produtos (nome, preco, estoque)
        VALUES
        ('Notebook Ultra Slim VX15', 4599.90, 15),
        ('Smartphone ProMax X5', 3299.90, 30),
        ('Fone de Ouvido Wireless SoundBeat 300', 249.90, 50),
        ('Monitor LED Full HD 27" UltraView', 1199.90, 25),
        ('Teclado Mecânico Gamer ThunderKey RGB', 499.90, 40),
        ('Mouse Sem Fio Ergonomix Pro', 149.90, 70),
        ('Smartwatch FitLife X20', 899.90, 35),
        ('Caixa de Som Bluetooth MegaSound Go', 349.90, 60),
        ('HD Externo Portátil 2TB DataVault', 599.90, 20),
        ('Carregador Rápido Multiport USB TurboCharge 50W', 129.90, 100)
        ON DUPLICATE KEY UPDATE preco = VALUES(preco), estoque = VALUES(estoque);`;
        db.query(produtos, (err) => {
            if (err) {
                console.error('Erro ao inserir produtos iniciais:', err.message);
            } else {
                console.log('Produtos iniciais adicionados com sucesso.');
            }
        });
    }
}
module.exports = new tabelas();