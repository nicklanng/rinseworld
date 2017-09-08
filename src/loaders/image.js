/* globals THREE */
const loader = new THREE.ImageLoader()

export default async (url) =>
  new Promise((resolve, reject) =>
    loader.load(url, resolve, () => {}, reject)
  )
