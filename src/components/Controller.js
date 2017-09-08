/* globals THREE */

const material = new THREE.MeshBasicMaterial({
  color: 0xFF4040,
  side: THREE.FrontSide
})

export default class Controller {
  constructor (renderer, scene, controllerReference) {
    controllerReference.standingMatrix = renderer.vr.getStandingMatrix()

    controllerReference.head = window.camera

    const controllerMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.005, 0.05, 0.1, 6),
        material
        )

    const handleMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.1, 0.03),
        material
      )

    controllerMesh.rotation.x = -Math.PI / 2
    handleMesh.position.y = -0.05
    controllerMesh.add(handleMesh)
    controllerReference.userData.mesh = controllerMesh//  So we can change the color later.
    controllerReference.add(controllerMesh)

    scene.add(controllerReference)
  }

  update () {

  }
}
