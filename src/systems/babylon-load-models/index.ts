import { AssetContainer, Scene, SceneLoader } from "babylonjs"
import { System } from ".."
import { BabylonAssetInstance } from "../../components/babylon-asset-instance"
import { BabylonNode } from "../../components/babylon-node"
import { AwaitingModel, Model } from "../../components/model"
import { Entity } from "../../entities"
import "babylonjs-loaders/babylon.glTF2FileLoader"

export const BabylonLoadModels: System & {
  models: Map<string, AssetContainer>
  modelPromises: Map<string, Promise<unknown>>
  add: (modelUrl: string, scene?: Scene) => void
} = {
  models: new Map<string, AssetContainer>(), // <url, AssetContainer>
  modelPromises: new Map<string, Promise<unknown>>(),
  requiredComponents: [Model, AwaitingModel, BabylonNode],
  add(modelUrl: string, scene?: Scene) {
    this.modelPromises.set(
      modelUrl,
      SceneLoader.LoadAssetContainerAsync(modelUrl, '', scene).then((assetContainer) =>
        this.models.set(modelUrl, assetContainer)
      )
    )
  },
  update(entities: Entity[]) {
    entities.forEach((e) => {
      const modelUrl = Model.get(e)!
      const babylonNode = BabylonNode.get(e)!
      const assetContainer = this.models.get(modelUrl)

      if (assetContainer) {
        const instance = assetContainer.instantiateModelsToScene(undefined, false, {
          doNotInstantiate: true
        })

        BabylonAssetInstance.set(e, instance)
        AwaitingModel.delete(e)
      } else if (!this.modelPromises.has(modelUrl)) this.add(modelUrl, babylonNode.getScene())
    })
  }
}