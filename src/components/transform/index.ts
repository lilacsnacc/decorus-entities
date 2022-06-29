import { Component } from ".."
import { Entity } from "../.."

type TransformType = {
  x: number,
  y: number,
  z: number,
}

export const defaultTransform = { x: 0, y: 0, z: 0 }

export const Transform: Component<TransformType> = new WeakMap<Entity, TransformType>()