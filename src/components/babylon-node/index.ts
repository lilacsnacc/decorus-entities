import { AbstractMesh } from "babylonjs";
import { Component, createComponent } from "..";


export const BabylonNode: Component<AbstractMesh> = createComponent(() => new AbstractMesh(''))