import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LanguageButton from "../src/components/LanguageButton";

export default function HomeTab() {
  const { city } = useLocalSearchParams<{ city: string }>();
  return (
    <View style={styles.container}>
      <LanguageButton />
      <Text style={styles.welcomeText}>
        {city ? `Welcome to ${city}!` : "Welcome!"}
      </Text>

      {/* TODO: Add main content here, e.g., list of pulses, experiences */}
      <Text style={styles.placeholder}>Main content goes here...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: "#555",
    marginTop: 16,
  },
});
