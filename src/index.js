import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder
} from 'react-native';
import styles from './TriStateToggleSwitchStyle';

const defaultChoices = [
  {
    choiceCode: 'Yes',
    choiceText: 'Yes'
  },
  {
    choiceCode: 'No',
    choiceText: 'No'
  }
];

const SELECTED_NONE = 'none';
const SELECTED_RIGHT = 'right';
const SELECTED_LEFT = 'left';

/* TODO: Implementation
  <TriStateToggleSwitch
    question="Do you love me?"
    choices={[
      {
        id: 1,
        idText: null,
        questionId: 7,
        screenId: 4,
        choiceCode: 'Y',
        choiceText: 'YES'
      },
      {
        id: 29,
        idText: null,
        questionId: 7,
        screenId: 4,
        choiceCode: 'N',
        choiceText: 'NO'
      }
    ]}
    onChange={value => console.log(value)}
  />
*/

export const log = (methodName, evt, gestureState) => {
  console.log(methodName + ' evt: ' + evt); // eslint-disable-line
  console.log(methodName + ' gestureState: ' + JSON.stringify(gestureState)); // eslint-disable-line
  console.log('=========================================================================');
};

class TriStateToggleSwitch extends Component {
  constructor(props) {
    super(props);
    const isArrayPropChoices = props.choices instanceof Array;
    this.choices = defaultChoices;
    if (isArrayPropChoices) {
      if (props.choices.length > 1) {
        this.choices = props.choices;
      }
    }

    this.values = {
      [SELECTED_LEFT]: this.choices[0],
      [SELECTED_RIGHT]: this.choices[1]
    };

    this.state = {
      circleXPos: new Animated.Value(0), // Initial value for Circle Horizontal Position,
      noOptionXPos: new Animated.Value(0),
      noOptionOpacity: new Animated.Value(1),
      yesOptionXPos: new Animated.Value(0),
      yesOptionOpacity: new Animated.Value(1),
      selected: SELECTED_NONE,
      xDistance: 45,
      xDisntanceThreshold: 45 * 0.33
    };

    this.initializeContainerPanResponder();
  }

  componentDidMount() {
    const { initialValue } = this.props;
    if (initialValue !== null) {
      const initialChoiceIndex = this.choices.findIndex(element => element.choiceCode === initialValue);
      const { xDistance } = this.state;
      if (initialChoiceIndex === 0) {
        this.setState({
          circleXPos: new Animated.Value(-1 * xDistance),
          noOptionXPos: new Animated.Value(xDistance),
          noOptionOpacity: new Animated.Value(1),
          yesOptionOpacity: new Animated.Value(0),
          selected: SELECTED_LEFT
        });
      } else if (initialChoiceIndex === 1) {
        this.setState({
          circleXPos: new Animated.Value(xDistance),
          yesOptionXPos: new Animated.Value(-1 * xDistance),
          noOptionOpacity: new Animated.Value(0),
          yesOptionOpacity: new Animated.Value(1),
          selected: SELECTED_RIGHT
        });
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { width, height } = nextProps;
    if (!width) {
      width = 120; // default width
    }

    if (!height) {
      height = 24; // default height
    }

    const xDistance = (width / 2) - ((height - 4) / 2) - 5;
    if (prevState.xDistance !== xDistance) {
      return {
        xDistance,
        xDisntanceThreshold: xDistance * 0.33
      };
    }
    return null;
  }

  onPressNo = () => {
    if (this.state.selected === SELECTED_LEFT) {
      // if selected is no then select yes
      this.onPressYes();
    } else {
      const { xDistance } = this.state;
      this.animateThenSetValue(
        xDistance * -1,
        'noOptionXPos',
        xDistance,
        1,
        0,
        SELECTED_LEFT
      );
    }
  };

  onPressNone = () => {
    this.state.circleXPos.setOffset(0);
    this.state.circleXPos.setValue(this._lastCircleXPosOrigin);
    this._lastCircleXPosOrigin = 0;
    Animated.parallel([
      Animated.timing(this.state.circleXPos, {
        toValue: 0,
        duration: 100
      }),
      Animated.timing(this.state.noOptionXPos, {
        toValue: 0,
        duration: 100
      }),
      Animated.timing(this.state.yesOptionXPos, {
        toValue: 0,
        duration: 100
      }),
      Animated.timing(this.state.noOptionOpacity, {
        toValue: 1,
        duration: 100
      }),
      Animated.timing(this.state.yesOptionOpacity, {
        toValue: 1,
        duration: 100
      })
    ]).start(() => {
      this.setState(
        {
          selected: SELECTED_NONE
        },
        () => {
          this.executeCallback(null);
        }
      );
    });
  };

  onPressYes = () => {
    if (this.state.selected === SELECTED_RIGHT) {
      // if selected is yes then select no
      this.onPressNo();
    } else {
      const { xDistance } = this.state;
      this.animateThenSetValue(
        xDistance,
        'yesOptionXPos',
        xDistance * -1,
        0,
        1,
        SELECTED_RIGHT
      );
    }
  };

  initializeContainerPanResponder = () => {
    const thisComponent = this;
    // Add a listener for the delta value change
    this._lastCircleXPosOrigin = 0;
    this._storedCircleXPos = { x: 0, y: 0 };
    this.state.circleXPos.addListener((value) => {
      this._storedCircleXPos = value;
    });

    thisComponent.containerPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const storedCircleXPos = this._storedCircleXPos.value;
        if (storedCircleXPos) {
          this._lastCircleXPosOrigin = storedCircleXPos;
          this.state.circleXPos.setOffset(storedCircleXPos);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        log('onPanResponderMove: ', evt, gestureState);
        return Animated.event([
          null,
          {
            dx: thisComponent.state.circleXPos
          }
        ])(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        const direction = dx < 0 ? 'left' : 'right';
        const location = Math.abs(dx) - Math.abs(this._lastCircleXPosOrigin);
        console.log(`dx: ${dx}`);
        console.log(`_storedCircleXPos: ${this._storedCircleXPos.value}`);
        console.log(`this._lastCircleXPosOrigin: ${this._lastCircleXPosOrigin}`);
        console.log(`location: ${location}`);
        console.log(`this.state.xDistance: ${this.state.xDistance}`);
        console.log(`location >= this.state.xDistance-15: ${location >= this.state.xDistance - 15}`);
        console.log(`direction: ${direction}`);
        if (location >= this.state.xDistance - this.state.xDisntanceThreshold) {
          if (direction === 'left') {
            this.onPressNo();
          } else if (direction === 'right') {
            this.onPressYes();
          }
        } else {
          this.onPressNone();
        }

        log('onPanResponderRelease: ', evt, gestureState);
      }
    });
  };

  executeCallback = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      this.props.onChange(value);
    }
  };

  animateThenSetValue = (
    circleXPos,
    xposState,
    optionXPosValue,
    noOptionOpacity,
    yesOptionOpacity,
    selectedValue
  ) => {
    this.state.circleXPos.setOffset(0);
    this._lastCircleXPosOrigin = circleXPos;
    Animated.parallel([
      Animated.timing(this.state.circleXPos, {
        toValue: circleXPos,
        duration: 100
      }),
      Animated.timing(this.state[xposState], {
        toValue: optionXPosValue,
        duration: 100
      }),
      Animated.timing(this.state.noOptionOpacity, {
        toValue: noOptionOpacity,
        duration: 100
      }),
      Animated.timing(this.state.yesOptionOpacity, {
        toValue: yesOptionOpacity,
        duration: 100
      })
    ]).start(() => {
      this.setState(
        {
          selected: selectedValue
        },
        () => {
          this.executeCallback(this.values[selectedValue]);
        }
      );
    });
  };

  render() {
    const { _addPropStyle, _setCircleSize } = this;
    const containerStyle = { ...styles.container };
    if (this.state.selected === SELECTED_NONE) {
      _addPropStyle(
        'backgroundColor',
        'selectedNoneBgColor',
        containerStyle,
        '#41B6E6'
      );
    } else if (this.state.selected === SELECTED_LEFT) {
      _addPropStyle(
        'backgroundColor',
        'selectedLeftBgColor',
        containerStyle,
        '#3171BF'
      );
    } else if (this.state.selected === SELECTED_RIGHT) {
      _addPropStyle(
        'backgroundColor',
        'selectedRightBgColor',
        containerStyle,
        '#3171BF'
      );
    }

    const circleStyle = { ...styles.circle };
    _addPropStyle('height', 'height', containerStyle);
    _addPropStyle('width', 'width', containerStyle);
    _setCircleSize(circleStyle);
    _addPropStyle('backgroundColor', 'circleBgColor', circleStyle);

    const touchableTextStyle = { ...styles.touchableTextStyle };
    _addPropStyle('color', 'fontColor', touchableTextStyle, '#fff');
    _addPropStyle('fontSize', 'fontSize', touchableTextStyle, 12);

    return (
      <View style={{ ...styles.formContainer }}>
        <View
          style={containerStyle}
          {...this.containerPanResponder.panHandlers}
        >
          <Animated.View
            style={{
              ...{ flex: 1, alignItems: 'center' },
              ...{
                left: this.state.noOptionXPos,
                opacity: this.state.noOptionOpacity
              }
            }}
          >
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={this.onPressNo}
            >
              <Text style={touchableTextStyle}>
                {this.choices[0].choiceText}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{ ...circleStyle, ...{ left: this.state.circleXPos } }}
          />

          <Animated.View
            style={{
              ...{ flex: 1, alignItems: 'center' },
              ...{
                left: this.state.yesOptionXPos,
                opacity: this.state.yesOptionOpacity
              }
            }}
          >
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={this.onPressYes}
            >
              <Text style={touchableTextStyle}>
                {this.choices[1].choiceText}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Text style={styles.labelText}>{this.state.label}</Text>
      </View>
    );
  }
}

TriStateToggleSwitch.defaultProps = {
  choices: defaultChoices
};

export default TriStateToggleSwitch;
