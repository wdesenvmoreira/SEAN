async function buscarItemSaldoLD(busca){
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
    
        dados = await axios.get(`http://localhost:5412/LD/ItemSaldo/api/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function preencherTabelaItemSaldo(busca){console.log('Busca: ', busca)
    const tabelaItemSaldo = document.getElementById('tabelaItemSaldo')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarItemSaldoLD(busca)
    console.log('dados: ',dados);
    sairPainelItemSaldo()

   await dados.forEach(itemSaldo => {
        const tr = document.createElement(`tr`)
        tr.setAttribute('id',itemSaldo.id)
        tr.innerHTML = `<td>${itemSaldo.id}</td>
                        <td>${itemSaldo.descricao}</td>
                         <td >
                            <a onclick="setarItemSaldoAlterar(${itemSaldo.id}, '${itemSaldo.descricao}')" data-toggle="modal" data-target="#modalAlterar">
                                <i class="material-icons prefix">edit</i> 
                            </a>
                        </td>
                        <td><a onclick="deletarItemSaldo(${itemSaldo.id})"><i class="material-icons prefix">delete</i></a></td>`
                    
        corpoTabela.appendChild(tr)
        
    })
    tabelaItemSaldo.style.display = 'block'
}


function setarItemSaldoAlterar(id,itemSaldo){
    let idAlterar = document.getElementById('idItemSaldoAlterar')
    let itemSaldoAlterar = document.getElementById('descricaoAlteracao')
    itemSaldoAlterar.value = itemSaldo
    idAlterar.value = id;
}

function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
   
}

document.getElementById("pesquisaItemSaldo").addEventListener("input", ()=>{
    limpartabela()
    preencherTabelaItemSaldo(document.getElementById("pesquisaItemSaldo").value)
});



let gravar = document.getElementById('gravar')

gravar.addEventListener('click',async(event)=>{
    event.preventDefault()
    let descricao   = document.getElementById('descricao').value
   
    let divMsg  = document.getElementById('divMsg')

    let retorno


    descricao = descricao.trim()


    if(descricao != '' && descricao != undefined ){

                //document.getElementById('formItemSaldo').submit()
                retorno = await axios.post(`http://localhost:5412/LD/ItemSaldo/incluir`,{descricao})
                console.log('retorno: ', retorno.data)
                if(retorno.data!='Duplicado'){
                    M.toast({html: `<span class='blue red-4' >Registro ${retorno.data[0]} incluído com sucesso</span>`, classes: 'rounded'});
                    limpartabela()
                    preencherTabelaItemSaldo(retorno.data[0])
                   
                    $('#modalIncluir').modal('hide')
                }else{
                    divMsg.innerText=`Base de dados já possui o ItemSaldo: ${itemSaldo}.`
                    M.toast({html: `<span class='blue red-dark-4' >Base de dados já possui o ItemSaldo: ${itemSaldo}.</span>`, classes: 'rounded'});
                }
        }else{
            divMsg.innerText='Descrição deve ser informado.'
        }
    
})

function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formItemSaldo').reset() 
}

async function deletarItemSaldo(id){
    let retorno = await axios.delete(`http://localhost:5412/LD/ItemSaldo/Delete/${id}`)
    .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno deletar: ', retorno)
    if(retorno==1){
        M.toast({html: `<span class='blue red-4' >Registro ${id} deletado com sucesso</span>`, classes: 'rounded'});
        limpartabela()
        preencherTabelaItemSaldo()
    }else{
        M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
    }
    
}

// async function alterarItemSaldo(id){
//     let edicao = document.getElementById(`edicaoItemSaldo${id}`).checked
    
//     let ItemSaldo ={
//         id: id,
//         edicao: edicao
//     }

//      let retorno = await axios.post(`http://localhost:5412/ItemSaldo/alterar`, ItemSaldo)
//      .then(response => response.data)
//     .catch((error) => {
//       throw error.response.data
//     })
//     console.log('retorno da alteração: ', retorno)
//     if(retorno==1){
//         // document.getElementById(`edicaoItemSaldo${id}`).checked=edicao
//         M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
//         // limpartabela()
//         // preencherTabelaItemSaldo(id)
//     }else{
//         M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
//        // limpartabela()
//        // preencherTabelaItemSaldo(id)
//     }
    
// }

async function alteracaoItemSaldo(){
    
    let descricao = document.getElementById('descricaoAlteracao').value
    let idItemSaldo = document.getElementById('idItemSaldoAlterar').value
    
    let itemSaldo ={
        id: idItemSaldo,
        descricao: descricao
    }
    console.log('alteração ItemSaldo: ', descricao)
     let retorno = await axios.post(`http://localhost:5412/LD/ItemSaldo/Alterar`, itemSaldo)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno da alteração: ', retorno)
    if(retorno==1){
        $('#modalAlterar').modal('hide')
        M.toast({html: `<span class='blue red-4' >Registro ${idItemSaldo} Alterado com sucesso</span>`, classes: 'rounded'});
         limpartabela()
         preencherTabelaItemSaldo(idItemSaldo)
     
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${idItemSaldo}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaItemSaldo(id)
    }
    
}


// async function listarItemSaldo(id){
//     const conteudoUW = document.getElementById('conteudoItemSaldo')
//     let corpoTabela = document.getElementById('corpoTabelaItemSaldo')
    
//     sairPainelItemSaldo()

//     while (corpoTabela.childElementCount >0) {
//         corpoTabela.removeChild(corpoTabela.children[0])
//     }

//     const retorno = await axios.get(`http://localhost:5412/uw/${id}`)
//     .then(response => response.data)
//     .catch( (error)=> {
//         throw error.response.data
//     })

//     if(retorno.length > 0){
//         let cabecalhoUW = document.getElementById('cabecalhoUW')
//         cabecalhoUW.innerText = retorno[0].ItemSaldo
//         let tabelaUW =document.getElementById('tabelaUW') 

        
        
       

//         retorno.forEach(uw => {
//             const tr = document.createElement('tr')
//             tr.innerHTML = `
//                             <td>${uw.id_indicador}</td>
//                             <td class="container">${uw.nome}</td>
//                             <td class="container">${uw.titulo}</td>
//                             <td>
//                                 <div class="switch">
//                                     <label>
//                                         Não
//                                         <input id="incluirwbi${uw.id}" onclick="alterarUW(${uw.id},1)"  type="checkbox">
//                                         <span class="lever"></span>
//                                         Sim
//                                     </label>
//                                 </div>
//                              </td>
//                              <td>
//                              <div class="switch">
//                                  <label>
//                                      Não
//                                      <input id="editarwbi${uw.id}" onclick="alterarUW(${uw.id},2)" type="checkbox">
//                                      <span class="lever"></span>
//                                      Sim
//                                  </label>
//                              </div>
//                           </td>
//                           <td>
//                           <div class="switch">
//                               <label>
//                                   Não
//                                   <input id="excluirwbi${uw.id}" onclick="alterarUW(${uw.id},3)" type="checkbox">
//                                   <span class="lever"></span>
//                                   Sim
//                               </label>
//                           </div>
//                        </td>
//                         `
                        
//             corpoTabela.appendChild(tr)
//             document.getElementById(`incluirwbi${uw.id}`).checked = uw.incluir
//             document.getElementById(`editarwbi${uw.id}`).checked = uw.editar
//             document.getElementById(`excluirwbi${uw.id}`).checked = uw.excluir
//         })
//         conteudoUW.style.display = 'block'
//         tabelaUW.style.display = 'block'
//     }else{
//         M.toast({html: `<span class='purple darken-4 text-blue-dark-4' >Não há WBI para esse ItemSaldo. </span>`,  classes: 'rounded'});
//     }
// }

// async function alterarUW(id, op){
//     let uwbi = {
//     }
//     uwbi.id = id
  
//     switch (op) {
//         case 1:
//            let incluir = document.getElementById(`incluirwbi${id}`).checked
//            uwbi.incluir = incluir
//             break;
//         case 2:
//             let editar = document.getElementById(`editarwbi${id}`).checked
//            uwbi.editar = editar
//         break;
//         case 3:
//             let excluir = document.getElementById(`excluirwbi${id}`).checked
//             uwbi.excluir = excluir
//                 break;
//         default:
//             break;
//     }
   

    
    // let ItemSaldo ={
    //     id, incluir, editar, excluir
    // }

//     console.log('id: ', id)
//     console.log('wbi: ', uwbi)
//      let retorno = await axios.put(`http://localhost:5412/uw/alterar`, uwbi)
//      .then(response => response.data)
//      .catch((error) => {
//       throw error.response.data
//     })
//     console.log('retorno da alteração: ', retorno)
//     if(retorno==1){
//         // document.getElementById(`edicaoItemSaldo${id}`).checked=edicao
//         M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
//         // limpartabela()
//         // preencherTabelaItemSaldo(id)
//     }else{
//         M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
//        // limpartabela()
//        // preencherTabelaItemSaldo(id)
//     }
    
// }

function sairPainelItemSaldo(){
    let conteudoItemSaldo = document.getElementById('conteudoItemSaldo')
    let tabelaItemSaldo =document.getElementById('tabelaItemSaldo') 

    conteudoItemSaldo.style.display = 'none'
    tabelaItemSaldo.style.display = 'none'
}


