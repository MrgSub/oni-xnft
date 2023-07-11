import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";

import { ExamplesScreens } from "./screens/ExamplesScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { TokenListNavigator } from "./screens/TokenNavigator";
import {MintNFTs} from "./screens/MintScreen";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useMemo, useState} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {MetaplexProvider} from "./MetaplexProvider";
import {UnsafeBurnerWalletAdapter, PhantomWalletAdapter, BackpackWalletAdapter} from "@solana/wallet-adapter-wallets";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={TokenListNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Tokens",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Examples"
        component={MintNFTs}
        options={{
          tabBarLabel: "Examples",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [network, setNetwork] = useState();
  const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet)
    let [fontsLoaded] = useFonts({
    Inter_900Black,
  });


    const wallets = [
        new BackpackWalletAdapter(),
        new UnsafeBurnerWalletAdapter(),
        new PhantomWalletAdapter(),
    ]

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider autoConnect={true} wallets={wallets}>
          <MetaplexProvider>

        <RecoilRoot>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </RecoilRoot>

          </MetaplexProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default registerRootComponent(App);
