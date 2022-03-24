const jwt = require('jsonwebtoken')
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret
const bcrypt = require('bcryptjs')
const crtlUsuario = require('../controller/controllerUsuarios')
const rotasAuthAPI = require('../routes/routerAuthAPI')
const ctrlUW = require('../controller/controllerUsuarioWbi')


const rotasAPI= (app) => {

    app.get('/API/logout', async(req, res) =>{
        req.session.destroy(null);
        req.logout();
        res.json(true);
 
 })

 //rotasAuthAPI(app)
 
    // app.post('/API/login', async(req, res) =>{
        
    //     try {

    //         if(req.body.username.length === 0){
    //             res.render('login',{message:'Necessário informar um usuário.'})
    //         }
    //         else
    //         {
    //            if(req.body.password.length === 0){
    //                     res.render('login',{message:'Necessário informar a senha.'})
    //                 }else{
    //                     const user = await crtlUsuario.findUsuario(req.body.username);
                    
    //                     if(user.length === 0){
    //                         res.render('login',{message:'Usuário não existe.'})
    //                     }
    //                     else
    //                     {
    //                             const isValid = bcrypt.compareSync(req.body.password, user[0].senha)
    //                             console.log('isValid:' , isValid)
    //                         if(isValid){
    //                             const payload = {
    //                             id: user[0].id,
    //                             username: user[0].usuario,
    //                             edicao: user[0].edicao

    //                             }
    //                             jwt.sign(payload, jwtSecret, (err, token)=>{
    //                                 req.session.token = token;
    //                                 res.json(token)
    //                             })
                                
    //                         }else
    //                             //res.json('error',{success: false, message:'Problemas no acesso. '}) 
    //                             res.json(false)
    //                     }
    //                 }
                    
            
    //          }
    
    //     } catch (error) {
    //          console.log(error);
             
    //     }
        
    // })


 app.get('/API/usuario/:id', async(req, res) =>{
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


    res.send('')
 })

 app.get('/API/uw/:id',async(req, res)=>{
    let retorno = await ctrlUW.listaWbiUsuario(req.params.id)
    res.json(retorno)
})

    
}



module.exports = rotasAPI;