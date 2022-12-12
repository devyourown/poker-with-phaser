export enum PlayerStatus {
    FOLD,
    PLAYING
}

export default class Player {
    private money: number;
    private nikcname: string;
    private status: boolean;

    constructor(money: number, nickname: string, status: boolean) {
        this.money = money;
        this.nikcname = nickname;
        this.status = status;
    }

    get getMoney() {
        return this.money;
    }

    get getNickname() {
        return this.nikcname;
    }
}