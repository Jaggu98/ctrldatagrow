import os
from PIL import Image

# Ensure directories
os.makedirs('public/assets', exist_ok=True)
os.makedirs('public/crops', exist_ok=True)

# 1. Save full logo
logo_path = 'C:/Users/Mohithsai Malla/.gemini/antigravity/brain/2ec6628d-20a6-4a7a-b338-7bb889766797/.user_uploaded/media_1792306469396_87a751d1.png'
logo = Image.open(logo_path)
logo.save('public/logo-full.png')

# 2. Crop emblem (CDG graphic with symbols)
# Logo is 1024x682
emblem = logo.crop((140, 70, 860, 360))
emblem.save('public/assets/cdg-emblem.png')

# 3. Horizontal brand header logo: emblem + Ctrl + Data + Grow
header_logo = logo.crop((60, 60, 960, 520))
header_logo.save('public/assets/logo-brand.png')

# 4. Inspect screenshot slices to analyze sections
screenshot_path = 'C:/Users/Mohithsai Malla/.gemini/antigravity/brain/2ec6628d-20a6-4a7a-b338-7bb889766797/.user_uploaded/media_1792306486108_73b1bbe2.png'
screenshot = Image.open(screenshot_path)
sw, sh = screenshot.size
print(f"Screenshot size: {sw}x{sh}")

# Slice into 10 vertical segments to inspect
segment_height = sh // 10
for i in range(10):
    box = (0, i * segment_height, sw, min((i + 1) * segment_height, sh))
    seg = screenshot.crop(box)
    seg.save(f'public/crops/slice_{i+1}.png')

print("Assets and slices generated successfully.")
