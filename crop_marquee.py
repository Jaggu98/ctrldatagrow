from PIL import Image

img = Image.open('public/marquee-preview.png')
w, h = img.size
crop = img.crop((0, 5400, w, 6100))
crop.save('public/marquee-crop.png')
print('Cropped successfully')
