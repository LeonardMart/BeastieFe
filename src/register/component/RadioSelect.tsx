import React from 'react';
import { StyleSheet, View } from 'react-native';

import RadioButton from '../../../node_modules/react-native-radio-buttons-group/lib/RadioButton';
import { RadioGroupProps } from '../../../node_modules/react-native-radio-buttons-group/lib/types';
import RadioSelectButton from './RadioSelectButton';

export default function RadioSelect({
  accessibilityLabel,
  containerStyle,
  labelStyle,
  layout = 'column',
  onPress,
  radioButtons,
  selectedId,
  testID
}: RadioGroupProps) {

  function handlePress(id: string) {
    if (id !== selectedId) {
      if (onPress) {
        onPress(id);
      }
      const button = radioButtons.find(rb => rb.id === id);
      if (button?.onPress) {
        button.onPress(id);
      }
    }
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="radiogroup"
      style={[styles.container, { flexDirection: layout }, containerStyle]}
      testID={testID}
    >
      {radioButtons.map((button) => (
        <RadioSelectButton
          {...button}
          key={button.id}
          labelStyle={button.labelStyle || labelStyle}
          selected={button.id === selectedId}
          onPress={handlePress}
        />
      ))}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '100%'
  }
});
