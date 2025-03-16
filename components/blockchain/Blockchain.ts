// or any files within the Snack
import Transaction from './Transaction';
import Block from './Block';

export default class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  /**
   * @returns {Block}
   */
  private createGenesisBlock() {
    return new Block(Date.now(), [new Transaction("genesis", "genesis", 1000)], "0");
  }

  /**
   * Add a new transaction to the list of pending transactions (to be added
   * next time the mining process starts). This verifies that the given
   * transaction is properly signed.
   *
   * @param {Transaction} transaction
   */
  addBlock(newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  /**
   * Returns the latest block on our chain. Useful when you want to create a
   * new Block and you need the hash of the previous Block.
   *
   * @returns {Block[]}
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /** 
   * Mine all pending transactions. This is called by the miner to create a
   * new block of valid transactions.
   */
  minePendingTransactions(miningRewardAddress: string) {
    let block = new Block(Date.now(), [this.pendingTransactions[0]]);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  /**
   * Add a new transaction to the list of pending transactions (to be added
   * next time the mining process starts). This verifies that the given
   * transaction is properly signed.
   *
   * @param {Transaction} transaction
   */
  createTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  /**
   * Returns the balance of a given wallet address.
   *
   * @param {string} address
   * @returns {number} The balance of the wallet
   */
  getBalanceOfAddress(address: string) {
    let balance = 0; // you start at zero!
    // Loop over each block and each transaction inside the block
    for (const block of this.chain) {
      for (const trans of block.transactions){
        // If the given address is the sender -> reduce the balance
        if(trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if(trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  /**
   * Check if the chain is valid by checking if all the hashes are correct
   *
   * @returns {boolean}
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
