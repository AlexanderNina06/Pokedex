export type CacheEntry<T> ={
  createdAt: number,
  val: T
}

export class Cache {

  constructor(num: number){
    this.#interval = num;
    this.#startReapLoop()
  }

  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  add<T>(key: string, val: T){
    const entry: CacheEntry<T> = {
      val: val,
      createdAt: Date.now()
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string): CacheEntry<T> | undefined {
  return this.#cache.get(key);
}


  #reap(){
    for(const [key, value] of this.#cache){
      console.log("Checking:", key, "createdAt:", value.createdAt);
      if (value.createdAt < Date.now() - this.#interval) {
          console.log("Deleting:", key);
          this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(){
    const intervalId = setInterval(() => this.#reap(), this.#interval)
    this.#reapIntervalId = intervalId
  }

  stopReapLoop(){
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

}