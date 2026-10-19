from PIL import Image

p_founder = r"C:\Users\Mohithsai Malla\.gemini\antigravity\brain\2ec6628d-20a6-4a7a-b338-7bb889766797\.user_uploaded\media_1792331913302_e10d2a7a.png"
img = Image.open(p_founder)

# Exact bounding box for the founder card
box = (49, 122, 386, 506)
cropped = img.crop(box)
out_path = r"c:\Users\Mohithsai Malla\OneDrive\Desktop\ctrl+data+grow\public\images\founder-jagadeesh.png"
cropped.save(out_path)
print(f"Refined founder portrait saved: {cropped.size}")
