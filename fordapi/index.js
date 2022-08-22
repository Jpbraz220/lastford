const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else {
        console.log('Conectado no database')
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(3000, () => console.log('servidor rodando'))
    }
})


//app.get('/', (req, res) => res.send('Servidor rodando.') )