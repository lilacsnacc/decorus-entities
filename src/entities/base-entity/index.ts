import { Animation } from "../../components/animation"
import { ID } from "../../components/id"
import { Model } from "../../components/model"
import { Transform } from "../../components/transform"

export const BaseEntity = [
  ID,
  Transform,
]

export const GraphicalEntity = [
  Model,
  Animation,
  ...BaseEntity,
]

export const PhysicalEntity = [
  // Physical Tings
  ...BaseEntity,
]

export const DefaultEntity = [...new Set([...GraphicalEntity, ...PhysicalEntity])]