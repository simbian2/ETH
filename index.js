const Web3 = require('web3')
let connection = new Web3('http://127.0.0.1:8545')

connection.eth.getAccounts().then( data => {
    console.log(data)
})

connection.eth.getBalance('0x3971c715Bd4483A41224d0B214efD39F35eA618c').then( data => {
    console.log(data)
})