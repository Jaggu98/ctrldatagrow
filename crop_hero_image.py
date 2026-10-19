from PIL import Image, ImageChops

img = Image.open('C:/Users/Mohithsai Malla/.gemini/antigravity/brain/2ec6628d-20a6-4a7a-b338-7bb889766797/.user_uploaded/media_1792354265964_ae641415.png').convert('RGB')
print('Original Size:', img.size)

# Create a solid white background of the same size
bg = Image.new('RGB', img.size, (255, 255, 255))

# Difference between image and solid white
diff = ImageChops.difference(img, bg)

# Convert to grayscale and threshold to detect non-white
diff = ImageChops.add(diff, diff, 2.0, -50)
bbox = diff.getbbox()
print('Artwork Bounding Box:', bbox)

if bbox:
    # Add a small padding around the artwork
    pad = 8
    crop_box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(img.size[0], bbox[2] + pad),
        min(img.size[1], bbox[3] + pad)
    )
    cropped = Image.open('C:/Users/Mohithsai Malla/.gemini/antigravity/brain/2ec6628d-20a6-4a7a-b338-7bb889766797/.user_uploaded/media_1792354265964_ae641415.png').crop(crop_box)
    print('Cropped Size:', cropped.size)
    cropped.save('public/images/hero-graphic.png')
    print('Saved cropped public/images/hero-graphic.png successfully!')
else:
    print('Could not find bbox, saving original')
    img.save('public/images/hero-graphic.png')
