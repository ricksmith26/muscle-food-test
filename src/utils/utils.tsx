import { validCoins } from '../coinData'
import { Coin} from '../types'

export const countCoins = (addedCoin: Coin, setTotalState: Function, setRejectedCoinsState: Function) => {

    const coinRefs = Object.values(validCoins)
    let validCoin = false;

    coinRefs.forEach((coinRef) => {
        if (coinRef.diameter === addedCoin.diameter
            && coinRef.weight === addedCoin.weight
            && coinRef.thickness === addedCoin.thickness) {
            validCoin = true
        }
    })

    if (validCoin) {
        setTotalState(addedCoin)
    } else {
        setRejectedCoinsState()
    }
}