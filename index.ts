// Transfer of funds between two wallets
import * as crypto from "crypto";

class Transaction {
  constructor(
      public amount: number,
      public payer: string, // public key
      public payee: string // public key
  ) {}

  toString() {
    return JSON.stringify(this);
  }
}

// Individual block on the chain
class Block {
  constructor(
      public prevHash: string,
      public transaction: Transaction,
      public ts = Date.now()
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}

// The blockchain
class Chain {
  // Singleton instance
  public static instance = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [
      // Genesis block
      new Block('', new Transaction(100, 'genesis', 'satoshi'))
    ];
  }

  // Most recent block
  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Add a new block to the chain if has valid signature
  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
    const verify = crypto.createVerify('SHA256');
    verify.update(transaction.toString());

    const isValid = verify.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.chain.push(newBlock);
    }
  }
}

// Wallet gives a user a public/private keypair
class Wallet {
  // ...
}
