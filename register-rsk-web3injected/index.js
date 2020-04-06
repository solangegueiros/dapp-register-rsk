// Source code to interact with smart contract

//connection with node
//var web3 = new Web3(new Web3.providers.HttpProvider('https://public-node.testnet.rsk.co:4444/'));
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  window.ethereum.enable()
}
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
}
else {
  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log (window.web3.currentProvider)


// contractAddress and abi are setted after contract deploy
var contractAddress = '0xAbf7171D4D0f156F3D2a9A671C65e15031220711';
var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Ocorreu um erro ao buscar suas contas.");
    return;
  }
  if (accounts.length == 0) {
    alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function registerSetInfo() {
  info = $("#newInfo").val();
  contract.methods.setInfo (info).send( {from: account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
  $("#newInfo").val('');
}

function registerGetInfo() {
  contract.methods.getInfo().call().then( function( info ) { 
    console.log("info: ", info);
    document.getElementById('lastInfo').innerHTML = info;
  });    
}
