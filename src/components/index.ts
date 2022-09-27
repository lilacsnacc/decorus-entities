import { Entity } from "../entities"

export type Component<T> = WeakMap<Entity, T> & { getDefault(): T }

export const createComponent = <T>(getDefault: () => T): Component<T> =>
  Object.assign(new WeakMap<Entity, T>, { getDefault })