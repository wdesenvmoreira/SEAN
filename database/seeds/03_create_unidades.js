const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('unidades').insert([
      {unidade:'Unidade', sigla: 'UN'},
      {unidade:'Quilograma', sigla: 'KG'},
      {unidade:'Metro', sigla: 'MT'},
      {unidade:'Par', sigla: 'PR'},
      {unidade:'Grama', sigla: 'GR'}
   ])
           
            
}