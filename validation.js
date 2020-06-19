'use strict';

const { createHash } = require('crypto');
const signing = require('./signing');

/**
 * A simple validation function for transactions. Accepts a transaction
 * and returns true or false. It should reject transactions that:
 *   - have negative amounts
 *   - were improperly signed
 *   - have been modified since signing
 */
const isValidTransaction = (transaction) => {
  // Enter your solution here
  const  toSign = transaction.source
                + transaction.recipient
                 + transaction.amount;
                 
    if (transaction.amount < 0) 
      return false;
    else
    return signing.verify(transaction.source, toSign, transaction.signature);
};
      
    



/**
 * Validation function for blocks. Accepts a block and returns true or false.
 * It should reject blocks if:
 *   - their hash or any other properties were altered
 *   - they contain any invalid transactions
 */
const isValidBlock = (blockchain) => {
  // Your code here
  if (!blockchain.genesisBlock) 
  return false;
  return true;

 /** transaction.source = signing.getPublicKey(signing.createPrivateKey());
  return validation.isValidTransaction(transaction);
  //const T= block.signature.verify(nonce.previousHash);
  //const TT =block.previousHash;

  const transactionString = block.transactions.map(t => t.signature).join('');
  const toHash = block.previousHash + transactionString + block.nonce;
//3) should return false when tampering with calculateHash


  if (block.hash !== createHash('sha512').update(toHash).digest('hex')) {
    return false;}
    
  return block.transactions.every(isValidTransaction);**/
  

};

/**
 * One more validation function. Accepts a blockchain, and returns true
 * or false. It should reject any blockchain that:
 *   - is a missing genesis block
 *   - has any block besides genesis with a null hash
 *   - has any block besides genesis with a previousHash that does not match
 *     the previous hash
 *   - contains any invalid blocks
 *   - contains any invalid transactions
 */
const isValidChain = blockchain => {
  // Your code here
  const { blocks } = blockchain;

  if (blocks[0].previousHash !== null) {
    return false;
  }
  if (blocks.slice(1).some((b, i) => b.previousHash !== blocks[i].hash)) {
    return false;
  }

  if (blocks.some(b => !isValidBlock(b))) {
    return false;
  }

  return blocks
    .map(b => b.transactions)
    .reduce((flat, txns) => flat.concat(txns), [])
    .every(isValidTransaction);
};



/**
 * This last one is just for fun. Become a hacker and tamper with the passed in
 * blockchain, mutating it for your own nefarious purposes. This should
 * (in theory) make the blockchain fail later validation checks;
 */
const breakChain = blockchain => {
  // Your code here

};

module.exports = {
  isValidTransaction,
  isValidBlock,
  isValidChain,
  breakChain
};
