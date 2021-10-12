const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const ABI = JSON.parse(`[{"inputs":[{"internalType":"string[]","name":"_candidateNames","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"voteReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`);
const deployAddress = `0xb6e24e30336308633e68e9646a4d40532146d033`;

let VotingContract = new web3.eth.Contract(ABI,deployAddress)
let candidates = {"ingoo1":"candidate1", "ingoo2":"candidate2", "ingoo3":"candidate3"}
window.addEventListener('DOMContentLoaded',init)
async function init(){
    let candidateNames = Object.keys(candidates)
    for (let i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i]
        candidates[name]
        const nameElement = document.querySelector(`#${candidates[name]}`)
        nameElement.innerHTML = name;

        const countElement = document.querySelector(`#candidateCount${i+1}`)
        countElement.innerHTML = await VotingContract.methods.totalVotesFor(`ingoo${i+1}`).call()
    }
    // await VotingContract.methods.voteForCandidate('ingoo2').send({from:'0x830403757E44Fb4844F26e95cFDEe3fF02CFE11C'})
    //Voting.sol 에서 투표 결과를 가져온다.
    // await VotingContract.methods.totalVotesFor('ingoo2').call().then( data => {
    //     console.log(data)
    // })

    // console.log('hello world!')
}

let btn = document.querySelector('#btn')
btn.addEventListener('click',btnEvent)

async function btnEvent(){
    let candidateName = document.querySelector(`#candidateName`).value;
    await VotingContract.methods.voteForCandidate(candidateName).send({from:'0x830403757E44Fb4844F26e95cFDEe3fF02CFE11C'})
    console.log(candidateName)

    let candidateCount = await VotingContract.methods.totalVotesFor(candidateName).call()
    let number = candidateName.charAt(candidateName.length-1)
    let countElement = document.querySelector(`#candidateCount${number}`)
    countElement.innerHTML = candidateCount;
}