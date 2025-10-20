import { useMemo, useState } from "react";
import { CalculatorInputs } from "../models/InvestmentTypes";
import { QUERY_KEYS } from "../queries/keys";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestCdi } from "../api/cdi";
import { calcCdb, calcLci, incomeTaxPercent, periodToYears, savingsYieldAmount } from "../utils/financial";
import { InvestmentResult } from "../models/ResultTypes";

/**
 * ViewModel (hook) que encapsula a lógica:
 * - busca CDI via React Query
 * - mantém estados dos inputs
 * - calcula resultados para Poupança, CDB, LCI/LCA
 */

export const useCalculatorViewModel = (initial?: Partial<CalculatorInputs>) => {
  const [principal, setPrincipal] = useState<number>(initial?.principal ?? 1000);
  const [periodAmount, setPeriodAmount] = useState<number>(initial?.periodAmount ?? 12);
  const [periodUnit, setPeriodUnit] = useState<'days' | 'months' | 'years'>(initial?.periodUnit ?? 'months');
  const [rentabilityType, setRentabilityType] = useState<'pos' | 'pre'>(initial?.rentabilityType ?? 'pos');
  const [cdiPercentLocal, setCdiPercentLocal] = useState<number | null>(initial?.cdiPercent ?? null);
  const [cdbPercent, setCdbPercent] = useState<number>(initial?.cdbPercent ?? 100);
  const [lciPercent, setLciPercent] = useState<number>(initial?.lciPercent ?? 100);


  // React Query para buscar CDI do BCB
  const { data: cdiFromApi, isLoading: cdiLoading } = useQuery({
    queryKey: QUERY_KEYS.CDI,
    queryFn: async () => {
      const result = await fetchLatestCdi();
      // só preenche o campo se usuário não alterou manualmente
      if (cdiPercentLocal === null) setCdiPercentLocal(result);
      return result;
    },
  });

  const cdiPercent = cdiPercentLocal ?? cdiFromApi ?? 0;

  // períodos
  const years = periodToYears(periodAmount, periodUnit);
  const days = periodUnit === 'days' ? periodAmount : Math.round(years * 365);

  // cálculos (memoizados)
  const results = useMemo(() => {
    //Poupança
    const s = savingsYieldAmount(principal, years);
    const savingsGross = s.grossYield;
    const savingsIOFPercent = days < 30 ? (/* compute IOF */ 0) : 0;

    // For simplicity, we will use IOF function from utils if needed (not imported here)
    const savingsResult: InvestmentResult = {
      name: 'Poupança',
      invested: principal,
      grossYield: Number(savingsGross.toFixed(2)),
      iof: 0,
      incomeTax: 0,
      netYield: Number(savingsGross.toFixed(2)),
      totalNet: Number(s.final.toFixed(2)),
      profitPercent: (savingsGross / principal) * 100,
    }


    // CDB
    const cdb = calcCdb(principal, years, cdiPercent, cdbPercent, days);
    const cdbResult: InvestmentResult = {
      name: 'CDB',
      invested: principal,
      grossYield: Number(cdb.grossYield.toFixed(2)),
      iof: Number(cdb.iof.toFixed(2)),
      incomeTax: Number(cdb.incomeTax.toFixed(2)),
      netYield: Number(cdb.netYield.toFixed(2)),
      totalNet: Number(cdb.totalNet.toFixed(2)),
      profitPercent: Number(cdb.profitPercent.toFixed(2)),
    };

    // LCI / LCA
    const lci = calcLci(principal, years, cdiPercent, lciPercent, days);
    const lciResult: InvestmentResult = {
      name: 'LCI / LCA',
      invested: principal,
      grossYield: Number(lci.grossYield.toFixed(2)),
      iof: Number(lci.iof.toFixed(2)),
      incomeTax: 0,
      netYield: Number(lci.netYield.toFixed(2)),
      totalNet: Number(lci.totalNet.toFixed(2)),
      profitPercent: Number(lci.profitPercent.toFixed(2)),
    };
    return {
      results: [savingsResult, cdbResult, lciResult],
    };
  }, [principal, years, cdiPercent, cdbPercent, lciPercent, days]);

  return {
    // inputs
    principal, setPrincipal,
    periodAmount, setPeriodAmount,
    periodUnit, setPeriodUnit,
    rentabilityType, setRentabilityType,
    cdiPercent, setCdiPercentLocal,
    cdbPercent, setCdbPercent,
    lciPercent, setLciPercent,

    // query
    cdiLoading,

    // outputs
    results: results.results as InvestmentResult[],
  }
}