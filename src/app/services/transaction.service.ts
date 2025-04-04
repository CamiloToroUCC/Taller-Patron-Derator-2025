// src/app/services/transaction.service.ts
export interface Transaction {
  execute(): string;
}

export class BasicTransaction implements Transaction {
  execute(): string {
    return "Basic Transaction Executed";
  }
}

export abstract class TransactionDecorator implements Transaction {
  protected transaction: Transaction;
  
  constructor(transaction: Transaction) {
    this.transaction = transaction;
  }
  
  execute(): string {
    return this.transaction.execute();
  }
}

export class InvestTransactionDecorator extends TransactionDecorator {
  private asset: { symbol: string, name: string, price: string, change: string, riskScore: number };
  
  constructor(transaction: Transaction, asset: { symbol: string, name: string, price: string, change: string, riskScore: number }) {
    super(transaction);
    this.asset = asset;
  }
  
  override execute(): string {
    return `Inversión en ${this.asset.name} (${this.asset.symbol}) realizada con éxito a un precio de ${this.asset.price}.`;
  }
}
