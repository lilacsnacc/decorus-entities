import { Component } from "../components"


export type Entity = WeakSet<Component<any>>


export function buildEntity(components: Component<any>[], entity: Entity = new WeakSet()) {
  components.forEach(component =>
    component.has(entity) || entity.add(component.set(entity, component.getDefault())))

  return entity
}