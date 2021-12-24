import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {AppContainer} from '../components/AppContainer';
import {AppTextInput} from '../components/AppTextInput';
import {AppButton} from '../components/AppButton';

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
      <AppButton title="Submit" loading={true} disabled={true} secondary />
      <AppButton title="Click Me" primary />
      <AppButton title="Submit" secondary />
      <AppButton title="Register" danger />
    </AppContainer>
  );
};
