declare class ipc {
    static on(event: string, callback: (...props: any) => void): void;
    static send(event: string, data: any): void;
    static destroy(event: string, callback: () => void): void;
}
export default ipc;
