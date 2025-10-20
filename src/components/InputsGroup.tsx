import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useState } from "react";
import { SelectModal } from "./SelectModal"

type Props = {
  principal: number;
  onChangePrincipal: (v: number) => void;
  periodAmount: number;
  onChangePeriodAmount: (v: number) => void;
  periodUnit: "days" | "months" | "years";
  onChangePeriodUnit: (v: "days" | "months" | "years") => void;
  profitabilityType: "pos" | "pre";
  setProfitabilityType: (value: "pos" | "pre") => void;
  cdiPercent: number;
  onChangeCdi: (v: number) => void;
  cdbPercent: number;
  onChangeCdbPercent: (v: number) => void;
  lciPercent: number;
  onChangeLciPercent: (v: number) => void;
};

export function InputsGroup(props: Props) {
  const [periodModalVisible, setPeriodModalVisible] = useState(false);
  const [profitModalVisible, setProfitModalVisible] = useState(false);

  const periodOptions = [
    { label: "Dias", value: "days" },
    { label: "Meses", value: "months" },
    { label: "Anos", value: "years" },
  ];

  const profitOptions = [
    { label: "Pós-fixado", value: "pos" },
    { label: "Pré-fixado", value: "pre" },
  ];

  return (
    <View>
      <Text>Valor do Investimento</Text>
      <TextInput
        value={String(props.principal)}
        onChangeText={(t) => props.onChangePrincipal(Number(t || 0))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Período</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <TextInput
          value={String(props.periodAmount)}
          onChangeText={(t) => props.onChangePeriodAmount(Number(t || 0))}
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity
          style={[styles.input, { flex: 1, justifyContent: "space-between", flexDirection: "row", alignItems: "center", gap: 4 }]}
          onPress={() => setPeriodModalVisible(true)}
        >
          <Text style={{ color: props.periodUnit ? "#000" : "#999" }}>
            {periodOptions.find((o) => o.value === props.periodUnit)?.label ||
              "Selecione"}
          </Text>
          <Ionicons name="arrow-down" size={10} color="#900" />
        </TouchableOpacity>
      </View>

      <SelectModal
        visible={periodModalVisible}
        options={periodOptions}
        selectedValue={props.periodUnit}
        onSelect={(v) => props.onChangePeriodUnit(v as "days" | "months" | "years")}
        onClose={() => setPeriodModalVisible(false)}
        title="Selecione o período"
      />

      <Text>Tipo de Rentabilidade</Text>
      {props.profitabilityType === "pos" ? (
        <Text style={{ fontSize: 12, color: "gray", marginTop: 4 }}>
          Rendem de acordo com uma porcentagem do CDI.{"\n"}
          Estamos considerando o CDI como {props.cdiPercent}%.
        </Text>
      ) : (
        <Text style={{ fontSize: 12, color: "gray", marginTop: 4 }}>
          Rendem conforme uma taxa fixa combinada no momento da compra.
        </Text>
      )}

      <TouchableOpacity
        style={[styles.input, { justifyContent: "center" }]}
        onPress={() => setProfitModalVisible(true)}
      >
        <Text style={{ color: props.profitabilityType ? "#000" : "#999" }}>
          {profitOptions.find((o) => o.value === props.profitabilityType)?.label ||
            "Selecione"}
        </Text>
      </TouchableOpacity>

      <SelectModal
        visible={profitModalVisible}
        options={profitOptions}
        selectedValue={props.profitabilityType}
        onSelect={(v) => props.setProfitabilityType(v as "pre" | "pos")}
        onClose={() => setProfitModalVisible(false)}
        title="Selecione o tipo de rentabilidade"
      />

      <Text>Taxa do CDI (%)</Text>
      <TextInput
        value={String(props.cdiPercent)}
        onChangeText={(t) => props.onChangeCdi(Number(t || 0))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Rentabilidade CDB</Text>
      <TextInput
        value={String(props.cdbPercent)}
        onChangeText={(t) => props.onChangeCdbPercent(Number(t || 0))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Rentabilidade LCI/LCA</Text>
      <TextInput
        value={String(props.lciPercent)}
        onChangeText={(t) => props.onChangeLciPercent(Number(t || 0))}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "99%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 6,
    marginVertical: 8,
  },
});
