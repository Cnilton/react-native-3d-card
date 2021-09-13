import React, {FunctionComponent, useRef, useState} from 'react';
import {TouchableOpacity, ScrollView, Text, TextInput} from 'react-native';
import {CreditCard3D} from 'react-native-3d-card';

const Example: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [valid, setValid] = useState('');
  const [cvv, setCVV] = useState('');

  const cardRef = useRef<any>(null);

  function rotateBackward() {
    cardRef?.current?.rotateBackward();
  }

  function rotateForward() {
    cardRef?.current?.rotateForward();
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 16}}>
      <CreditCard3D
        numberValue={number}
        nameValue={name}
        cvvValue={cvv}
        expiracyValue={valid}
        ref={cardRef}
      />
      <TextInput
        placeholder="Número do cartão"
        maxLength={number.includes(' ') ? 19 : 16}
        style={{
          marginTop: 16,
          borderColor: '#c1c2c3',
          padding: 8,
          borderRadius: 8,
          borderWidth: 1,
          marginBottom: 10,
        }}
        value={number}
        onChangeText={value => setNumber(value)}
      />
      <TextInput
        placeholder="Nome"
        style={{
          textTransform: 'capitalize',
          borderColor: '#c1c2c3',
          padding: 8,
          borderRadius: 8,
          borderWidth: 1,
          marginBottom: 10,
        }}
        value={name}
        onChangeText={value => {
          setName(value);
        }}
      />
      <TextInput
        placeholder="Valid thru"
        style={{
          textTransform: 'capitalize',
          borderColor: '#c1c2c3',
          padding: 8,
          borderRadius: 8,
          borderWidth: 1,
          marginBottom: 10,
        }}
        value={valid}
        onChangeText={value => {
          setValid(value);
        }}
      />
      <TextInput
        onFocus={() => {
          rotateBackward();
        }}
        onBlur={() => {
          rotateForward();
        }}
        maxLength={4}
        placeholder="CVV"
        style={{
          borderColor: '#c1c2c3',
          padding: 8,
          borderRadius: 8,
          borderWidth: 1,
        }}
        value={cvv}
        onChangeText={value => setCVV(value)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#c1ccff',

          elevation: 2,
          alignSelf: 'center',
          borderRadius: 8,
          width: 130,
          height: 40,
          marginTop: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => rotateBackward()}>
        <Text style={{color: '#333345'}}>Rotate Backward</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#c1ccff',
          elevation: 2,
          alignSelf: 'center',
          borderRadius: 8,
          width: 130,
          marginTop: 16,
          height: 40,
        }}
        onPress={() => rotateForward()}>
        <Text style={{color: '#333345'}}>Rotate Forward</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Example;
