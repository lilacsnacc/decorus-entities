import { Component, createComponent } from ".."

type AnimationType = {
  name: string,
  frame: number,
}

export const Animation: Component<AnimationType> = createComponent(() => ({
  name: '',
  frame: 0,
}))