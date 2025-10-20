import { PeriodUnit } from '../models/InvestmentTypes';

// Converte período (days/months/years) para fração de ano.
export function periodToYears(amount: number, unit: PeriodUnit) {
  if (unit === 'years') return amount;
  if (unit === 'months') return amount / 12;
  if (unit === 'days') return amount / 252; // dias úteis ou 365 todo ano?
  return amount;
}

/**
 * Calcula rendimento composto com taxa anual (percent).
 * annualPercent: 14.9 -> significa 14.9% a.a.
 * rateMultiplier: para investimentos atrelados ao CDI, passe (cdbPercent/100)
 *
 * Fórmula (composto anual):
 * final = principal * (1 + (annualPercent/100) * rateMultiplier) ^ years
 * (esta é uma aproximação; se quiser daily-compounding usar convenção de dias úteis)
 */
export function compoundYieldAmount(principal: number, annualPercent: number, rateMultiplier: number, years: number) {
  const efRate = (annualPercent / 100) * rateMultiplier;
  const final = principal * Math.pow((1 + efRate), years);
  const grossYield = final - principal;
  return { final, grossYield };
}

/**
 * Poupança - implementação simplificada:
 * - Poupança rende 0.5% ao mês quando a regra é esta (isso é simplificado).
 * - Melhor usar regra específica da poupança se quiser precisão.
 */
export function savingsYieldAmount(principal: number, years: number) {
  const monthlyRate = 0.005; // 0.5% ao mês (aprox)
  const moths = Math.round(years * 12);
  const final = principal * Math.pow((1 + monthlyRate), moths);
  const grossYield = final - principal;
  return { final, grossYield };
}

/**
 * Imposto de Renda (tabela regressiva para renda fixa)
 * - Até 180 dias: 22.5%
 * - 181 a 360: 20%
 * - 361 a 720: 17.5%
 * - Acima de 720: 15%
 */
export  function incomeTaxPercent(days: number) {
  if (days <= 180) return 22.5;
  if (days < 360) return 20;
  if (days < 720) return 17.5;
  return 15;
}

/**
 * IOF regressivo para resgates em menos de 30 dias.
 * - Regra prática: IOF decresce de ~96% no dia 1 até 0% no dia 30.
 *   um modelo linear aproximado que segue os pontos comumente divulgados:
 *   dia 1 ≈ 96%, dia 15 ≈ 50%, dia 29 ≈ 3%, dia 30 ≈ 0%.
 * Implementação: se days >= 30 => 0, else aproximamos:
 */
export function iofPercent(days: number) {
  if (days >= 30) return 0;
  // linear interpolation between (1,96) and (30,0): slope = (0-96)/(29) ≈ -3.3103
  const slope = -96 / 29;
  // note: day 1 -> ~96, day 29 -> small positive
  const val = 96 + (days - 1) * slope;
  return Math.max(0, Number(val.toFixed(2)));
}

/**
 * Calcula resultados (Poupança, CDB, LCI/LCA).
 *
 * Assumptions:
 * - CDB/LCI atrelados ao CDI: cdiPercent é o CDI anual (ex: 14.9)
 * - cdbPercent/lciPercent são frações do CDI (ex: 100 -> 100% do CDI).
 * - Para LCI/LCA, não há IR (geralmente isentos), mas podem ter IOF se <30 dias.
 */
export function calcCdb(principal: number, years: number, cdiPercent: number, cdbPercent: number, days: number) {
  const { final, grossYield } = compoundYieldAmount(principal, cdiPercent, cdbPercent / 100, years);
  const irPercent = incomeTaxPercent(days);
  const ir = (grossYield * irPercent) / 100;

  const iofP = iofPercent(days);
  // IOF é sobre o rendimento (similar ao IR)
  const iof = (grossYield * iofP) / 100;

  const netYield = grossYield - ir - iof;
  const totalNet = principal + netYield;
  const profitPercent = (netYield / principal) * 100;

  return {
    final,
    grossYield,
    incomeTax: ir,
    iof,
    netYield,
    totalNet,
    profitPercent,
  };
}

export function calcLci(principal: number, years: number, cdiPercent: number, lciPercent: number, days: number) {
  const { final, grossYield } = compoundYieldAmount(principal, cdiPercent, lciPercent / 100, years);

  const iofP = iofPercent(days);
  const iof = (grossYield * iofP) / 100;

  const netYield = grossYield - iof; // sem IR
  const totalNet = principal + netYield;
  const profitPercent = (netYield / principal) * 100;

  return {
    final,
    grossYield,
    incomeTax: 0,
    iof,
    netYield,
    totalNet,
    profitPercent,
  };
}