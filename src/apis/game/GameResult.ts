import { Methods } from './../../utils/api';
import call from "../../utils/api";

export default class GameResult {
    constructor() {
        call("/game/result", Methods.GET)?.then((response) => {
            if (response.status === 200) {
                
            }
        });
    }
}