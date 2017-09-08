/* globals webvrui */

var uiOptions = {
  color: 'black',
  background: 'white',
  corners: 'square'
}

export default (engine) => {
  const vrButton = new webvrui.EnterVRButton(engine.renderer.domElement, uiOptions)
  vrButton.on('exit', function () {
    engine.camera.quaternion.set(0, 0, 0, 1)
    engine.camera.position.set(0, 1, 0)
  })
  vrButton.on('hide', () => { document.getElementById('ui').style.display = 'none' })
  vrButton.on('show', () => { document.getElementById('ui').style.display = 'inherit' })
  document.getElementById('vr-button').appendChild(vrButton.domElement)
  document.getElementById('magic-window').addEventListener('click', function () {
    vrButton.requestEnterFullscreen()
  })

  return vrButton
}
