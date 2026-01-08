// app/(tabs)/_layout.tsx
import Colors from "@/assets/colors";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useCityStore } from "@/src/store/useCityStore";
import { Tabs, useSegments } from "expo-router";
import React, { useEffect } from "react";


export default function TabLayout() {
  const segments = useSegments();
  const setCity = useCityStore((s) => s.setCity);

  useEffect(() => {
    // @ts-ignore
    if (segments[0] === "(tabs)" && segments[1] === "index") {
      setCity(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // hide top header
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 85,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: Colors.primaryDark,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: Colors.accentSkyBlue,
        tabBarInactiveTintColor: Colors.primaryLightest + "90", // 60% opacity
        tabBarIconStyle: { marginBottom: 6 },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
            console.log("Explore tab pressed again → reset city");
            useCityStore.getState().setCity(null);
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />

    </Tabs>
  );
}
