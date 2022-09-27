import { Component } from "../components";
import { Entity } from "../entities";

export type System = {
  requiredComponents: Component<any>[],
  update: (entities: Entity[], frames: number) => any,
  disabled?: boolean,
  priority?: number,
  [x: string | number | symbol]: unknown,
}

export const Systems: {
  arr: System[],
  add: (...systems: System[]) => void,
  update: (entities: Entity[], frames?: number) => void,
} = {
  arr: [],
  add(...systems: System[]) {
    systems.forEach(system => {
      // Thanks to Web_Designer (https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers)
      let low = 0
      let high = this.arr.length

      while (low < high) {
        const mid = (low + high) >>> 1

        if ((this.arr[mid].priority || 0) < (system.priority || 0)) high = mid;
        else low = mid + 1;
      }

      this.arr.splice(low, 0, system)
    })
  },
  update(entities: Entity[], frames = 1) {
    this.arr
      .filter(system => !system.disabled)
      .forEach(system => system.update(entities.filter(e => !system.requiredComponents.some(c => !c.has(e))), frames))
  }
}