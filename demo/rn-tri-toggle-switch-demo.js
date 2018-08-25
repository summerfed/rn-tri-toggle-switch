import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import TriStateToggleSwitch from '../src/index.js';

const choice1 = [
  {
    choiceCode: 'Yes',
    choiceText: 'Yes'
  },
  {
    choiceCode: 'No',
    choiceText: 'No'
  }
];

const choice2 = [
  {
    choiceCode: 'Y',
    choiceText: 'Y'
  },
  {
    choiceCode: 'N',
    choiceText: 'N'
  }
];

const choice3 = [
  {
    choiceCode: 'ON',
    choiceText: 'ON'
  },
  {
    choiceCode: 'OFF',
    choiceText: 'OFF'
  }
];

const choice4 = [
  {
    choiceCode: 'ON',
    choiceText: 'Switch On',
    testData: 'You can put anything inside JSON'
  },
  {
    choiceCode: 'OFF',
    choiceText: 'Switch Off',
    extraData: 'Extra Data'
  }
];

const choice5 = [
  {
    choiceCode: 'ON',
    choiceText: 'Y'
  },
  {
    choiceCode: 'OFF',
    choiceText: 'N'
  }
];

export default class TriStateToggleSwitchDemo extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to {'\n'} React Native Tri State Toggle Switch!
        </Text>
        <View
          style={{
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 70
          }}
        >
          <Text>Default Styling - 120 x 24 </Text>
          <View style={{ padding: 5 }}>
            <TriStateToggleSwitch choices={choice1}/>
          </View>
        </View>

        <View
          style={{
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 150
          }}
        >
          <Text>Custom Style - 200 x 40 </Text>
          <View style={{ padding: 5 }}>
            <TriStateToggleSwitch 
              width={200} 
              height={40} 
              selectedNoneBgColor={'gray'}
              selectedLeftBgColor={'#78B740'}
              selectedRightBgColor={'#B0B0B0'}
              fontColor={'#fff'}
              fontSize={24}
              circleBgColor={'#FFFFFF'}
              choices={choice2}
            />
          </View>
        </View>

        <View
          style={{
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 240
          }}
        >
          <Text>Custom Style - 300 x 60 </Text>
          <View style={{ padding: 5 }}>
            <TriStateToggleSwitch 
              width={300} 
              height={60} 
              selectedNoneBgColor={'#47535E'}
              selectedLeftBgColor={'#56D069'}
              selectedRightBgColor={'#E1E4E9'}
              fontColor={'#fff'}
              fontSize={30}
              circleBgColor={'white'}
              choices={choice3}
            />
          </View>
        </View>

        <View
          style={{
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 350
          }}
        >
          <Text>Custom Style - 400 x 80 </Text>
          <View style={{ padding: 5 }}>
            <TriStateToggleSwitch 
              width={400} 
              height={80} 
              selectedNoneBgColor={'#999999'}
              selectedLeftBgColor={'#75CF41'}
              selectedRightBgColor={'#D72E30'}
              fontColor={'#fff'}
              fontSize={30}
              circleBgColor={'white'}
              choices={choice4}
              onChange={(value)=>alert(JSON.stringify(value))}
            />
          </View>
        </View>

        <View
          style={{
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 450
          }}
        >
          <Text>Custom Style - 80 x 20 </Text>
          <View style={{ padding: 5 }}>
            <TriStateToggleSwitch 
              width={80} 
              height={20} 
              selectedNoneBgColor={'red'}
              selectedLeftBgColor={'#87868A'}
              selectedRightBgColor={'#180F11'}
              fontColor={'#fff'}
              fontSize={12}
              circleBgColor={'white'}
              choices={choice5}
            />
          </View>
        </View>
        <Text style={{position: 'absolute', bottom: 50}}>
          Highly customizeable component for Android and iOS
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    position: 'absolute',
    top: 0
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
