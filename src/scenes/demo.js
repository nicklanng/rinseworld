/* globals THREE */

// TODO: Remove this and use component architecture
const onTextureLoaded = (scene) => (texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(5, 5)
  var geometry = new THREE.BoxGeometry(5, 5, 5)
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x01BE00,
    side: THREE.BackSide
  })
  // Align the skybox to the floor (which is at y=0).
  const skybox = new THREE.Mesh(geometry, material)
  skybox.position.y = 5 / 2
  scene.add(skybox)
}

export default (scene) => {
  var loader = new THREE.TextureLoader()
  loader.load('img/box.png', onTextureLoaded(scene))
}
