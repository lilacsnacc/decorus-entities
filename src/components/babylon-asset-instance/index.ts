import { Component, createComponent } from "..";
import { InstantiatedEntries } from 'babylonjs'

export const BabylonAssetInstance: Component<InstantiatedEntries> = createComponent(
  () => new InstantiatedEntries()
)