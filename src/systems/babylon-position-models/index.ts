import { System } from ".."
import { BabylonAssetInstance } from "../../components/babylon-asset-instance"
import { BabylonNode } from "../../components/babylon-node"
import { Transform } from "../../components/transform"
import { Entity } from "../../entities"

export const BabylonPositionModels: System = {
  requiredComponents: [Transform, BabylonNode],
  update(entities: Entity[]) {
    entities.forEach((e) => {
      const transform = Transform.get(e)!
      const node = BabylonNode.get(e)!

      node.position.set(transform.x, transform.y, transform.z)
      BabylonAssetInstance.get(e)?.rootNodes[0].position.copyFrom(node.position)
    })
  }
}