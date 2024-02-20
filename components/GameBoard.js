import React, {useState, useEffect} from 'react'
import { View, Text, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import style from '../style/style'

let board = []
const NBR_OF_DICES = 5
const NBR_OF_THROWS = 5
const WINNING_POINTS = 23

export const GameBoard = () => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [nbrOfWins, setNbrOfWins] = useState(0)
    const [sum, setSum] = useState(0)
    const [status, setStatus] = useState('')

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
    <MaterialCommunityIcons
    name={board[i]}
    key={"row" + i}
    size={50}
    color={"steelblue"}>
    </MaterialCommunityIcons>

);

}

    const throwDices = () => {
        let sum = 0;
        for (let  i = 0 ; i < NBR_OF_DICES; i++){
            let randomNumber = Math.floor(Math.random() * 6 + 1)
            board[i] = 'dice-' + randomNumber;
            sum += randomNumber
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
        setSum(sum)
    }

    const checkWinner = () => {
        if (sum>= WINNING_POINTS && nbrOfThrowsLeft > 0) {
            setNbrOfWins(nbrOfWins + 1)
            setStatus('You Won!')
        }
        else if (sum >= WINNING_POINTS && nbrOfThrowsLeft === 0) {
            setNbrOfWins(nbrOfWins + 1)
            setStatus('You won, game over!')
        }
        else if (nbrOfWins > 0  && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over!')
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Game over!')
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
