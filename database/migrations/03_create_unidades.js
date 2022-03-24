const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('unidades', table => {
                table.increments('id_unidade').primary()
                table.string('unidade').notNullable();
                table.string('sigla').notNullable();
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('unidades')
}