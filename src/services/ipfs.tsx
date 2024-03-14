export class IpfsService {
  private node = process.env.REACT_APP_IPFS_NODE!;

  private storagePrefix = 'IPFS_CACHE_';
  
  async getJsonFile<T>(hash: string): Promise<T> {
    if (!hash) {
      return {} as T;
    }

    const cached = this.getCachedFile(hash);
    if (cached) {
      return cached;
    }

    const file = await (await fetch(this.node + hash)).json();
    this.setCachedFile(hash, file);
    return file;
  }

  private getCachedFile(hash: string): any {
    const stored = localStorage.getItem(this.storagePrefix + hash);
    if (stored == null) {
      return null;
    }
    return JSON.parse(stored)['0'];
  }

  private setCachedFile(hash: string, content: any) {
    localStorage.setItem(this.storagePrefix + hash, JSON.stringify({'0': content}))
  }
}
