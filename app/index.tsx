import Colors from "@/assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LanguageButton from "../src/components/LanguageButton";



export default function IntroPage() {
  const { t } = useTranslation();
  const [imagesRequested, setImagesRequested] = useState(false);
  const videoRef = useRef<Video>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setImagesRequested(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!imagesRequested) return null;

  return (
    <View style={styles.container}>

      {/* Top half: Video */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={require("../assets/videos/Intro.mp4")}
          style={styles.video}
          //@ts-ignore
          resizeMode="cover"
          shouldPlay
          isLooping
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          isMuted={true}
        />

        {loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
        {/* Gradient overlay at the bottom of the video */}
        <LinearGradient
          colors={["rgba(0,0,0,0)", "#1a2c32"]} // transparent top -> solid #1a2c32 bottom
          style={styles.gradientOverlay}
        />
      </View>


      {/* Bottom: Content */}
      {
        !loading && (
          <View style={styles.contentContainer}>
            <LanguageButton />

            <Text style={styles.title}>PulseSpot</Text>
            <Text style={styles.subtitle}>
              {t("discover") || "Discover the best experiences in your city"}
            </Text>

            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.ctaText}>{t("begin") || "Begin"}</Text>
              <FontAwesome name="arrow-right" size={20} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    flex: 1.5, // 2/3 of screen
  },
  video: {
    flex: 1,
    width: "100%",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 190, // adjust how much of the video blends into the background
  },
  contentContainer: {
    flex: 1, // 1/3 of screen
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.primaryLightest,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 20,
    color: Colors.primaryLightest,
    textAlign: "center",
    marginBottom: 50,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryLight,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  ctaText: {
    color: Colors.lightGray,
    fontSize: 18,
    fontWeight: "bold",
  },
});
