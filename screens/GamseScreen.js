import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Card from '../components/Card';
import DefaultStyles from '../constants/defult-styles';

const generateRamdonBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rdNum = Math.floor(Math.random() * (max - min)) + min;
  if (rdNum === exclude) {
    return generateRamdonBetween(min, max, exclude);
  } else {
    return rdNum;
  }
};
const renderListItem = (listLength,ItemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength-ItemData.index}</Text>
    <Text>{ItemData.item}</Text>
  </View>
);

const GameScren = (props) => {
  const initialGuess = generateRamdonBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currenLow = useRef(1);
  const currenHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'grater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currenHigh.current = currentGuess;
    } else {
      currenLow.current = currentGuess + 1;
    }
    const nextNumber = generateRamdonBetween(
      currenLow.current,
      currenHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //  setPastGuesses((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Oppenent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/*  <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length-index))}
      </ScrollView> */}
        <FlatList
          keyExtractor={(item) =>item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this,pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
    marginTop:10
  },
  list: {
    flexGrow:1,
   // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    fontFamily: 'open-sans',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export default GameScren;
