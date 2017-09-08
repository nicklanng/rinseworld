var video = document.createElement('video')
var texture

video.autoplay = true
navigator.webkitGetUserMedia({video: true}, success)

function success (stream) {
  video.src = webkitURL.createObjectURL(stream)
}

if (video.readyState === video.HAVE_ENOUGH_DATA) {
  cont.clearRect(0, 0, 300, 200)
  cont.drawImage(video, 0, 0, 300, 200)

  texture = new THREE.Texture(canvas)
  texture.needsUpdate = true

  mat.map = texture
  mat.map.repeat.set(1 - (radius.value / 10), 1)
  cubeCam.updateCubeMap(renderer, scene)

  renderer.clear()
  renderer.render(scene, camera)
}
