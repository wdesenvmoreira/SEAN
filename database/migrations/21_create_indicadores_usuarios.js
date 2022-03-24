const Knex =  require('knex')

//Criação da tabela. 
exports.up = async function (knex) {
   return await knex.schema
            .createTable('indicadores_usuarios', table => {
                table.increments('id_indicadores_usuarios').primary()
                table.integer('id_usuario').unsigned()
                .references('id_usuario')
				.inTable('usuarios').onDelete('CASCADE').onUpdate('CASCADE')
                table.integer('id_indicador').unsigned()
                .references('id_indicadores')
                .inTable('indicadores').onDelete('CASCADE').onUpdate('CASCADE')
                table.boolean('incluir')
                table.boolean('editar')
                table.boolean('excluir')
                   
            })
            
}

//deletar a tabela. Desfaz o metodo UP.
exports.down =  async function (knex){
    return await knex.schema
            .dropTable('indicadores_usuarios')
}

