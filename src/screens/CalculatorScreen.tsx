import {
  ActivityIndicator,
  View,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { useCalculatorViewModel } from "../viewmodels/useCalculatorViewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import { InputsGroup } from "../components/InputsGroup";
import { InvestmentCard } from "../components/InvestmentCard";
import { Header } from "../components/Header";

export default function CalculatorScreen() {
  const vm = useCalculatorViewModel();
  const scrollY = useRef(new Animated.Value(0)).current;

  if (vm.cdiLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header scrollY={scrollY} />
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 120, paddingBottom: 40 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ paddingHorizontal: 16 }}>
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
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Fundo escuro elegante
  },
});
