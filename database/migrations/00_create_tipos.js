const knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('tipos', table => {
                table.increments('id_tipo').primary()
                table.string('tipo').notNullable()
                table.string('agrupamentos').notNullable() 
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('tipos')
}
