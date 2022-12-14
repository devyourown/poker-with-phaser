import call, { Methods } from "../../utils/api";
import CardDTO from "../card/CardDTO";



export default class GameApi {
    public static getGameId() {
        const result = {gameId: ""};
        call("/game/gameId", Methods.GET)?.then((response) => {
            if (response.status === 200) {
              result.gameId = response.data.gameId;
            }
        });
        return result;
    }

    public static getHands() {
        const result: any = {hands: []};
        call("/game/hands", Methods.GET)?.then((response) => {
            for (let i=0; i<2; i++) {
                result.hands.push(new CardDTO(
                    response.data.hands[i].suit,
                    response.data.hands[i].value
                ));
            }
        });
        return result;
    }

    public static getGame() {
        const result: any = {};
        result.isChanged = false;
        call("/game/game", Methods.GET)?.then((response) => {
            if (response.status === 200) {
                result.board = response.data.board;
                result.potSize = response.data.potSize;
                result.currentBetSize = response.data.currentBet;
                result.status = response.data.gameStatus;
                result.currentTurnIndex = response.data.currentTurnIndex;
                result.lastActionIndex = response.data.lastActionIndex;
                result.lastAction = response.data.lastAction;
                result.isChanged = true;
            }
        });
        return result;
    }

    public static playAction(gameId: string, action: String
        , betSize: number) {
        call("/game/action", Methods.POST, {
            gameId: gameId,
            action: action,
            betSize: betSize,
        });
    }
}