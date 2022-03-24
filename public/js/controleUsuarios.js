async function buscarUsuarios(busca){
    let dados
    
    console.log('busca antes: ', busca)
    
   if(busca/1 || busca==0 && !busca.match(/^(\s)+$/) && busca !=''){
       console.log('é número')
       busca = busca
   }else{
   
        if(busca == '' || busca == undefined ||busca.match(/^(\s)+$/)){
            busca = 'todos'
        }
    }
    console.log('busca?depois> ', busca)
    
        dados = await axios.get(`http://localhost:5412/usuariosapi/${busca}`)
        .then(response => {
           
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error            
        })
    
        return dados
}

async function preencherTabelaUsuarios(busca){
    const tabelaUsuarios = document.getElementById('tabelaUsuarios')
    const corpoTabela = document.getElementById('corpoTabela')
    let dados = await buscarUsuarios(busca)
    console.log('dados: ',dados);
    sairPainelUW()

   await dados.forEach(usuario => {
        const tr = document.createElement(`tr`)
        tr.setAttribute('id',usuario.id_usuario)
        tr.innerHTML = `<td>${usuario.id_usuario}</td>
                        <td>${usuario.usuario}</td>
                        <td>
                            <div class="switch">
                                <label>
                                    Não
                                    <input id="masterUsuario${usuario.id_usuario}" onclick="alterarUsuario(${usuario.id_usuario})"  type="checkbox">
                                    <span class="lever"></span>
                                    Sim
                                </label>
                            </div>
                         </td>
                         <td >
                            <a onclick="setarUsuarioAlterar(${usuario.id_usuario}, '${usuario.usuario}', ${usuario.status}, ${usuario.master})" data-toggle="modal" data-target="#modalAlterar">
                                <i class="material-icons prefix">password</i> 
                            </a>
                        </td>
                       
                         
                        <td><a onclick="deletarUsuario(${usuario.id_usuario})"><i class="material-icons prefix">delete</i></a></td>`
                    
        corpoTabela.appendChild(tr)
        document.getElementById(`masterUsuario${usuario.id_usuario}`).checked = usuario.master
    })
    tabelaUsuarios.style.display = 'block'
}


function setarUsuarioAlterar(id,usuario, status, master){
    let idAlterar = document.getElementById('idUsuarioAlterar')
    let usuarioAlterar = document.getElementById('usuarioAlterar')
    let masterAlteracaoUsuario = document.getElementById('masterAlteracaoUsuario')
    usuarioAlterar.innerText = usuario
    idAlterar.value = id;
    let usuarioStatus = document.getElementById('usuarioStatus')

    usuarioStatus.checked = status
    masterAlteracaoUsuario.checked = master

}



function limpartabela(){
    let tbody = document.getElementById('corpoTabela')
    while (tbody.childElementCount >0) {
        tbody.removeChild(tbody.children[0])
    }
    //document.getElementById('tabelaUsuarios').style.display = 'none'
}

document.getElementById("pesquisaUsuarios").addEventListener("input", ()=>{
    limpartabela()
    preencherTabelaUsuarios(document.getElementById("pesquisaUsuarios").value)
});



let gravar = document.getElementById('gravar')

gravar.addEventListener('click',async(event)=>{
    event.preventDefault()
    let usuario = document.getElementById('usuario').value
    let senha   = document.getElementById('senha').value
    let master  = document.getElementById('master').checked
    console.log('doc master: ', document.getElementById('master').checked)
    console.log(' master: ', master)
    let divMsg  = document.getElementById('divMsg')

    let retorno

    usuario =usuario.trim()
    senha = senha.trim()
    //edicao = edicao.trim()

    if(usuario != '' && usuario != undefined ){
        if(senha != '' && senha != undefined ){
                //document.getElementById('formUsuario').submit()
                retorno = await axios.post(`http://localhost:5412/usuarios/incluir`,{usuario,senha,master})
                console.log('retorno: ', retorno.data)
                if(retorno.data!='Duplicado'){
                    M.toast({html: `<span class='blue red-4' >Registro ${retorno.data[0]} incluído com sucesso</span>`, classes: 'rounded'});
                    limpartabela()
                    preencherTabelaUsuarios(retorno.data[0])
                   
                    $('#modalIncluir').modal('hide')
                }else{
                    divMsg.innerText=`Usuário ${usuario} Já Cadastrado.`
                    M.toast({html: `<span class='blue red-dark-4' >Usuário ${usuario}, já esta cadastrado.</span>`, classes: 'rounded'});
                }
        }else{
            divMsg.innerText='Senha deve ser informado.'
        }
    }else{
        divMsg.innerText='Usuário deve ser informado.'
    }
})

function limparFormulario(){
    let divMsg  = document.getElementById('divMsg')
    divMsg.innerText=""
    document.getElementById('formUsuario').reset() 
}

async function deletarUsuario(id_usuario){
    let retorno = await axios.delete(`http://localhost:5412/usuarios/delete/${id_usuario}`)
    .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno deletar: ', retorno)
    if(retorno==1){
        M.toast({html: `<span class='blue red-4' >Registro ${id_usuario} deletado com sucesso</span>`, classes: 'rounded'});
        limpartabela()
        preencherTabelaUsuarios()
    }else{
        M.toast({html: `<span class='blue red-4' >${retorno}</span>`, classes: 'rounded'});
    }
    
}

async function alterarUsuario(id){
    let master = document.getElementById(`masterUsuario${id}`).checked
    
    let usuarios ={
        id_usuario: id,
        master: master
    }

     let retorno = await axios.post(`http://localhost:5412/usuarios/alterar`, usuarios)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno da alteração: ', retorno)
    if(retorno==1){
        // document.getElementById(`edicaoUsuario${id}`).checked=edicao
        M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
        // limpartabela()
        // preencherTabelaUsuarios(id)
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaUsuarios(id)
    }
    limpartabela()
    preencherTabelaUsuarios(id)
}

async function alteracaoUsuario(){
    let master = document.getElementById('masterAlteracaoUsuario').checked
    let novasenha = document.getElementById('novasenha').value
    let id_usuario = document.getElementById('idUsuarioAlterar').value
    let usuarioStatus = document.getElementById('usuarioStatus')
    let status = false
    if (usuarioStatus.checked){
        status = true
    }
    
    let usuarios ={
        id_usuario: id_usuario,
        master: master,
        senha: novasenha,
        status: status
    }
    console.log('alteração usuarios: ', usuarios)
     let retorno = await axios.post(`http://localhost:5412/usuarios/alterar`, usuarios)
     .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
    console.log('retorno da alteração: ', retorno)
    if(retorno==1){
        // document.getElementById(`edicaoUsuario${id}`).checked=edicao
        M.toast({html: `<span class='blue red-4' >Registro ${id_usuario} Alterado com sucesso</span>`, classes: 'rounded'});
        $('#modalAlterar').modal('hide')
    
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id_usuario}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaUsuarios(id)
    }
   limpartabela()
    preencherTabelaUsuarios(id_usuario)
}


async function listarUW(id){
    const conteudoUW = document.getElementById('conteudoUW')
    let corpoTabela = document.getElementById('corpoTabelaUW')
    
    sairPainelUW()

    while (corpoTabela.childElementCount >0) {
        corpoTabela.removeChild(corpoTabela.children[0])
    }

    const retorno = await axios.get(`http://localhost:5412/uw/${id}`)
    .then(response => response.data)
    .catch( (error)=> {
        throw error.response.data
    })

    if(retorno.length > 0){
        let cabecalhoUW = document.getElementById('cabecalhoUW')
        cabecalhoUW.innerText = retorno[0].usuario
        let tabelaUW =document.getElementById('tabelaUW') 

        
        
       

        retorno.forEach(uw => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                            <td>${uw.id_indicador}</td>
                            <td class="container">${uw.nome}</td>
                            <td class="container">${uw.titulo}</td>
                            <td>
                                <div class="switch">
                                    <label>
                                        Não
                                        <input id="incluirwbi${uw.id}" onclick="alterarUW(${uw.id},1)"  type="checkbox">
                                        <span class="lever"></span>
                                        Sim
                                    </label>
                                </div>
                             </td>
                             <td>
                             <div class="switch">
                                 <label>
                                     Não
                                     <input id="editarwbi${uw.id}" onclick="alterarUW(${uw.id},2)" type="checkbox">
                                     <span class="lever"></span>
                                     Sim
                                 </label>
                             </div>
                          </td>
                          <td>
                          <div class="switch">
                              <label>
                                  Não
                                  <input id="excluirwbi${uw.id}" onclick="alterarUW(${uw.id},3)" type="checkbox">
                                  <span class="lever"></span>
                                  Sim
                              </label>
                          </div>
                       </td>
                        `
                        
            corpoTabela.appendChild(tr)
            document.getElementById(`incluirwbi${uw.id}`).checked = uw.incluir
            document.getElementById(`editarwbi${uw.id}`).checked = uw.editar
            document.getElementById(`excluirwbi${uw.id}`).checked = uw.excluir
        })
        conteudoUW.style.display = 'block'
        tabelaUW.style.display = 'block'
    }else{
        M.toast({html: `<span class='purple darken-4 text-blue-dark-4' >Não há WBI para esse usuario. </span>`,  classes: 'rounded'});
    }
}

async function alterarUW(id, op){
    let uwbi = {
    }
    uwbi.id = id
  
    switch (op) {
        case 1:
           let incluir = document.getElementById(`incluirwbi${id}`).checked
           uwbi.incluir = incluir
            break;
        case 2:
            let editar = document.getElementById(`editarwbi${id}`).checked
           uwbi.editar = editar
        break;
        case 3:
            let excluir = document.getElementById(`excluirwbi${id}`).checked
            uwbi.excluir = excluir
                break;
        default:
            break;
    }
   

    
    // let usuarios ={
    //     id, incluir, editar, excluir
    // }

    console.log('id: ', id)
    console.log('wbi: ', uwbi)
     let retorno = await axios.put(`http://localhost:5412/uw/alterar`, uwbi)
     .then(response => response.data)
     .catch((error) => {
      throw error.response.data
    })
    console.log('retorno da alteração: ', retorno)
    if(retorno==1){
        // document.getElementById(`edicaoUsuario${id}`).checked=edicao
        M.toast({html: `<span class='blue red-4' >Registro ${id} Alterado com sucesso</span>`, classes: 'rounded'});
        // limpartabela()
        // preencherTabelaUsuarios(id)
    }else{
        M.toast({html: `<span class='red dark-4 text-blue text-blue-dark-4' >Erro ao Alterar o Registro ${id}. Verifique </span>`, classes: 'rounded'});
       // limpartabela()
       // preencherTabelaUsuarios(id)
    }
    
}

function sairPainelUW(){
    let conteudoUW = document.getElementById('conteudoUW')
    let tabelaUW =document.getElementById('tabelaUW') 

    conteudoUW.style.display = 'none'
    tabelaUW.style.display = 'none'
}


