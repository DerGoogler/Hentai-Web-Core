namespace Logger {
  export function log(message?: any, ...optionalParams: any[]) {
    console.log(`%c[LOG]:%c ${message}`, "color: #57c0f0", "", ...optionalParams);
  }

  export function warn(message?: any, ...optionalParams: any[]) {
    console.log(`%c[WARN]:%c ${message}`, "color: #ef721f", "", ...optionalParams);
  }

  export function error(message?: any, ...optionalParams: any[]) {
    console.log(`%c[ERROR]:%c ${message}`, "color: #a41117", "", ...optionalParams);
  }
}

export default Logger;
