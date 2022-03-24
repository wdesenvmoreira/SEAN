const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('subgrupos', table => {
                table.increments('id_subgrupo').primary()
                table.string('descricao').notNullable()
                table.integer('grupo').unsigned()
                .references('id_grupo')
                .inTable('grupos').onDelete('CASCADE').onUpdate('CASCADE')  
                table.integer('status').unsigned()
                .references('id_status')
                .inTable('status').onDelete('CASCADE').onUpdate('CASCADE');               
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('subgrupos')
}