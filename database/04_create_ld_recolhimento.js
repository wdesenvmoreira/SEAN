const Knex =  require('knex')

//Inserindo itens na tabela 
exports.seed = async function (knex) {
   return await knex('status').insert([
	   {id: 1, descricao:'Aguardando' },
       {id: 2, descricao:'Concertando' },
       {id: 3, descricao:'Em Estoque' }
   ])
           
            
}