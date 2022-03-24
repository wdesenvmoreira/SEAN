const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('grupos', table => {
                table.increments('id_grupo').primary()
                table.string('descricao').notNullable()
                table.integer('tipo').unsigned()
                .references('id_tipo')
                .inTable('tipos').onDelete('CASCADE').onUpdate('CASCADE')  
                table.integer('status').unsigned()
                .references('id_status')
                .inTable('status').onDelete('CASCADE').onUpdate('CASCADE');             
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('grupo')
}