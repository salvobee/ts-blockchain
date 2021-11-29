// Transfer of funds between two wallets
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
  // ...
}

// The blockchain
class Chain {
  // ...
}

// Wallet gives a user a public/private keypair
class Wallet {
  // ...
}
