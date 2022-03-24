// const { consultaRecolhimento } = require("../../../controller/LD/controllerRecolhimentoLD")

async function buscarRecolhimentoLD(busca){
    let dados
    
   
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    
        dados = await axios.get(`http://localhost:5412/LD/Recolhimentos/api/recolhimento/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
        console.log('Resultado Busca Recolhimento: ', dados)
        return dados
}

async function buscarIDitemRecolhimentoLD(busca, codProduto){
    let dados
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'V'
        }
    }
    if(codProduto/1 || codProduto==0 && !codProduto.match(/^(\s)+$/) && codProduto !=''){

        codProduto = codProduto
    }else{
    
         if(codProduto == '' || codProduto == undefined ||codProduto.match(/^(\s)+$/)){
            codProduto = 'V'
         }
     }
    
    let infbusca = [busca, codProduto]

        dados = await axios.get(`http://localhost:5412/LD/Recolhimentos/api/ItemRecolhimento/${busca}&${codProduto}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function buscarDadosItemRecolhimentoLD(busca){
    let dados
    

    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){

       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }

    
        dados = await axios.get(`http://localhost:5412/LD/Recolhimentos/api/DadosItemRecolhimento/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}


async function verificaItensRecolhidos(busca){
    dados = await axios.get(`http://localhost:5412/LD/Recolhimentos/api/ItemRecolhimento/buscaAutoIncRecolhimento/${busca}`)
    .then(response => {
       
        return response.data
    })
    .catch(error => {
        console.log(error)
        return error            
    })

    dados.forEach(recolhimento => {
        let btn = document.getElementById(`${recolhimento.autoinc_pedido}`)
        btn.setAttribute('class','btn btn-success')
        btn.innerHTML= '<i class="material-icons">done</i>'
        btn.disabled = true
    });
}

async function buscarOCLD(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('Busca por código')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'Todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://localhost:5412/LD/Recolhimentos/api/oc/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function preencherTabelaRecolhimento(busca){
    const tabelaRecolhimento = document.getElementById('tabelaRecolhimento')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarRecolhimentoLD(busca)
    sairPainelRecolhimento()
    document.getElementById('captionTabela').innerHTML = ''
    
    if(dados.length > 0){
    document.getElementById('captionTabela').innerHTML = `<div>Recolhimento: ${dados[0].recolhimento}</div> Cliente: ${dados[0].cod_cliente} - ${dados[0].razao_cliente} `

    dados.forEach(recolhimento => {
            const tr = document.createElement(`tr`)
            tr.setAttribute('id',recolhimento.pedido)
            tr.innerHTML = `<td nowrap="true"><button type="button" class="btn btn-warning" onclick='reselecao(${recolhimento.autoinc_pedido})' id=${recolhimento.autoinc_pedido}><i class="material-icons">add</i></button></td>
                            <td nowrap="true">${recolhimento.pedido}</td>
                            <td nowrap="true">${recolhimento.cod_analitico}</td>
                            <td nowrap="true">${recolhimento.desc_item}</td>
                            <td nowrap="true">${recolhimento.desc_variacao}</td>
                            <td nowrap="true">${recolhimento.desc_acabamento}</td>
                            <td nowrap="true">${recolhimento.quantidade}</td>
                            <td nowrap="true">${recolhimento.cod_motivo}</td>
                            <td nowrap="true">${recolhimento.desc_motivo}</td>
                            `
                        
            corpoTabela.appendChild(tr)
            
        })
        
        tabelaRecolhimento.style.display = 'block'
    }
    if(dados.length == 0){

        document.getElementById('tabelaRecolhimento').style.display = "none"
        M.toast({html: `<span class='blue red-dark-4' >Recolhimento: ${busca} não localizado.</span>`, classes: 'rounded'});
    }
   verificaItensRecolhidos(busca)
}

async function preencherTabelaItensRecolhidos(busca, codProduto){
    const tabelaRecolhimento = document.getElementById('tabelaRecolhimento')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarIDitemRecolhimentoLD(busca,codProduto)
    sairPainelRecolhimento()
    document.getElementById('captionTabela').innerHTML = ''
    
    if(dados.length > 0){
    // document.getElementById('captionTabela').innerHTML = `<div>Recolhimento: ${dados[0].recolhimento}</div> Cliente: ${dados[0].cod_cliente} - ${dados[0].razao_cliente} `

    dados.forEach(recolhimento => {

            let coraguardo      = 'grey-text text-lighten-2'
            let corestoque      = 'grey-text text-lighten-2'
            let corconcertando  = 'grey-text text-lighten-2'

            if(recolhimento.status == 1){
                coraguardo      = 'yellow-text text-lighten-3'
            }
            if(recolhimento.status == 2){
                corconcertando  = 'green-text text-accent-3'
            }
            if(recolhimento.status == 3){
                corestoque      = 'brown-text text-lighten-2'
                
            }

            const tr = document.createElement(`tr`)
            tr.setAttribute('id',recolhimento.pedido)
            tr.innerHTML = `
                            <td class="z-depth-1 subIcon" id="col1${recolhimento.autoinc_pedido}" onclick="setarStatus(${recolhimento.autoinc_pedido}, 1, ia${recolhimento.autoinc_pedido})"><i id="ia${recolhimento.autoinc_pedido}" class="material-icons ${coraguardo}">      pending               </i></td>
                            <td class="z-depth-1 subIcon" id="col2${recolhimento.autoinc_pedido}" onclick="setarStatus(${recolhimento.autoinc_pedido}, 2, ic${recolhimento.autoinc_pedido})"><a ><i id="ic${recolhimento.autoinc_pedido}" class="material-icons ${corconcertando}" > published_with_changes</i></a></td>
                            <td class="z-depth-1 subIcon" id="col3${recolhimento.autoinc_pedido}" onclick="setarStatus(${recolhimento.autoinc_pedido}, 3, ie${recolhimento.autoinc_pedido})"><a ><i id="ie${recolhimento.autoinc_pedido}" class="material-icons ${corestoque}">      view_in_ar            </i></a></td>
                            <td nowrap="true">${recolhimento.recolhimento}</td>
                            <td nowrap="true" onmouseout="esconderInfoCli(${recolhimento.autoinc_pedido})"   onclick="mostrarInfCli(${recolhimento.autoinc_pedido})">${recolhimento.pedido}<p id="infoCli${recolhimento.autoinc_pedido}" class="z-depth-2 infocli" id="1">CLiente: ${recolhimento.cod_cliente} : ${recolhimento.razao_cliente}</p></td>
                            <td nowrap="true">${recolhimento.cod_analitico}</td>
                            <td nowrap="true">${recolhimento.desc_item}</td>
                            <td nowrap="true">${recolhimento.desc_variacao}</td>
                            <td nowrap="true">${recolhimento.desc_acabamento}</td>
                            <td nowrap="true">${recolhimento.quantidade}</td>
                            <td nowrap="true">${recolhimento.desc_motivo}</td>
                            <td nowrap="true"><button type="button" class="btn btn-dark" onclick='deletarRecolhimento(${recolhimento.autoinc_pedido}, ${recolhimento.recolhimento})' id=${recolhimento.autoinc_pedido}><i class="material-icons">delete</i></button></td>
                            `
                        
            corpoTabela.appendChild(tr)
            if(recolhimento.status == 3){
                document.getElementById(`col1${recolhimento.autoinc_pedido}`).disabled = true;
                document.getElementById(`col2${recolhimento.autoinc_pedido}`).disabled = true;
                
            }
        })
        
        tabelaRecolhimento.style.display = 'block'
    }
    if(dados.length == 0){

        document.getElementById('tabelaRecolhimento').style.display = "none"
        M.toast({html: `<span class='blue red-dark-4' >Recolhimento: ${busca} não localizado.</span>`, classes: 'rounded'});
    }
   
}
function mostrarInfCli(id){
    document.getElementById(`infoCli${id}`).style.display = "block"
}
function esconderInfoCli(id){
    document.getElementById(`infoCli${id}`).style.display = "none"
}

async function setarStatus(autoinc, novostatus, e){


     let retorno = await axios.get(`http://localhost:5412/LD/Recolhimento/api/Alterar/Status/${autoinc}&${novostatus}`)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })

    let inativa = 'material-icons grey-text text-lighten-2'
   
    if(retorno==1){
        document.getElementById(`ia${autoinc}`).setAttribute('class', inativa )
        document.getElementById(`ic${autoinc}`).setAttribute('class', inativa )
        document.getElementById(`ie${autoinc}`).setAttribute('class', inativa )
        
        if(novostatus == 1){
            document.getElementById(`ia${autoinc}`).setAttribute('class', 'material-icons  yellow-text text-lighten-3' )
        }
        if(novostatus == 2){
            document.getElementById(`ic${autoinc}`).setAttribute('class', 'material-icons  green-text text-accent-3' )
        }
        if(novostatus == 3){
            document.getElementById(`ie${autoinc}`).setAttribute('class', 'material-icons  brown-text text-lighten-2' )
            document.getElementById(`col1${autoinc}`).disabled = true;
            document.getElementById(`col2${autoinc}`).disabled = true;
        }
     
    }else{
        M.toast({html: `<span class='blue red-dark-4' >Erro ao alterar Status do item.`, classes: 'rounded'});
    }

}

function reselecao(id){
   let btn = document.getElementById(`${id}`);
   if(btn.className == 'btn btn-warning'){
       btn.setAttribute('class','btn btn-success')
       btn.innerHTML= '<i class="material-icons">done</i>'
   }else{
    btn.setAttribute('class','btn btn-warning')
    btn.innerHTML= '<i class="material-icons">add</i>'
   }
}

 async function  incluirRecolhimento(){
    let itens = document.getElementsByClassName('btn btn-success');
    let recolhimento 
    if (itens.length > 0 ){
        for (let i = 0; i < itens.length; i++) {
            console.log('Verificando itens[i].id',itens[i].id)
            let existe = await verificarItemCadastrado(itens[i].id)
           
            if(!existe)
            {
                let retorno = await buscarDadosItemRecolhimentoLD(itens[i].id)
                let dados = retorno[0]
                recolhimento = dados.recolhimento
                await axios.post(`http://localhost:5412/LD/Recolhimentos/Incluir`,dados)
                                        .then(response => {
                                            if(response.data){
                                                divMsg.innerText='Incluido com sucesso. '
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error)
                                            return error            
                                        })
                                        console.log('cadastrou')
            }else{ M.toast({html: `<span class='blue red-dark-4' >Sem novos Itens para incluir.`, classes: 'rounded'});}

          } 
    }else{
        M.toast({html: `<span class='blue red-dark-4' >Nenhum item selecionado.`, classes: 'rounded'});
    }
    // pesquisarRecolhimento(recolhimento)
    window.location.href = "http://localhost:5412/LD/Recolhimentos";
    
}

async function verificarItemCadastrado(id){
    let autoinc = await axios.get(`http://localhost:5412/LD/Recolhimentos/api/ItemRecolhimento/Verifica/${id}`)
                                    .then(response => {
                                    
                                        return response.data
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return error            
                                    })
    if (autoinc){
        console.log('já cadastrado',autoinc)
        return true
    }else{
        console.debug('Não cadastrado',autoinc)
        return false
    }

}

function setarRecolhimentoAlterar(id,recolhimento){
    let idAlterar = document.getElementById('idRecolhimentoAlterar')
    let recolhimentoAlterar = document.getElementById('descricaoAlteracao')
    recolhimentoAlterar.value = recolhimento
    idAlterar.value = id;
}

function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
   
}

let gravar = document.getElementById('gravar')

gravar.addEventListener('click',async(event)=>{
    event.preventDefault()
    let descricao   = document.getElementById('descricao').value
   
    let divMsg  = document.getElementById('divMsg')

    let retorno


    descricao = descricao.trim()


    if(descricao != '' && descricao != undefined ){

                //document.getElementById('formRecolhimento').submit()
                retorno = await axios.post(`http://localhost:5412/LD/Recolhimento/Incluir`,{descricao})
                console.log('retorno: ', retorno.data)
                if(retorno.data!='Duplicado'){
                    M.toast({html: `<span class='blue red-4' >Registro ${retorno.data[0]} incluído com sucesso</span>`, classes: 'rounded'});
                    limpartabela()
                    preencherTabelaRecolhimento(retorno.data[0])
                   
                    $('#modalIncluir').modal('hide')
                }else{
                    divMsg.innerText=`Base de dados já possui o Recolhimento: ${descricao}.`
                    M.toast({html: `<span class='blue red-dark-4' >Base de dados já possui o Recolhimento: ${descricao}.</span>`, classes: 'rounded'});
                }
        }else{
            divMsg.innerText='Descrição deve ser informado.'
        }
    
})

//Verifica se o código de recolhimento foi informando. Caso tenha sido informado aciona a função busca com o código. 
 function pesquisarRecolhimento (){
    limpartabela()
    let codRecolhimento   = document.getElementById('codRecolhimento').value
    codRecolhimento = codRecolhimento.trim()
    if(codRecolhimento != '' && codRecolhimento != undefined ){
        preencherTabelaRecolhimento(codRecolhimento)
        
    }else{
        M.toast({html: `<span class='blue red-4' >Código de recolhimento não informado. </span>`, classes: 'rounded'});
        document.getElementById('tabelaRecolhimento').style.display = "none"
        document.getElementById('captionTabela').innerHTML = ''
    }
}
function pesquisarItensRecolhimento (){
    limpartabela()
    let codRecolhimento   = document.getElementById('codRecolhimento').value
    let codProduto   = document.getElementById('codProduto').value
    codRecolhimento = codRecolhimento.trim()
    preencherTabelaItensRecolhidos(codRecolhimento,codProduto)
    // if((codRecolhimento != '' && codRecolhimento != undefined )|| (codProduto != '' && codProduto != undefined) ){
        
        
    // }else{
    //     M.toast({html: `<span class='blue red-4' >Código de recolhimento não informado. </span>`, classes: 'rounded'});
    //     document.getElementById('tabelaRecolhimento').style.display = "none"
    //     document.getElementById('captionTabela').innerHTML = ''
    // }
}


function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formRecolhimento').reset() 
}

async function deletarRecolhimento(id, recolhimento){
    let retorno = await axios.delete(`http://localhost:5412/LD/Recolhimento/Delete/${id}`)
    .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno deletar: ', retorno)
    if(retorno==1){
        M.toast({html: `<span class='blue red-4' >Registro deletado com sucesso</span>`, classes: 'rounded'});
        limpartabela()
        preencherTabelaItensRecolhidos(recolhimento)
    }else{
        M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
    }
    
}


async function alteracaoRecolhimento(){
    
    let descricao = document.getElementById('descricaoAlteracao').value
    let idRecolhimento = document.getElementById('idRecolhimentoAlterar').value
    
    let recolhimento ={
        id: idRecolhimento,
        descricao: descricao
    }
    console.log('alteração Recolhimento: ', descricao)
     let retorno = await axios.post(`http://localhost:5412/LD/Recolhimento/Alterar`, recolhimento)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno da alteração: ', retorno)
    if(retorno==1){
        $('#modalAlterar').modal('hide')
        M.toast({html: `<span class='blue red-4' >Registro ${idRecolhimento} Alterado com sucesso</span>`, classes: 'rounded'});
         limpartabela()
         preencherTabelaRecolhimento(idRecolhimento)
     
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${idRecolhimento}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaRecolhimento(id)
    }
    
}


function sairPainelRecolhimento(){
    // let conteudoRecolhimento = document.getElementById('conteudoRecolhimento')
    let tabelaRecolhimento =document.getElementById('tabelaRecolhimento') 

    // conteudoRecolhimento.style.display = 'none'
    tabelaRecolhimento.style.display = 'none'
}

document.getElementById("codRecolhimento").focus()