import React, {useState, useImperativeHandle, useRef, forwardRef} from 'react';
import {View, Text, Animated, TextStyle, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

interface Props {
  /** Distance between card number groupings */
  distanceBetweenCardNumberGroups?: number;
  /** Styles to card number container */
  cardNumberContainerStyle?: ViewStyle;
  /** Styles to front card container */
  frontCardBottomContainerStyle?: ViewStyle;
  /** Styles to card whole container */
  containerStyle?: ViewStyle;
  /** Styles to card number value */
  numberValueStyle?: TextStyle;
  /** Styles to card number placeholder. */
  numberPlaceholderStyle?: ViewStyle;
  /** Card number value */
  numberValue: string;
  /** Card name placeholder. Default = "FULL NAME" */
  namePlaceholder?: string;
  /** Styles to card name value */
  nameValueStyle?: TextStyle;
  /** Card name value */
  nameValue: string;
  /** Styles to expiracy text */
  expiracyTextStyle?: TextStyle;
  /** Styles to expiracy value */
  expiracyValueStyle?: TextStyle;
  /** Card expiracy placeholder. Default = "MM/YY" */
  expiracyPlaceholder?: string;
  /** Card expiracy text. Default = "Valid thru" */
  expiracyText?: string;
  /** Card expiracy value */
  expiracyValue: string;
  /** Styles to front card side container */
  frontSideCardStyle?: ViewStyle;
  /** Styles to back card side container */
  backSideCardStyle?: ViewStyle;
  /** Card safety code text. Default = "Safety code" */
  cvvText?: string;
  /** Card safety code value */
  cvvValue: string;
  /** Styles to safety code value */
  cvvValueStyle?: TextStyle;
  /** Safety code placeholder. Default = "" */
  cvvPlaceholder?: string;
  /** Styles to card safety code text */
  cvvTextStyle?: TextStyle;
  /** Animation duration in miliseconds. Default = 800 */
  animationDuration?: number;
  /** Card height */
  cardHeight?: number | string;
  /** Array of hexstring for gradient color to front side */
  frontSideCardGradientColors?: string[];
  /** Array of hexstring for gradient color to back side */
  backSideCardGradientColors?: string[];
  /** Card number length */
  cardNumberLength?: number;
  /** Card number divide at specified group number */
  dividerNumber?: number;
}

interface CardRef {
  rotateBackward(): void;
  rotateForward(): void;
}

const App: React.ForwardRefRenderFunction<CardRef, Props> = (
  {
    distanceBetweenCardNumberGroups = 8,
    cardNumberContainerStyle,
    frontCardBottomContainerStyle,
    containerStyle,
    frontSideCardGradientColors,
    backSideCardGradientColors,
    numberValueStyle,
    numberPlaceholderStyle,
    numberValue,
    nameValueStyle,
    namePlaceholder = 'Full Name',
    nameValue,
    expiracyTextStyle,
    expiracyValueStyle,
    expiracyPlaceholder = 'MM/YY',
    expiracyText = 'Valid thru',
    expiracyValue,
    frontSideCardStyle,
    backSideCardStyle,
    cvvText = 'Safety code',
    cvvValue,
    cvvValueStyle,
    cvvPlaceholder,
    cvvTextStyle,
    animationDuration = 800,
    cardHeight = 200,
    cardNumberLength = 16,
    dividerNumber = 4,
  },
  ref,
) => {
  const cardRef = useRef<any>(null);

  const [animatedRotation] = useState(new Animated.Value(0));

  const AnimatedView = Animated.createAnimatedComponent(LinearGradient);

  const rotateBackward = () => {
    Animated.timing(animatedRotation, {
      toValue: 180,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const rotateForward = () => {
    Animated.timing(animatedRotation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useImperativeHandle(ref, () => ({
    rotateBackward() {
      rotateBackward();
    },
    rotateForward() {
      rotateForward();
    },
  }));

  const renderNumberPlaceholder = () => {
    const array = [];

    for (let i = 0; i < cardNumberLength; i++) {
      array.push(i);
    }

    return array.map((_, index) => {
      if (numberValue?.replace(/ /g, '')?.length <= index) {
        console.log(index, (index - (dividerNumber - 1)) % dividerNumber);
        return (
          <View
            key={`placeholder-${String(index)}`}
            style={[
              styles.numberPlaceholderStyle,
              {
                marginRight:
                  (index - (dividerNumber - 1)) % dividerNumber === 0
                    ? distanceBetweenCardNumberGroups
                    : 0,
              },
              numberPlaceholderStyle,
            ]}
          />
        );
      } else {
        return <></>;
      }
    });
  };

  return (
    <View ref={cardRef} style={[{height: cardHeight}, containerStyle]}>
      <AnimatedView
        colors={
          frontSideCardGradientColors || [
            '#919293',
            '#a1a2a3',
            '#d1d2d3',
            '#a1a2a3',
          ]
        }
        style={[
          styles.cardFront,
          {height: cardHeight},
          frontSideCardStyle,
          {
            elevation: animatedRotation.interpolate({
              inputRange: [0, 180],
              outputRange: [1, 0],
            }),
            transform: [
              {
                rotateY: animatedRotation.interpolate({
                  inputRange: [0, 180],
                  outputRange: ['0deg', '180deg'],
                }),
              },
              {perspective: 10000},
            ],
          },
        ]}>
        <View style={[styles.cardNumberContainer, cardNumberContainerStyle]}>
          {numberValue
            ?.replace(/ /g, '')
            .split('')
            .map((num, index) => {
              return (
                <Text
                  key={String(index)}
                  style={[
                    styles.cardNumber,
                    numberValueStyle,
                    (index - (dividerNumber - 1)) % dividerNumber === 0 && {
                      marginRight: distanceBetweenCardNumberGroups,
                    },
                  ]}>
                  {num?.replace(/ /g, '')}
                </Text>
              );
            })}
          {renderNumberPlaceholder()}
        </View>
        <View
          style={[
            styles.bottomContainerFrontCard,
            frontCardBottomContainerStyle,
          ]}>
          <Text style={[styles.cardName, nameValueStyle]}>
            {nameValue || namePlaceholder}
          </Text>
          <View style={{alignContent: 'center'}}>
            <Text style={expiracyTextStyle}>{expiracyText}</Text>
            <Text style={expiracyValueStyle}>
              {expiracyValue || expiracyPlaceholder}
            </Text>
          </View>
        </View>
      </AnimatedView>

      <AnimatedView
        colors={
          backSideCardGradientColors || [
            '#919293',
            '#d1d2d3',
            '#919293',
            '#919293',
          ]
        }
        style={[
          styles.cardBack,
          {height: cardHeight},
          backSideCardStyle,
          {
            elevation: animatedRotation.interpolate({
              inputRange: [0, 180],
              outputRange: [0, 1],
            }),
            transform: [
              {
                rotateY: animatedRotation.interpolate({
                  inputRange: [0, 180],
                  outputRange: ['0deg', '180deg'],
                }),
              },
              {perspective: 10000},
            ],
          },
        ]}>
        <View style={styles.backContent}>
          <View style={styles.blackStrip} />
          <Text style={[styles.cardCVV, cvvValueStyle]}>
            {cvvValue || cvvPlaceholder}
          </Text>
          <Text style={[styles.safetyCodeText, cvvTextStyle]}>{cvvText}</Text>
        </View>
      </AnimatedView>
    </View>
  );
};
export default forwardRef(App);
