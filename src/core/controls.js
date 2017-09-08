/* globals THREE */

export default (camera) => {
  const controls = new THREE.VRControls(camera)
  controls.standing = true
  return controls
}
