const knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('usuarios', table => {
                table.increments('id_usuario').primary()
                table.string('usuario').notNullable()
                table.string('senha').notNullable()   
                table.boolean('master').notNullable()    
                table.integer('status').unsigned()
                .references('id_status')
                .inTable('status').onDelete('CASCADE').onUpdate('CASCADE');  
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('usuarios')
}
