<script lang="ts">
	import { Systems } from '../../../src/systems'
	import { BabylonNode } from '../../../src/components/babylon-node'
	import { BabylonPositionModels } from '../../../src/systems/babylon-position-models'
	import { BabylonLoadModels } from '../../../src/systems/babylon-load-models'
	import { buildEntity, type Entity } from '../../../src/entities/index'
	import { AwaitingModel, Model } from '../../../src/components/model/index'
	import { DefaultEntity } from '../../../src/entities/base-entity'
	// import { initTestStage } from './test-stage-setup'
	import { onMount } from 'svelte'
	import humanoidModel from '/src/assets/humanoid.glb?url'
	import {
		AbstractMesh,
		Engine,
		Scene,
		MeshBuilder,
		StandardMaterial,
		TargetCamera,
		Vector3
	} from 'babylonjs'

	let engine: Engine
	let scene: Scene

	type TestStageProps = {
		canvas: HTMLCanvasElement
		init?: (scene: Scene) => void
		update?: () => void
	}

	export function initTestStage({ canvas, init, update }: TestStageProps) {
		const groundSize = 10

		engine = new Engine(canvas)
		scene = new Scene(engine)

		scene.createDefaultCameraOrLight(false, true, true)

		const camera = scene.activeCamera as TargetCamera
		camera.position.set(0, 1, groundSize * 0.5)
		camera.setTarget(Vector3.ZeroReadOnly)

		const ground = MeshBuilder.CreateGround('ground', {
			width: groundSize,
			height: groundSize,
			subdivisions: groundSize
		})
		ground.material = new StandardMaterial('wireMat', scene)
		ground.material && (ground.material.wireframe = true)

		window.addEventListener('resize', () => engine.resize())

		init && init(scene)

		engine.runRenderLoop(() => {
			update && update()
			scene.render()
		})
	}

	const entities: Entity[] = []

	let canvas: HTMLCanvasElement

	Systems.add(BabylonLoadModels, BabylonPositionModels)

	function init(scene: Scene) {
		const humanoid = buildEntity(DefaultEntity)
		Model.set(humanoid, humanoidModel)
		BabylonNode.set(humanoid, new AbstractMesh('humanoid', scene))
		AwaitingModel.set(humanoid, true)
		entities.push(humanoid)
	}

	function update() {
		Systems.update(entities)
	}

	onMount(async () =>
		initTestStage({
			canvas,
			init,
			update
		})
	)
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		width: 100%;
		height: 100%;
		background: #55a;
	}
</style>
