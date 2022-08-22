const conexao = require('../infra/conexao.js')


class Veiculos {
    adiciona(veiculo, res) {
        const sql = 'INSERT INTO dados_veiculos SET ?'
        const vinEhValido = veiculo.vin.length == 20

        const validacoes = [
            {
                nome: 'vin',
                mensagem: 'Vin deve ter 20 digitos',
                valido: vinEhValido
            }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if(existemErros) {
        res.status(400).json(erros)
    } else {
        conexao.query(sql, veiculo, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(veiculo)
            }
        })
    }
}

    listaModeloVeiculo(res) {
        const sql = 'SELECT * FROM modelos_veiculos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({vehicles: resultados})
            }}) 
    }

    lista(res) {
        const sql = 'SELECT * FROM dados_veiculos'
        console.log('sql')

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({vehicleData: resultados})
            }}) 
        }
    
    
    buscaPorId(id,res) {
        const sql = `SELECT * FROM dados_veiculos WHERE id=${id}`;

        conexao.query(sql, (erro,resultados) => {
            const veiculo = resultados[0];
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(veiculo)
            }})  
    } 
    
    altera(id, valores, res) {
        const sql = 'UPDATE dados_veiculos SET ? WHERE id=?';
    
        conexao.query(sql, [valores, id], (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }}
        )
    } 
    
    deleta(id, res) {
        const sql = 'DELETE FROM dados_veiculos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
    
}        
    

module.exports = new Veiculos