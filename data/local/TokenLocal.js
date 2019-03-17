import {AsyncStorage} from 'react-native'

const token = 'access_token';

async function getAccessToken() {
    return await AsyncStorage.getItem(token);
}

async function setAccessToken(accessToken) {
    return await AsyncStorage.setItem(token, accessToken);
}

async function removeAcessToken() {
    return await AsyncStorage.removeItem(token);
}

module.exports = {
    getAccessToken: getAccessToken,
    setAccessToken: setAccessToken,
    removeAcessToken: removeAcessToken
}
