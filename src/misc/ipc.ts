class ipc {
  public static on(event: string, callback: (...props: any) => void) {
    document.addEventListener(event, (e: any) => callback(e.detail));
  }

  public static send(event: string, data: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  public static destroy(event: string, callback: () => void) {
    document.removeEventListener(event, callback);
  }
}

export default ipc;
