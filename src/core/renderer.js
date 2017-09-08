/* globals THREE */

export default () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor(0x000000)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  return renderer
}
