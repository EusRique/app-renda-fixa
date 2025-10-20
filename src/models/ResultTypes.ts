export type InvestmentResult = {
  name: string;
  invested: number;
  grossYield: number;
  iof: number;
  incomeTax: number;
  netYield: number; // rendimento líquido
  totalNet: number; // invested + netYield
  profitPercent: number; // netYield / invested * 100
};