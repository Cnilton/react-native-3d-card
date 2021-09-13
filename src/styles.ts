import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cardFront: {
    justifyContent: 'flex-end',
    position: 'absolute',
    shadowColor: '#00000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    height: 200,
    width: '100%',
  },
  cardBack: {
    position: 'absolute',
    shadowColor: '#00000000',
    borderRadius: 16,
    height: 200,
    width: '100%',
  },
  cardName: {
    letterSpacing: 1.6,
    flex: 1,
    textTransform: 'uppercase',
  },
  numberPlaceholderStyle: {
    marginLeft: 8,
    height: 8,
    alignSelf: 'center',
    width: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f5',
  },
  cardNumber: {
    letterSpacing: 2.0,
    fontSize: 25,
    textAlignVertical: 'center',
  },
  cardCVV: {
    alignSelf: 'flex-end',
    marginRight: 32,
    marginTop: 32,
    width: 60,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  cardNumberContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
  },
  bottomContainerFrontCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backContent: {
    flex: 1,
    borderRadius: 16,
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
  blackStrip: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#111',
    width: '100%',
  },
  safetyCodeText: {
    alignSelf: 'flex-end',
    marginRight: 32,
    marginTop: 5,
  },
});
