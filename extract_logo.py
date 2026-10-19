from PIL import Image

p_logo = r"C:\Users\Mohithsai Malla\.gemini\antigravity\brain\2ec6628d-20a6-4a7a-b338-7bb889766797\.user_uploaded\media_1792331857631_f08c1a14.png"
img = Image.open(p_logo)

# Box for the CDG logo on the slide
# In slide 6, the black card has the logo on the left of the card
# Bounding box around the glowing CDG logo
box = (538, 305, 747, 396)
cropped = img.crop(box)
out_path = r"c:\Users\Mohithsai Malla\OneDrive\Desktop\ctrl+data+grow\public\images\cdg-glowing-logo.png"
cropped.save(out_path)
print(f"Logo saved: {cropped.size}")
