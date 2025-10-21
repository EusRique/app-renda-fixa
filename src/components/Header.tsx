import React from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type HeaderProps = {
  scrollY: Animated.Value;
};

export const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.container, { opacity: headerOpacity }]}>
      <AntDesign name="line-chart" size={22} color="#fff" style={{ marginLeft: 0 }} />
      <Text style={styles.title}>
        {/* Renda Fixa <Text style={styles.pro}>PRO</Text> */}
        Investe Certo
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 100 : 80,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  pro: {
    color: "#22c55e",
    fontWeight: "bold",
  },
});
