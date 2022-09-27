import { Component, createComponent } from ".."

type TransformType = {
  x: number,
  y: number,
  z: number,
}

export const Transform: Component<TransformType> = createComponent(() => ({ x: 0, y: 0, z: 0 }))