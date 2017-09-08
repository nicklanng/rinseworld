/* globals THREE */

import Component from 'core/component'

export default class Player extends Component {
  constructor (camera) {
    super()
    this.camera = camera
  }

  loadScene (scene) {
    this.root = new THREE.Object3D()
    this.root.add(this.camera)
    scene.add(this.root)
  }

  update (delta) {
  }
}
