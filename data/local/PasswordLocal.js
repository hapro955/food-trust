import {AsyncStorage} from 'react-native'

const password = 'pass-word';

async function getPassWord() {
    return await AsyncStorage.getItem(password);
}

async function setPassWord(passWord) {
    return await AsyncStorage.setItem(password, passWord);
}

async function removePassWord() {
    return await AsyncStorage.removeItem(password);
}

module.exports = {
    getPassWord: getPassWord,
    setPassWord: setPassWord,
    removePassWord: removePassWord
}