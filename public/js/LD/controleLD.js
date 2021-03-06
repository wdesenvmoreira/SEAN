async function buscarStatusLD(busca){
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
    
        dados = await axios.get(`http://localhost:5412/LD/Status/api/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function preencherTabelaStatus(busca){console.log('Busca: ', busca)
    const tabelastatus = document.getElementById('tabelaStatus')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarStatusLD(busca)
    console.log('dados: ',dados);
    sairPainelStatus()

   await dados.forEach(status => {
        const tr = document.createElement(`tr`)
        tr.setAttribute('id',status.id)
        tr.innerHTML = `<td>${status.id}</td>
                        <td>${status.descricao}</td>
                         <td >
                            <a onclick="setarStatusAlterar(${status.id}, '${status.descricao}')" data-toggle="modal" data-target="#modalAlterar">
                                <i class="material-icons prefix">edit</i> 
                            </a>
                        </td>
                        <td><a onclick="deletarStatus(${status.id})"><i class="material-icons prefix">delete</i></a></td>`
                    
        corpoTabela.appendChild(tr)
        
    })
    tabelastatus.style.display = 'block'
}


function setarStatusAlterar(id,status){
    let idAlterar = document.getElementById('idStatusAlterar')
    let statusAlterar = document.getElementById('descricaoAlteracao')
    statusAlterar.value = status
    idAlterar.value = id;
}

function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
   
}

document.getElementById("pesquisaStatus").addEventListener("input", ()=>{
    limpartabela()
    preencherTabelaStatus(document.getElementById("pesquisaStatus").value)
});



let gravar = document.getElementById('gravar')

gravar.addEventListener('click',async(event)=>{
    event.preventDefault()
    let descricao   = document.getElementById('descricao').value
   
    let divMsg  = document.getElementById('divMsg')

    let retorno


    descricao = descricao.trim()


    if(descricao != '' && descricao != undefined ){

                //document.getElementById('formstatus').submit()
                retorno = await axios.post(`http://localhost:5412/LD/Status/Incluir`,{descricao})
                console.log('retorno: ', retorno.data)
                if(retorno.data!='Duplicado'){
                    M.toast({html: `<span class='blue red-4' >Registro ${retorno.data[0]} incluído com sucesso</span>`, classes: 'rounded'});
                    limpartabela()
                    preencherTabelaStatus(retorno.data[0])
                   
                    $('#modalIncluir').modal('hide')
                }else{
                    divMsg.innerText=`Base de dados já possui o status: ${descricao}.`
                    M.toast({html: `<span class='blue red-dark-4' >Base de dados já possui o status: ${descricao}.</span>`, classes: 'rounded'});
                }
        }else{
            divMsg.innerText='Descrição deve ser informado.'
        }
    
})

function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formStatus').reset() 
}

async function deletarStatus(id){
    let retorno = await axios.delete(`http://localhost:5412/LD/Status/Delete/${id}`)
    .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno deletar: ', retorno)
    if(retorno==1){
        M.toast({html: `<span class='blue red-4' >Registro ${id} deletado com sucesso</span>`, classes: 'rounded'});
        limpartabela()
        preencherTabelaStatus()
    }else{
        M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
    }
    
}

// async function alterarStatus(id){
//     let edicao = document.getElementById(`edicaostatus${id}`).checked
    
//     let status ={
//         id: id,
//         edicao: edicao
//     }

//      let retorno = await axios.post(`http://localhost:5412/status/alterar`, status)
//      .then(response => response.data)
//     .catch((error) => {
//       throw error.response.data
//     })
//     console.log('retorno da alteração: ', retorno)
//     if(retorno==1){
//         // document.getElementById(`edicaostatus${id}`).checked=edicao
//         M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
//         // limpartabela()
//         // preencherTabelastatus(id)
//     }else{
//         M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
//        // limpartabela()
//        // preencherTabelastatus(id)
//     }
    
// }

async function alteracaoStatus(){
    
    let descricao = document.getElementById('descricaoAlteracao').value
    let idStatus = document.getElementById('idStatusAlterar').value
    
    let status ={
        id: idStatus,
        descricao: descricao
    }
    console.log('alteração status: ', descricao)
     let retorno = await axios.post(`http://localhost:5412/LD/Status/Alterar`, status)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno da alteração: ', retorno)
    if(retorno==1){
        $('#modalAlterar').modal('hide')
        M.toast({html: `<span class='blue red-4' >Registro ${idStatus} Alterado com sucesso</span>`, classes: 'rounded'});
         limpartabela()
         preencherTabelaStatus(idStatus)
     
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${idStatus}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelastatus(id)
    }
    
}


// async function listarStatus(id){
//     const conteudoUW = document.getElementById('conteudoStatus')
//     let corpoTabela = document.getElementById('corpoTabelaStatus')
    
//     sairPainelStatus()

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
//         cabecalhoUW.innerText = retorno[0].status
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
//         M.toast({html: `<span class='purple darken-4 text-blue-dark-4' >Não há WBI para esse status. </span>`,  classes: 'rounded'});
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
   

    
    // let status ={
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
//         // document.getElementById(`edicaostatus${id}`).checked=edicao
//         M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
//         // limpartabela()
//         // preencherTabelastatus(id)
//     }else{
//         M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
//        // limpartabela()
//        // preencherTabelastatus(id)
//     }
    
// }

function sairPainelStatus(){
    let conteudoStatus = document.getElementById('conteudoStatus')
    let tabelaStatus =document.getElementById('tabelaStatus') 

    conteudoStatus.style.display = 'none'
    tabelaStatus.style.display = 'none'
}


