import { Text, FlatList } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";

export function HomeScreen() {
  return (
    <Screen style={{backgroundColor:'black'}}>
      <Text style={tw`mb-4 text-white`}>
        You'll find several examples of how to build xNFTs using react-native:
      </Text>
    </Screen>
  );
}
