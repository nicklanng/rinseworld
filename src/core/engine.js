/* globals THREE Stats */

import createRenderer from 'core/renderer'
import createCamera from 'core/camera'
import createControls from 'core/controls'
import createVREffect from 'core/vrEffect'

export default class Engine {
  constructor () {
    this.stats = new Stats()
    this.stats.showPanel(1)

    this.components = []

    this.clock = new THREE.Clock()
    this.renderer = createRenderer()
    this.camera = createCamera()
    this.controls = createControls(this.camera)
    this.effect = createVREffect(this.renderer)
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x000000, 0.00025)

    this.vrDisplay = null

    var ambientLight = new THREE.AmbientLight(0x101010)
    this.scene.add(ambientLight)
    var directionalLight = new THREE.DirectionalLight(0xcccccc)
    directionalLight.position.set(5, 30, 10)
    this.scene.add(directionalLight)

    this.camera.position.y = this.controls.userHeight
  }

  appendDomElements () {
    document.body.appendChild(this.renderer.domElement)
    document.body.appendChild(this.stats.dom)
  }

  registerDomEvents () {
    const onResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize, false)
    window.addEventListener('vrdisplaypresentchange', onResize, true)
  }

  registerComponent (component) {
    component.loadScene(this.scene)
    this.components.push(component)
  }

  async start () {
    await this._detectVRDisplay()

    if (this.vrDisplay == null) {
      throw new Error('VR Device not found')
    }

    this.vrDisplay.requestAnimationFrame((timestamp) => this.update(timestamp))
  }

  update (timestamp) {
    var dt = this.clock.getDelta()

    this.stats.begin()

    // if (this.vrButton.isPresenting()) {
    this.controls.update()
    // THREE.VRController.update()

    this.components.forEach(c => c.update(dt))
    // }

    this.effect.render(this.scene, this.camera)

    this.stats.end()

    this.vrDisplay.requestAnimationFrame((timestamp) => this.update(timestamp))
  }

  async _detectVRDisplay () {
    const displays = await navigator.getVRDisplays()

    if (displays.length === 0) {
      return
    }

    this.vrDisplay = displays[0]

    if (this.vrDisplay.stageParameters) {
      // setStageDimensions(vrDisplay.stageParameters)
    }
  }

}
