import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/defult-styles';
import Colors from '../constants/color';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/original.png')}
          source={{
            uri:
              'https://static.zerochan.net/Griffith.%28BERSERK%29.full.2401423.jpg',
          }}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={(DefaultStyles.bodyText, styles.resultText)}>
          Your phone needed{' '}
          <Text style={styles.higlight}> {props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.higlight}>
            {props.userNumber ? props.userNumber : 0}
          </Text>
        </Text>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  higlight: {
    color: Colors.primary,
    fontFamily: 'opens-sans-bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
export default GameOverScreen;
