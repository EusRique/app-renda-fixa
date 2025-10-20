export type PeriodUnit = 'days' | 'months' | 'years';

export type RentabilityType = 'pos' | 'pre';

export type CalculatorInputs = {
  principal: number; // valor investido
  periodAmount: number; // quantidade de períodos
  periodUnit: PeriodUnit // unidade de tempo (dias, meses, anos)
  rentabilityType: RentabilityType; // pós-fixado ou pré-fixado
  cdiPercent: number; // ex: 14.9 (anual)
  cdbPercent: number; // ex: 100 -> 100% do CDI
  lciPercent: number; // ex: 100 -> 100% do CDI
}