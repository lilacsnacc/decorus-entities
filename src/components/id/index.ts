import { Component, createComponent } from ".."

let defID = 0

export const ID: Component<number> = createComponent(() => defID++)