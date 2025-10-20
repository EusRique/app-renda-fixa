import { ActivityIndicator, View, ScrollView } from "react-native";
import { useCalculatorViewModel } from "../viewmodels/useCalculatorViewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { InputsGroup } from "../components/InputsGroup";
import { InvestmentCard } from "../components/InvestmentCard";

export default function CalculatorScreen() {
  const vm = useCalculatorViewModel();

  if (vm.cdiLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollView style={{ padding: 16 }}>
        <InputsGroup
          principal={vm.principal}
          onChangePrincipal={vm.setPrincipal}
          periodAmount={vm.periodAmount}
          onChangePeriodAmount={vm.setPeriodAmount}
          periodUnit={vm.periodUnit}
          setProfitabilityType={vm.setRentabilityType}
          profitabilityType={vm.rentabilityType}
          onChangePeriodUnit={vm.setPeriodUnit}
          cdiPercent={vm.cdiPercent}
          onChangeCdi={vm.setCdiPercentLocal}
          cdbPercent={vm.cdbPercent}
          onChangeCdbPercent={vm.setCdbPercent}
          lciPercent={vm.lciPercent}
          onChangeLciPercent={vm.setLciPercent}
        />

        <View style={{ marginTop: 16, width: "99%" }}>
          {vm.results.map((r) => (
            <InvestmentCard key={r.name} r={r} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
