/* globals THREE */

import Component from 'core/component'

const SPEED = 0.001

export default class DemoCube extends Component {
  constructor (position, size) {
    super()
    this.position = position
    this.size = size
  }

  loadScene (scene) {
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size)
    const material = new THREE.MeshNormalMaterial()
    this.root = new THREE.Mesh(geometry, material)

    this.root.position.set(this.position.x, this.position.y, this.position.z)

    scene.add(this.root)
  }

  update (delta) {
    this.root.rotation.x -= SPEED * 2
    this.root.rotation.y -= SPEED
    this.root.rotation.z -= SPEED * 3
  }
}
