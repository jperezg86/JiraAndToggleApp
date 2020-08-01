export default class Utils {

    public static msToTime(s) {
        return new Date(s).toISOString().substr(11,8);
    }

    public static segToTime(s) {
        return new Date(s * 1000).toISOString().substr(11, 8);
    }
}