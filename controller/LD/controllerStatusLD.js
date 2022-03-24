const { database } = require('../../config/conexao')
const knex = require('../../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database


const findAll = async() =>{
    
    try {
        return await knex('status').select('id', 'descricao' )
      
    }
    catch (error) {
        return error
    }
} 

// Pesquisa WBI por  sua id. 
const findById = async(id) =>{
    try {
  
           const registro = await knex('status')
                            .where('id', id)
                            .select('id', 'descricao' )
                            .first()     
            return registro
    } catch (error) {
        return error
    }
      
   
}

// Irá verificar se o WBI existe através da id do WBI ou do nome do usuário. 
// Caso digite um valor que seja inteiro a pesquisa será por id utilizando a função findByWBI senão a pesquisa será por nome de ususario . 
const findByStatus = async(inf) => {
    console.log('inf: ',inf)
    if(inf / 1 || inf == 0){

        let data = []
        data.push(await findById(inf))
        console.log('data:',data)
        return data
         
    }else{
        try {
            
            inf = inf.trim()
            return await knex('status')
            .where('descricao', 'like', `%${inf}%`)
            .select('id', 'descricao')
        
        } catch (error) {
            return error
        }
    }
}


// Irá verificar se o usuario existe através da id do usuario ou do nome do usuário. 
// Caso digite um valor que seja inteiro a pesquisa será por id utilizando a função findByUsuario senão a pesquisa será por nome de ususario . 
const verificarStatus = async(inf) => {
    console.log('Verificando Status: ', inf)
    try {
         const verificacao = await knex('status')
        .where('descricao', 'like', `%${inf}%`)
        .first()  
        return verificacao
    } catch (error) {
        return error
    }
}


const create = async(novosdados) => {   

   const statusExiste = await verificarStatus(novosdados.descricao)
    if (!statusExiste) {
        try {
           
            const status = await knex('status').insert({
            ...novosdados
        }) 
        // return ids ? true : false
        return status
    } catch (error) {
        console.log('Error: ', error)
        return error
    }
   } else {
       return 'Duplicado'
   }
  
}

const update = async(id, dados) => {   
    try {
        return await knex('status')
                .where({ id })
                .update({...dados})
    } catch (error) {
        return error
    }
}

const deletar = async(id) =>{
    if(id > 3){
        try {
        return await knex('status')
                        .where({ id })
                        .del()
        } catch (error) {
            return error
        }
    }else{
        return {"msg":'Este Status não pode ser excluido!'}
    }
    

}

module.exports = { findAll, findById, create, deletar, update, findByStatus, verificarStatus}