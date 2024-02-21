import React, {useState, useEffect} from 'react'
import { View, Text, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import style from '../style/style'

let board = []
const NBR_OF_DICES = 5
const NBR_OF_THROWS = 3
const WINNING_POINTS = 23

export const GameBoard = () => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [nbrOfWins, setNbrOfWins] = useState(0)
    const [sum, setSum] = useState(0)
    const [status, setStatus] = useState('')
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
        <Pressable
            key={"row" + i}
            onPress={()=> selectDice(i)}>
    <MaterialCommunityIcons
    name={board[i]}
    key={"row" + i}
    size={50}
    color={getDiceColor(i)}>
    </MaterialCommunityIcons>
        </Pressable>

);

}

        function getDiceColor(i) {
            if (board.every((val, i, arr) => val === arr[0])) {
                return 'orange'
            }
            else{
                return selectedDices[i] ? 'black' : 'steelblue'
            } 
        }

        const selectDice = (i) => {
            setSelectedDices((dices) => {
                const updatedDices = [...dices];
                updatedDices[i] = !dices[i];
        
                // Calculate the sum of selected dice values
                const updatedSum = updatedDices.reduce((acc, isSelected, index) => {
                    if (isSelected) {
                        // Add the value of the selected dice
                        acc += parseInt(board[index].split('-')[1], 10);
                    }
                    return acc;
                }, 0);
        
                // Update the sum state
                setSum(updatedSum);
        
                console.log(updatedDices);
                console.log("Updated Sum:", updatedSum);
        
                return updatedDices;
            });
        };

        const throwDices = () => {
            
            let rolledNumbers = [];
        
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    rolledNumbers.push(randomNumber);
                    
                    console.log("numero", randomNumber);
                }
            }
            console.log(rolledNumbers)
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
           
            
        };

    const checkWinner = () => {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setNbrOfWins(nbrOfWins + 1)
            setStatus('You Won!')
            setSum(0)
        }
        else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setNbrOfWins(nbrOfWins + 1)
            setSelectedDices(new Array(NBR_OF_DICES).fill(false))
            setStatus('You won, game over!')
            setSum(0)
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('You won, game over!')
            setSelectedDices(new Array(NBR_OF_DICES).fill(false))
            setSum(0)
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Game over!')
            setSum(0)
        }
        else {
            setStatus('Keep throwing!')
        }
    }

    useEffect(() => {
        checkWinner()
        if(nbrOfThrowsLeft === NBR_OF_THROWS){
            setStatus('Game has not started')
        }
        if (nbrOfThrowsLeft < 0){
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1)
            setNbrOfWins(0)
        }

    }, [nbrOfThrowsLeft])



  return (
    <View style={style.gameboard}>
        <View style={style.flex}>{row}</View>
        <Text style={style.gameinfo}>Sum: {sum}</Text>
        <Text style={style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={style.gameinfo}>Nbr of wins: {nbrOfWins}</Text>
        <Text style={style.gameinfo}>{status}</Text>
        <Pressable style={style.button}
        onPress={() => throwDices()}>
            <Text style={style.buttonText}>
                Throw dices
            </Text>
        </Pressable>
    </View>
  )
}
