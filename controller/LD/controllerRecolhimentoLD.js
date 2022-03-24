const { database } = require('../../config/conexao')
const knex = require('../../database/connection') // Onde connection é o arquivo de conexão dentro da pasta database
const firebird = require('../controllerFirebird')

const consultaBanco = async (campos, tabela, condicao)=>{
    let dados = []
    let sql = (`select ${campos} from ${tabela} ' ' ${condicao}`)
    sql = 'select * from usuario'
    //console.log('sql consulta banco: ', sql)
    
    try {
        dados = await firebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    

}
const consultaRecolhimento = async (recolhimento)=>{
    let dados = []
    let sql = (`  
    select
        docfat.codigo_docfat as "pedido",
        recolhimento.autoinc_rec as "recolhimento",
        recolhimento.tipo_rec as "tipo_rec",
        docfat.cliente_docfat as "cod_cliente",
        p.razaosocial_pessoa as "razao_cliente",
        did.autoinc_docitemdet as "autoinc_pedido",
        did.item_docitemdet as "cod_item",
        i.descricao_item as "desc_item",
        did.variacao_docitemdet as "cod_variacao",
        v.descricao_variacao as "desc_variacao",
        did.acabamento_docitemdet as "cod_acabamento",
        a.descricao_acabamento as "desc_acabamento",
        did.item_docitemdet ||'.'||did.variacao_docitemdet||'.'||did.acabamento_docitemdet as "cod_analitico",
        recolhimento_entrega.qtdechapas_recent as "quantidade",
        recolhimento_entrega.motivo_recent as "cod_motivo",
        motivo.descricao_motivo as "desc_motivo"
    from recolhimento_entrega
        left join recolhimento on ( recolhimento.autoinc_rec = recolhimento_entrega.autoincrec_recent)
        left join documento_item_detalhe did on (did.autoinc_docitemdet = recolhimento_entrega.ai_docitemdetalhe_recent)
        left join documento_fatura docfat on (docfat.codigo_docfat = did.documento_docitemdet)
        left join pessoa p on (p.codigo_pessoa = docfat.cliente_docfat)
        left join item i on (i.codigo_item = did.item_docitemdet)
        left join variacao v on (v.codigo_variacao = did.variacao_docitemdet)
        left join acabamento a on (a.codigo_acabamento = did.acabamento_docitemdet)
        left join motivo on (motivo.codigo_motivo = recolhimento_entrega.motivo_recent)
    where recolhimento.autoinc_rec = ${recolhimento}
        and docfat.entrega_docfat = 'N'
        and recolhimento.tipo_rec = 1
     `)
    

    console.log('sql consulta banco: ', sql)
    
    try {
        dados = await firebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    

}

const consultaItemRecolhimento = async (autoinc)=>{
    let dados = []
    let sql = (`  
    select
        docfat.codigo_docfat as "pedido",
        recolhimento.autoinc_rec as "recolhimento",
        recolhimento.tipo_rec as "tipo_rec",
        docfat.cliente_docfat as "cod_cliente",
        p.razaosocial_pessoa as "razao_cliente",
        did.autoinc_docitemdet as "autoinc_pedido",
        did.item_docitemdet as "cod_item",
        i.descricao_item as "desc_item",
        did.variacao_docitemdet as "cod_variacao",
        v.descricao_variacao as "desc_variacao",
        did.acabamento_docitemdet as "cod_acabamento",
        a.descricao_acabamento as "desc_acabamento",
        did.item_docitemdet ||'.'||did.variacao_docitemdet||'.'||did.acabamento_docitemdet as "cod_analitico",
        recolhimento_entrega.qtdechapas_recent as "quantidade",
        recolhimento_entrega.motivo_recent as "cod_motivo",
        motivo.descricao_motivo as "desc_motivo"
    from recolhimento_entrega
        left join recolhimento on ( recolhimento.autoinc_rec = recolhimento_entrega.autoincrec_recent)
        left join documento_item_detalhe did on (did.autoinc_docitemdet = recolhimento_entrega.ai_docitemdetalhe_recent)
        left join documento_fatura docfat on (docfat.codigo_docfat = did.documento_docitemdet)
        left join pessoa p on (p.codigo_pessoa = docfat.cliente_docfat)
        left join item i on (i.codigo_item = did.item_docitemdet)
        left join variacao v on (v.codigo_variacao = did.variacao_docitemdet)
        left join acabamento a on (a.codigo_acabamento = did.acabamento_docitemdet)
        left join motivo on (motivo.codigo_motivo = recolhimento_entrega.motivo_recent)
    where did.autoinc_docitemdet = ${autoinc}
        and docfat.entrega_docfat = 'N'
        and recolhimento.tipo_rec = 1
     `)
    

   // console.log('sql consulta banco: ', sql)
    
    try {
        dados = await firebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    

}

const consultaOrdemCompra = async (pedido)=>{
    let dados = []
    let sql = (`  
    select 
        docordem.ordemcompra_dococ as oc  
    from documento_ordemcompra docordem
        left join documento_fatura docfat on (docfat.codigo_docfat = docordem.documento_dococ)
    where docfat.codigo_docfat = ${pedido}
     `)
        
    try {
        dados = await firebird.consultar(sql)
        return dados
    } catch (error) {
        console.log('Erro na consulta firebird: ', error)
        return error
    }
    

}

const findAllItemRecolhidos = async(rec, codProduto) =>{
    
    try {
        console.log('infbusca no controller: ', rec, codProduto)
        let registro
        if(rec == 'V' && codProduto == 'V'){
            //  registro = await knex('item_recolhido_ld')
            // .select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status')
             registro =  await knex.select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status','status.descricao').from('item_recolhido_ld')
            .leftJoin('status', 'item_recolhido_ld.status', 'status.id')
            .where('cod_item', '>', 0)
          
        }
        if(rec == 'V' && codProduto != 'V'){
            //  registro = await knex('item_recolhido_ld')
            // .where('cod_item', codProduto)
            // .orderBy('cod_item', 'asc')
            // .select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status')
            registro =  await knex.select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status','status.descricao').from('item_recolhido_ld')
            .leftJoin('status', 'item_recolhido_ld.status', 'status.id')
            .where('cod_item', codProduto)
            .orderBy('cod_item', 'asc')

     
        }
        if(rec != 'V' && codProduto == 'V'){
            //  registro = await knex('item_recolhido_ld')
            // .where('recolhimento', rec)
            // .orderBy('cod_item', 'asc')
            // .select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status')

            registro =  await knex.select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status','status.descricao').from('item_recolhido_ld')
            .leftJoin('status', 'item_recolhido_ld.status', 'status.id')
            .where('recolhimento', rec)
            .orderBy('cod_item', 'asc')
     
        }
        if(rec != 'V' && codProduto != 'V'){
            //  registro = await knex('item_recolhido_ld')
            // .where({recolhimento: rec, cod_item: codProduto})
            // .orderBy('cod_item', 'asc')
            // .select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status')
            
            registro =  await knex.select('pedido',' recolhimento', 'tipo_rec', 'cod_cliente', 'razao_cliente', 'autoinc_pedido', 'cod_item', 'desc_item', 'cod_variacao', 'desc_variacao', 'cod_acabamento', 'desc_acabamento', 'cod_analitico', 'quantidade', 'cod_motivo', 'desc_motivo', 'status','status.descricao').from('item_recolhido_ld')
            .leftJoin('status', 'item_recolhido_ld.status', 'status.id')
            .where({recolhimento: rec, cod_item: codProduto})
            .orderBy('cod_item', 'asc')

        }
                            
         return registro
 } catch (error) {
     return error
 }
} 

// Pesquisa WBI por  sua id. 
const findById = async(id) =>{
    try {
  
           const registro = await knex('item_recolhido_ld')
                            .where('id', id)
                            .select('id', 'descricao' )
                            .first()     
            return registro
    } catch (error) {
        return error
    }
      
   
}
// Pesquisa WBI por  sua id. 
const verificaItemRecolhimento = async(id) =>{
    try {
  
           const registro = await knex('item_recolhido_ld')
                            .where('autoinc_pedido', id)
                            .select('autoinc_pedido')
                            .first()     
            return registro
    } catch (error) {
        return error
    }
      
   
}

const buscaAutoIncRecolhimento = async(id) =>{
    try {
  
           const registro = await knex('item_recolhido_ld')
                            .where('recolhimento', id)
                            .select('autoinc_pedido')
                               
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
            return await knex('item_recolhido_ld')
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
         const verificacao = await knex('item_recolhido_ld')
        .where('autoinc_pedido', inf)
        .first()  
        return verificacao
    } catch (error) {
        return error
    }
}


const create = async(novosdados) => {  
    novosdados.status = 1 

   const autoincPedido = await verificarStatus(novosdados.autoinc_pedido)
    if (!autoincPedido) {
        try {
           
            const status = await knex('item_recolhido_ld').insert({
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
        return await knex('item_recolhido_ld')
                .where({ id })
                .update({...dados})
    } catch (error) {
        return error
    }
}
const updateStatus = async(autoinc_pedido, status) => {   
    try {
        return await knex('item_recolhido_ld')
                .where({ autoinc_pedido })
                .update({status})
    } catch (error) {
        return error
    }
}


const deletar = async(autoinc_pedido) =>{

        try {
        return await knex('item_recolhido_ld')
                        .where({ autoinc_pedido })
                        .del()
        } catch (error) {
            return error
        }

}

module.exports = { findAllItemRecolhidos, findById, create, deletar, update, updateStatus, findByStatus, verificarStatus, consultaBanco, consultaRecolhimento, consultaOrdemCompra, consultaItemRecolhimento, verificaItemRecolhimento, buscaAutoIncRecolhimento}