const mysql = require('mysql2/promise');

const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '123456',
    database :'sean_db'
})

const conectando = async() =>{
    try {
        const connection = await conn
   
        await connection.query(`CREATE TABLE usuarios (
            id_usuario INT(11) NOT NULL AUTO_INCREMENT,
            usuario VARCHAR(20) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
            senha VARCHAR(20) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
            master CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Definição se o usuário é master. Utilize \'S\' para Sim e \'N\' para não' COLLATE 'utf8mb4_general_ci',
            status INT(11) NOT NULL DEFAULT '0' COMMENT 'Status do registro',
            criado DATE NOT NULL,
            modificado DATE NOT NULL,
            PRIMARY KEY (id_usuario) USING BTREE,
            INDEX FKStatus (status) USING BTREE,
            CONSTRAINT FKStatus FOREIGN KEY (status) REFERENCES sean_db.status (id_status) ON UPDATE CASCADE ON DELETE CASCADE
        )
        COMMENT='Tabela de usuarios. Controla usarios que podem acessar o sistema. '
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;`)
      
            await connection.query(`
            CREATE TABLE categorias (
                id_categorias INT NOT NULL AUTO_INCREMENT,
                categorias VARCHAR(50) NOT NULL DEFAULT '0',
                status INT NOT NULL DEFAULT '0',
                tipo SET('Estoque', 'Geral', 'Pessoa') NOT NULL DEFAULT 'Estoque',
                criado DATE NOT NULL,
                modificado DATE NOT NULL,
                PRIMARY KEY (id_categorias),
                CONSTRAINT FKcategorias_status FOREIGN KEY (status) REFERENCES status (id_status) ON UPDATE NO ACTION ON DELETE NO ACTION
            )
            COMMENT='Armazena as categorias utilizadas no sistema. \r\nPodendo ser do tipos Estoque, Pessoa, Vendas, Geral'
            COLLATE='utf8mb4_general_ci'
            ;
            
            `)
                        
       
    } catch (error) {
        console.log('Erron na conexão com a base de dados: ', error)
    }
}

// connection.query('select * from usuarios', (err, results, fields)=>{
//     console.log('Teste de conexão na base de dados', err, results, fields)
// })
conectando()

