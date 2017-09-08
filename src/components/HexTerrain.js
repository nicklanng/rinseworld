/* globals THREE */

import Component from 'core/component'

export default class HexTerrain extends Component {
  constructor (width, height, scale, heightmap) {
    super()
    this.width = width
    this.height = height
    this.scale = scale
    this.heightmap = heightmap
  }

  loadScene (scene) {
    const bufferedGeometry = new THREE.BufferGeometry()
    const vertices = this._buildVertices()
    const verts = new Float32Array(this._buildFaces(vertices))
    bufferedGeometry.addAttribute('position', new THREE.BufferAttribute(verts, 3))
    bufferedGeometry.computeVertexNormals()

    const darkGrayFlatMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
    })

    this.root = new THREE.Mesh(bufferedGeometry, darkGrayFlatMaterial)
    scene.add(this.root)

    // var geo = new THREE.WireframeGeometry(bufferedGeometry)
    // var mat = new THREE.LineBasicMaterial({ color: 0x0084d6, linewidth: 1 })
    // var wireframe = new THREE.LineSegments(geo, mat)
    // scene.add(wireframe)
  }

  _buildVertices () {
    const deltaX = this.width / this.heightmap.length
    const deltaY = this.height / this.heightmap[0].length

    const vertices = []

    for (var y = 0; y < this.heightmap[0].length; y++) {
      for (var x = 0; x < this.heightmap.length; x++) {
        var xCoord = deltaX * x - this.width / 2
        if (y % 2 === 1) {
          xCoord += deltaX / 2
        }
        var zCoord = (deltaY * y - this.height / 2) * Math.cos(0.5)
        var yCoord = (this.heightmap[x][y] / 255) * this.scale
        vertices.push(new THREE.Vector3(xCoord, yCoord, zCoord))
      }
    }

    // console.log(vertices)
    return vertices
  }

  _buildFaces (vertices) {
    const faces = []

    for (let y = 0; y < this.heightmap[0].length - 1; y++) {
      for (let x = 0; x < this.heightmap.length - 1; x++) {
        const v1 = vertices[this.heightmap.length * y + x]
        const v2 = vertices[this.heightmap.length * y + x + 1]
        const v3 = vertices[this.heightmap.length * (y + 1) + x]
        const v4 = vertices[this.heightmap.length * (y + 1) + x + 1]

        if (y % 2 === 0) {
          faces.push(
            v1.x, v1.y, v1.z,
            v3.x, v3.y, v3.z,
            v2.x, v2.y, v2.z,
            v2.x, v2.y, v2.z,
            v3.x, v3.y, v3.z,
            v4.x, v4.y, v4.z,
          )
        } else {
          faces.push(
            v1.x, v1.y, v1.z,
            v3.x, v3.y, v3.z,
            v4.x, v4.y, v4.z,
            v1.x, v1.y, v1.z,
            v4.x, v4.y, v4.z,
            v2.x, v2.y, v2.z,
          )
        }
      }
    }
    return faces
  }
}
