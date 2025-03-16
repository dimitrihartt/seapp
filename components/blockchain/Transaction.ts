import Elliptic from 'elliptic';
import Crypto from 'crypto-js';

const ec = new Elliptic.ec('secp256k1');

export default class Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;  

  /**
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {number} amount
   */
  constructor(fromAddress: any, toAddress: any, amount: any) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;    
  }

  /**
   * Creates a SHA256 hash of the transaction
   *
   * @returns {string}
   */
  calculateHash() {
    return Crypto.SHA256(
          this.fromAddress + 
          this.toAddress + 
          this.amount         
        ).toString();
  }

  /**
   * Checks if the signature is valid (transaction has not been tampered with).
   * It uses the fromAddress as the public key.
   *
   * @returns {boolean}
   */
  isValid() {
    // If the transaction doesn't have a from address we assume it's a
    // mining reward and that it's valid. You could verify this in a
    // different way (special field for instance)
    if (this.fromAddress === null) return true;    
  }
}

module.exports.Transaction = Transaction;
