const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('status', table => {
                table.increments('id_status').primary()
                table.string('descricao').notNullable()
                table.integer('tipo').unsigned()
                .references('id_tipo').inTable('tipos').onDelete('CASCADE').onUpdate('CASCADE');               
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('status')
}