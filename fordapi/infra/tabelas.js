class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarVeiculos()
        this.criarDadosdosVeiculos()
        this.criarUsuarios()
        this.preencherVeiculosDefault()
        this.preencherDadosdosVeiculosDefault()
    }
    

    criarUsuarios() {
        const sql = `CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY AUTO_INCREMENT, 
            nome VARCHAR(30) NOT NULL UNIQUE, 
            email VARCHAR(100) NOT NULL UNIQUE, 
            senha VARCHAR(100) NOT NULL UNIQUE, 
            nome_completo VARCHAR(100) NOT NULL, 
            data_de_cadastro TIMESTAMP DEFAULT current_timestamp)`

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Usuarios criada com sucesso')
            }
        })
    }

    criarVeiculos() {
        const sql = `CREATE TABLE IF NOT EXISTS modelos_veiculos(
            id INTEGER PRIMARY KEY AUTO_INCREMENT, 
            vehicle VARCHAR(50) NOT NULL, 
            volumetotal int, 
            connected int, 
            softwareUpdates int)`
        
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Veículos criada com sucesso')
            }
        })
    }
    preencherVeiculosDefault() {
        const sql = `INSERT INTO modelos_veiculos( 
            vehicle, 
            volumetotal, 
            connected, 
            softwareUpdates) SELECT 'Ranger', 2000, 700, 1550 WHERE NOT EXISTS (SELECT * FROM modelos_veiculos WHERE vehicle = 'Ranger')`
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Veiculos preenchida com dados default 1')
    }})
        const sql2 = `INSERT INTO modelos_veiculos( 
            vehicle, 
            volumetotal, 
            connected, 
            softwareUpdates) SELECT 'Mustang', 1000, 500, 750 WHERE NOT EXISTS (SELECT * FROM modelos_veiculos WHERE vehicle = 'Mustang')`
        this.conexao.query(sql2, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Veiculos preenchida com dados default 2')
    }})
}

    criarDadosdosVeiculos() {
        const sql = `CREATE TABLE IF NOT EXISTS dados_veiculos(
            id INTEGER PRIMARY KEY AUTO_INCREMENT, 
            vin VARCHAR(20) NOT NULL UNIQUE, 
            odometer VARCHAR(30) NOT NULL, 
            tirePressure VARCHAR(30) NOT NULL, 
            status VARCHAR(30) NOT NULL, 
            batteryStatus VARCHAR(30), 
            fuelLevel VARCHAR(30), 
            lat VARCHAR(30) NOT NULL, 
            longi VARCHAR(30) NOT NULL)`
        
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Dados dos veiculos criada com sucesso')
            }
        })
    }

    preencherDadosdosVeiculosDefault(){
        const sql = `INSERT INTO dados_veiculos( 
            vin, 
            odometer, 
            tirePressure, 
            status, 
            batteryStatus, 
            fuelLevel, 
            lat, 
            longi) SELECT '2FRHDUYS2Y63NHD22454', '23344', '36,36,35,34', 'on', 'Ok', '76','-12,2322', '-35,2314'  WHERE NOT EXISTS (SELECT * FROM dados_veiculos WHERE vin = '2FRHDUYS2Y63NHD22454') `
    
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Dados dos Veiculos preenchida com dados default 1')    
    
        }})
        const sql2 = `INSERT INTO dados_veiculos( 
            vin, 
            odometer, 
            tirePressure, 
            status, 
            batteryStatus, 
            fuelLevel, 
            lat, 
            longi) SELECT '2RFAASDY54E4HDU34874', '130000', '36,34,36,33', 'off', 'Recharge', '19','-12,2322', '-35,2314'  WHERE NOT EXISTS (SELECT * FROM dados_veiculos WHERE vin = '2RFAASDY54E4HDU34874') `
    
        this.conexao.query(sql2, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Dados dos Veiculos preenchida com dados default 2')
            }})
        const sql3 = `INSERT INTO dados_veiculos( 
            vin, 
            odometer, 
            tirePressure, 
            status, 
            batteryStatus, 
            fuelLevel, 
            lat, 
            longi) SELECT '2FRHDUYS2Y63NHD22455', '50000', '36,36,35,34', 'on', 'Ok', '90','-12,2322', '-35,2314'  WHERE NOT EXISTS (SELECT * FROM dados_veiculos WHERE vin = '2FRHDUYS2Y63NHD22455') `
        
        this.conexao.query(sql3, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Dados dos Veiculos preenchida com dados default 3')
            }})
        const sql4 = `INSERT INTO dados_veiculos( 
            vin, 
            odometer, 
            tirePressure, 
            status, 
            batteryStatus, 
            fuelLevel, 
            lat, 
            longi) SELECT '2RFAASDY54E4HDU34875', '10000', '36,34,36,33', 'off', 'Ok', '25','-12,2322', '-35,2314'  WHERE NOT EXISTS (SELECT * FROM dados_veiculos WHERE vin = '2RFAASDY54E4HDU34875') `
            
        this.conexao.query(sql4, erro => {
                if(erro) {
                    console.log(erro)
                } else {
                    console.log('Tabela Dados dos Veiculos preenchida com dados default 4')
                }})

}
}
module.exports = new Tabelas