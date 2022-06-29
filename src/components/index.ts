import { Entity } from ".."

export type Component<T> = WeakMap<Entity, T>