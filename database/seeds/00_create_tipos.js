const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('tipos').insert([
      {tipo: 'Geral',   agrupamentos: 'Indefinido'},
      {tipo: 'Estoque', agrupamentos: 'Estoque'},
      {tipo: 'Pessoas', agrupamentos: 'Pessoas'}
   ])
           
            
}