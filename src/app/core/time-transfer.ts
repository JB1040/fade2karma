export class TimeTransfer {
    public static getTime(time) {
        let date;
        if ((date = (Date.now() - time) / 1000) < 60) {
            return Math.floor(date) + (Math.floor(date) > 1 ? ' seconds' : ' second') + ' ago';
        } else if ((date = date / 60) < 60) {
            return Math.floor(date) + (Math.floor(date) > 1 ? ' minutes' : ' minute') + ' ago';
        } else if ((date = date / 60) < 24) {
            return Math.floor(date) + (Math.floor(date) > 1 ? ' hours' : ' hour') + ' ago';
        } else if ((date = date / 24) < 7) {
            return Math.floor(date) + (Math.floor(date) > 1 ? ' days' : ' day') + ' ago';
        } else if ((date = date / 7) < (30 / 7)) {
            return Math.floor(date) + (Math.floor(date) > 1 ? ' weeks' : ' week') + ' ago';
        } else if ((date = date / (30 / 7)) < 12) {
            return Math.floor(date) + (Math.floor(date) > 1 ? ' months' : ' month') + ' ago';
        } else {
            return Math.floor(date / 12) + (Math.floor(date / 12) > 1 ? ' years' : ' year') + ' ago';
        }
    }
}
