declare namespace Logger {
    function log(message?: any, ...optionalParams: any[]): void;
    function warn(message?: any, ...optionalParams: any[]): void;
    function error(message?: any, ...optionalParams: any[]): void;
}
export default Logger;
