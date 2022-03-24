const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../../config/config.json').secret
const ctrlRecolhimento = require('../../controller/LD/controllerRecolhimentoLD')

const rotaItemRecolhimentoLD = (app) =>{
    app.use(async(req, res, next)=>{

        const token = req.session.token;

        if(token){
            try {
                const payload = jwt.verify(token, jwtSecret)
                if(payload.edicao = 1){
                  next();  
                }else{
                    console.log('Não possui permissão para acessar esta pagina. Retornando para : ',req.headers.host+'\\'+req.path)
                   res.redirect(req.headers.host+'\\'+req.path);
                }
                
            } catch (error) {
                res.render('login',{message: 'Erro ao acessar. Acesse novamente.'});
            }
        }else{
           
            res.render('login',{message: 'Realize o login.'})
        }
    });

  app.get('/LD/Recolhimentos',(req, res) => {
      
        res.render('LD/recolhimentos')
    }) 

  app.get('/LD/Recolhimentos/Inclusao',(req, res) => {
        res.render('LD/recolhimentosInclusao')
    }) 

    app.get('/LD/Recolhimentos/api/recolhimento/:recolhimento',async(req, res)=>{
            let dados  = await ctrlRecolhimento.consultaRecolhimento(req.params.recolhimento)
            console.log('/LD/Recolhimentos/api/recolhimento/:recolhimento:', dados)
            res.json(dados)

    })

    app.get('/LD/Recolhimentos/api/ItemRecolhimento/:rec&:codProduto',async(req, res)=>{
        let dados  = await ctrlRecolhimento.findAllItemRecolhidos(req.params.rec, req.params.codProduto)
        res.json(dados)

})

    app.get('/LD/Recolhimentos/api/DadosItemRecolhimento/:autoinc',async(req, res)=>{console.log('recolhimento: ',req.params.autoinc)
        let dados  = await ctrlRecolhimento.consultaItemRecolhimento(req.params.autoinc)
        res.json(dados)

    })

app.get('/LD/Recolhimentos/api/ItemRecolhimento/Verifica/:id',async(req, res)=>{
    let dados  = await ctrlRecolhimento.verificaItemRecolhimento(req.params.id)

    if(dados){
        res.json(true)
    }else{
       res.json(false) 
    }
    

})

app.get('/LD/Recolhimentos/api/ItemRecolhimento/buscaAutoIncRecolhimento/:id',async(req, res)=>{
    let dados  = await ctrlRecolhimento.buscaAutoIncRecolhimento(req.params.id)

    if(dados){
        res.json(dados)
    }else{
       res.json(false) 
    }
    

})


    app.get('/LD/Recolhimentos/api/oc/:pedidos',async(req, res)=>{
        let dados  = await ctrlRecolhimento.consultaOrdemCompra(req.params.pedidos)
        res.json(dados)

    })

    app.post('/LD/Recolhimentos/Incluir', async(req, res) => {
        var dataAtual = new Date();
        var dia = dataAtual.getDate();
        var mes = (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();
        var horas = dataAtual.getHours();
        var minutos = dataAtual.getMinutes();
        var hoje = dia+ "/" + mes +"/"+ano+"-"+ horas + ":" + minutos + "h." 



        let dados = { ...req.body}

        let oc  = await ctrlRecolhimento.consultaOrdemCompra(dados.pedido)
        
        dados.oc = oc;
        dados.entrada = hoje
        
        let incluir = await ctrlRecolhimento.create(dados)
        res.json(incluir)
        
        
    })
    app.delete('/LD/Recolhimento/Delete/:id',async(req, res) => {
        const deletar = await ctrlRecolhimento.deletar(req.params.id)
        if(deletar==1){          
           res.json(deletar) 
        }else{
            res.json(deletar.msg)
        }
        
    })

    app.get('/LD/Recolhimento/api/Alterar/Status/:autoinc_pedido&:status', async(req, res)=>{
        console.log('Rota alterando status: ', req.params)
        let alterar = await ctrlRecolhimento.updateStatus(req.params.autoinc_pedido, req.params.status)
        if(alterar){
            res.json(alterar)
        }else{
            res.send('Registro não alterado. ')
        }
    })
    
    


}
module.exports = rotaItemRecolhimentoLD