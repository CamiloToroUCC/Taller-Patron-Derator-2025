// src/app/models/risk-calculator.interface.ts
export interface Investment {
  amount: number;
  marketVolatility: number;
  liquidity: number;
  riskProfile: number; 
}

export interface RiskCalculator {
  calculateRisk(investment: Investment): number;
}
