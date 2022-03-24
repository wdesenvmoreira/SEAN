const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('item_saldo', table => {
                table.increments('id_item_saldo').primary()
                table.integer('item').unsigned()
                .references('id_item')
                .inTable('itens').onDelete('CASCADE').onUpdate('CASCADE')    
                table.float('saldo').notNullable()
                table.float('vlr_medio').notNullable()
                table.float('vlr_compra').notNullable()
                table.boolean('boleano')
                             
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('item_saldo')
}