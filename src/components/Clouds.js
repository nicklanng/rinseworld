/* globals THREE */

import Component from 'core/component'

export default class Clouds extends Component {
  constructor (clouds, width, height) {
    super()
    this.clouds = clouds
    this.width = width
    this.height = height
  }

  loadScene (scene) {
    var geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneBufferGeometry(1000, 1000).rotateX(90 * THREE.Math.DEG2RAD))

    const positions = []
    for (var p = 0; p < this.clouds; p++) {
      var pX = Math.random() * this.width - this.width / 2
      var pY = Math.random() * 500 + 1000
      var pZ = Math.random() * this.width - this.width / 2

      positions.push(pX, pY, pZ)
    }
    geo.addAttribute('pos', new THREE.InstancedBufferAttribute(new Float32Array(positions), 3, 1))

    const vertexShader = `
      #define USE_FOG

      precision highp float;

      #ifdef USE_FOG
        varying float fogDepth;
      #endif

      attribute vec3 pos;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4( pos + position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;


        #ifdef USE_FOG
          fogDepth = -mvPosition.z;
        #endif
      }
    `

    const fragmentShader = `
      #define USE_FOG
      #define FOG_EXP2

      precision highp float;

      ${THREE.ShaderChunk[ 'common' ]}
      ${THREE.ShaderChunk[ 'fog_pars_fragment' ]}

      void main() {
        gl_FragColor = vec4(0.2, 0.616, 0.871, 1.0);
        ${THREE.ShaderChunk[ 'fog_fragment' ]}
        gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor);
      }
    `

    const uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib[ 'fog' ]
    ])

    console.log(fragmentShader)

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      fog: true
    })

    this.root = new THREE.Mesh(geo, mat)
    // this.root.position.set(-this.width / 2, 0, -this.width / 2)

    scene.add(this.root)
  }
}
