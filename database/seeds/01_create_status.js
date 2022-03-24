const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('status').insert([
      {descricao: 'Ativo(a)',  tipo: 1},
      {descricao: 'Inativo(a)',  tipo: 1}
   ])
           
            
}