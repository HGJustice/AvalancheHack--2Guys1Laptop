import {
  MemoryCacheAdapter as coreMemoryCacheAdapter,
  FsCacheAdapter as coreFsCacheAdapter,
  DbCacheAdapter as coreDbCacheAdapter,
  CacheManager as coreCacheManager,
} from '@elizaos/core';

import type {
    CacheOptions,
    ICacheManager,
    IDatabaseCacheAdapter,
    UUID,
} from "./types";

export interface ICacheAdapter {
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}

export class MemoryCacheAdapter implements ICacheAdapter {
    _adapter: coreMemoryCacheAdapter;

    constructor(initalData?: Map<string, string>) {
        this._adapter = new coreMemoryCacheAdapter(initalData);
    }

    async get(key: string): Promise<string | undefined> {
        return this._adapter.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        return this._adapter.set(key, value);
    }

    async delete(key: string): Promise<void> {
        return this._adapter.delete(key);
    }
}

export class FsCacheAdapter implements ICacheAdapter {
    _adapter: coreFsCacheAdapter;
    constructor(private dataDir: string) {
        this._adapter = new coreFsCacheAdapter(dataDir);
    }

    async get(key: string): Promise<string | undefined> {
        return this._adapter.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        return this._adapter.set(key, value);
    }

    async delete(key: string): Promise<void> {
        return this._adapter.delete(key);
    }
}

export class DbCacheAdapter implements ICacheAdapter {
    _adapter: coreDbCacheAdapter;
    constructor(
        private db: IDatabaseCacheAdapter,
        private agentId: UUID
    ) {
        this._adapter = new coreDbCacheAdapter(db, agentId);
    }

    async get(key: string): Promise<string | undefined> {
        return this._adapter.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        return this._adapter.set(key, value);
    }

    async delete(key: string): Promise<void> {
        return this._adapter.delete(key);
    }
}

export class CacheManager<CacheAdapter extends ICacheAdapter = ICacheAdapter>
    implements ICacheManager
{
    _adapter: coreCacheManager;
    adapter: CacheAdapter;

    constructor(adapter: CacheAdapter) {
        this._adapter = new coreCacheManager(adapter);
        this.adapter = adapter;
    }

    async get<T = unknown>(key: string): Promise<T | undefined> {
        return this._adapter.get(key);
    }

    async set<T>(key: string, value: T, opts?: CacheOptions): Promise<void> {
        return this._adapter.set(key, value, opts);
    }

    async delete(key: string): Promise<void> {
        return this._adapter.delete(key);
    }
}