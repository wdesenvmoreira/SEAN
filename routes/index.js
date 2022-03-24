const rotasUsuarios = require('./rotasUsuario')
const rotasUW = require('./rotasUsuario_Wbi')
const rotasWBI = require('./rotasWBI')
const rotasAuth = require('./routerAuth')
const rotasLogout = require('./rotasLogout')
const rotasPrincipal = require('./rotasPrincipal')
const rotasAPI = require('./rotasAPI')
const rotasIndicadores = require('./rotasIndicadores')
const rotasAPIIndicadores = require('./rotasAPIIndicadores')
const config = require('../config/config.json')
const rotasAPIAuth = require('../routes/routerAuthAPI')

const rotasDashboard = require('./rotaDashboard')

const rotasLD= require('./rotasLD/')
const rotasItemRecolhimentoLD = require('./rotasLD/rotasItemRecolhimentoLD')
const rotasItemSaldoLD = require('./rotasLD/rotasItemSaldoLD')
const rotasStatusLD= require('./rotasLD/rotasStatus')


const jwt = require('jsonwebtoken');
//const jwtSecret = 'secreta'
const jwtSecret = require('../config/config.json').secret


const rotas = (app) =>{
    
    app.get('/', (req, res)=>{
        res.render('login', {message:''})
    }) 


    rotasLogout(app)
    rotasAPI(app)
    rotasAPIAuth(app)
    
    rotasAuth(app)

   rotasDashboard(app)

   rotasPrincipal(app)
   rotasWBI(app)
   rotasUsuarios(app)
   rotasUW(app)
  
   rotasIndicadores(app)
   rotasAPIIndicadores(app)

   rotasLD(app)
   rotasItemRecolhimentoLD(app)
   rotasItemSaldoLD(app)
   rotasStatusLD(app)

}

module.exports = rotas