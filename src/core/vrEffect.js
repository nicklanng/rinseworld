/* globals THREE */

export default (renderer) => {
  const effect = new THREE.VREffect(renderer)
  effect.setSize(window.innerWidth, window.innerHeight)
  return effect
}
