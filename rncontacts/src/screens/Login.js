import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {AppContainer} from '../components/AppContainer';
import {AppTextInput} from '../components/AppTextInput';

export const Login = () => {
  const [text, setText] = useState(null);
  const handleChangeText = (text) => {
    setText(text);
  };
  return (
    <AppContainer>
      <AppTextInput
        label="Username"
        handleChangeText={handleChangeText}
        value={text}
      />
      <AppTextInput
        label="Password"
        handleChangeText={handleChangeText}
        value={text}
        icon={<Text>Hide</Text>}
        iconPosition="Right"
      />
    </AppContainer>
  );
};
