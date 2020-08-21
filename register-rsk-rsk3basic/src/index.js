import Rsk3 from '@rsksmart/rsk3';

//connection with node
const rsk3 = new Rsk3(new Rsk3.providers.HttpProvider("http://localhost:4444"));

// contractAddress and abi are setted after contract deploy
var contractAddress = '0x8D547c1A322C4fE727B9947a97903d4622Fd2b88';
var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );

//contract instance
let contract = new rsk3.Contract(abi, contractAddress);
console.log('Contract: ' + contract.address);

// Accounts
let account;
rsk3.getAccounts(function(err, accounts) {
  if (err == true) {
    console.log('Account Error: ' + err);
    alert("Error: get accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Check if the node is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  rsk3.defaultAccount = account;
});

//Smart contract functions
  
function registerGetInfo() {
  contract.methods.getInfo().call().then( function( info ) { 
    console.log("getInfo: ", info);
    document.getElementById('lastInfo').innerHTML = info;
  });    
}

function registerSetInfo() {  
  var element = document.getElementById('newInfo_input');
  //console.log("element: ", element);
  var info = element.value;
  console.log("newInfo: ", info);
  contract.methods.setInfo (info).send( {from: account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
  element.value = "";
}

//Blockchain function
async function fetchLatestBlockHeight() {
  const blockHeight = await rsk3.getBlockNumber();
  console.log("blockHeight: ", blockHeight);
  const element = document.getElementById('lastBlock');
  element.innerText = `Latest Block: ${blockHeight}`;
}

function main() {
  const blockHeightButton = document.getElementById('block_height_button');
  blockHeightButton.onclick = fetchLatestBlockHeight;

  const registerGetInfoButton = document.getElementById('registerGetInfo_button');
  registerGetInfoButton.onclick = registerGetInfo;

  const registerSetInfoButton = document.getElementById('registerSetInfo_button');
  registerSetInfoButton.onclick = registerSetInfo;
}

main();