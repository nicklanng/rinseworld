/* globals THREE */

export default () => new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
