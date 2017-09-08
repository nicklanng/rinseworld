/* globals THREE */

import 'babel-polyfill'

import Engine from 'core/engine'
import loadImage from 'loaders/image'
import imageToHeightmap from 'utilities/imageToHeightmap'
import webVRButton from 'ui/webVRButton'

import Player from 'components/Player'
import DemoCube from 'components/DemoCube'
import HexTerrain from 'components/HexTerrain'
import Clouds from 'components/Clouds'

require('three-instanced-mesh')(THREE)

const onLoad = async () => {
  const engine = new Engine()
  engine.appendDomElements()
  engine.registerDomEvents()
  engine.start()

  const demoCube = new DemoCube({x: 0.5, y: 1.5, z: -1}, 0.5)
  engine.registerComponent(demoCube)
  demoCube.setPosition(0, 10, 0)

  const heightmapImage = await loadImage('img/heightmap.jpg')
  const heightmap = imageToHeightmap(heightmapImage)

  const terrain = new HexTerrain(1024, 1024, 100, heightmap)
  engine.registerComponent(terrain)

  const clouds = new Clouds(60, 10000)
  engine.registerComponent(clouds)

  const player = new Player(engine.camera)
  engine.registerComponent(player)
  player.setPosition(0, 10, 0)

  webVRButton(engine)

  window.addEventListener('vr controller connected', function (event) {
    // new Controller(renderer, scene, event.detail)
  })
}

window.addEventListener('load', onLoad)
