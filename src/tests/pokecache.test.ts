import { test, expect } from "vitest";
import { Cache } from "../pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: { message: "hello" },
    interval: 1000,
  },
])(
  "Cache stores, retrieves, and reaps entries after $interval ms",
  async ({ key, val, interval }) => {

    const cache = new Cache(interval);

    cache.add(key, val);

    const cached = cache.get<typeof val>(key);
    expect(cached?.val).toEqual(val);

    await new Promise((resolve) => setTimeout(resolve, interval * 2));

    const afterReap = cache.get<typeof val>(key);
    expect(afterReap).toBe(undefined);

    cache.stopReapLoop();
  }
);
