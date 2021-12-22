/*
This will be responsible for adding some padding and margin on our components...
*/

//Components/Container.js
import React from "react";
import { ScrollView, View } from "react-native";

export function Container({ style, children }) {
  return (
    <ScrollView>
      <View style={[{ padding: 20 }, style]}>{children}</View>
    </ScrollView>
  );
}

//Contacts.js
import { Text, View } from "react-native";
import React from "react";
import { Container } from "../components/Container";

export const Contacts = () => {
  return (
    <Container style={{ padding: 100 }}>
      <Text>Hi, from contacts</Text>
    </Container>
  );
};
