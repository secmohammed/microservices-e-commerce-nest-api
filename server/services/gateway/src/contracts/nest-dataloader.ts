export interface IDataLoader<K, V> {
    load(id: K): Promise<V>;
}
