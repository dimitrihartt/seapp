// or any files within the Snack
import Crypto from 'crypto-js';
import Transaction from './Transaction';

export default class Block {    
  timestamp: number;
  transactions: [Transaction];
  previousHash: string;
  hash: string;
  nonce: number;

  /**
   * @param {number} timestamp
   * @param {Transaction[]} transactions
   * @param {string} previousHash
   */
  constructor(timestamp: number, transactions: [Transaction], previousHash = '') {    
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  /**
   * Returns the SHA256 of this block (by processing all the data stored
   * inside this block)
   *
   * @returns {string}
   */

  calculateHash() {
    return Crypto.SHA256(      
      this.timestamp + 
      JSON.stringify(this.transactions) + 
      this.previousHash + 
      this.nonce
    ).toString();
  }

  mineBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('BLOCK MINED: ' + this.hash + ' with nonce: ' + this.nonce);
  }

}
