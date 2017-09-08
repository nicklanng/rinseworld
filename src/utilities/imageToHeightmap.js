export default (image) => {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  const imaged = context.getImageData(0, 0, image.width, image.height)
  const pix = imaged.data
  const data = new Array(image.height)
  for (let y = 0; y < image.height; y++) {
    data[y] = new Array(image.width)
    for (let x = 0; x < image.width; x++) {
      var pixIndex = (y * image.width + x) * 4
      var all = pix[pixIndex] + pix[pixIndex + 1] + pix[pixIndex + 2]
      data[y][x] = all / 3
    }
  }

  return data
}
