const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('itens', table => {
                table.increments('id_item').primary()
                table.string('descricao').notNullable()
                table.string('apelido');
                table.integer('unidade').unsigned()
                .references('id_unidade')
                .inTable('unidades')
                table.integer('grupo').unsigned()
                .references('id_grupo')
                .inTable('grupos').onDelete('CASCADE').onUpdate('CASCADE')   
                table.integer('subgrupo').unsigned()
                .references('id_subgrupo')
                .inTable('subgrupos').onDelete('CASCADE').onUpdate('CASCADE')   
                table.integer('tipo').unsigned()
                .references('id_tipo')
                .inTable('tipos').onDelete('CASCADE').onUpdate('CASCADE')   
                table.integer('categoria').unsigned()
                .references('id_categoria')
                .inTable('categorias').onDelete('CASCADE').onUpdate('CASCADE')    
                table.integer('marca').unsigned()
                .references('id_marca')
                .inTable('marcas').onDelete('CASCADE').onUpdate('CASCADE')  
                table.integer('classificacao').unsigned()
                .references('id_classificacao')
                .inTable('classificacao').onDelete('CASCADE').onUpdate('CASCADE')    
                table.string('cod_barras')
                table.integer('status').unsigned()
                .references('id_status')
                .inTable('status').onDelete('CASCADE').onUpdate('CASCADE')              
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('grupo')
}