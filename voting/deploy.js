const Web3 = require('web3')
const fs = require('fs')

const ABI = JSON.parse(fs.readFileSync('./Voting_sol_Voting.abi').toString())
const BYTECODE = fs.readFileSync('./Voting_sol_Voting.bin').toString()

let web3 = new Web3('http://localhost:8545')

// const deployContract = new web3.eth.Contract(ABI);
// 공개키 값을 넣는다, Voting.sol 함수에서 쓰일 인자값도 넣는다.
// deployContract.deploy({
//     data:BYTECODE,
//     arguments:[['ingoo1', 'ingoo2', 'ingoo3'].map(name=>web3.utils.asciiToHex(name))]
// })
// .send({
//     from:'0x2666858C168F1847DF115CeCBb6CcEcD1642ed97',
//     gas:6721975,
// })
// .then(newContract=>{
//     console.log(newContract.options.address)
// })
// 가나슈의 Contract created값을 넣는다! 주소값!
const contract = new web3.eth.Contract(ABI, '0xb6e24e30336308633e68e9646a4d40532146d033')

//공개 키값 넣는다. 투표를 한다!
contract.methods.voteForCandidate('ingoo1').send({from:'0x830403757E44Fb4844F26e95cFDEe3fF02CFE11C'})

//Voting.sol 에서 투표 결과를 가져온다.
contract.methods.totalVotesFor('ingoo1').call().then( data => {
    console.log(data)
})
