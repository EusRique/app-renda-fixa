import { View, Text, StyleSheet } from "react-native";
import { InvestmentResult } from "../models/ResultTypes";

export function InvestmentCard({ r }: { r: InvestmentResult }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{r.name}</Text>
      <Text>Valor Investido: R$ {r.invested.toFixed(2)}</Text>
      <Text>Rendimento Bruto: R$ {r.grossYield.toFixed(2)}</Text>
      {r.incomeTax > 0 && (
        <Text>Imposto de Renda: R$ {r.incomeTax.toFixed(2)}</Text>
      )}
      {r.iof > 0 && <Text>IOF: R$ {r.iof.toFixed(2)}</Text>}
      <Text>Rendimento Líquido: R$ {r.netYield.toFixed(2)}</Text>
      <Text>Valor Total Líquido: R$ {r.totalNet.toFixed(2)}</Text>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${Math.min(100, Math.max(0, r.profitPercent))}%` },
          ]}
        />
      </View>
      <Text style={styles.percent}>{r.profitPercent.toFixed(2)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  title: {
    fontWeight: "700",
    marginBottom: 6,
  },

  barBackground: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginTop: 8,
    overflow: "hidden",
  },

  barFill: {
    height: 6,
    backgroundColor: "#6cbf6c",
  },

  percent: {
    marginTop: 6,
    fontSize: 12,
    color: "#333",
  },
});
