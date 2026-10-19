import urllib.request
import os

os.makedirs('public/images', exist_ok=True)

images = {
    'hero-auditorium.png': 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1200&auto=format&fit=crop&q=80',
    'engagement-lecture.jpg': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
    'engagement-workshop.jpg': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    'engagement-talks.jpg': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80',
    'engagement-mentorship.jpg': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    'gallery-stage.jpg': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    'gallery-seminar.jpg': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    'gallery-interactive.jpg': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    'expert-rohit.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    'expert-priya.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    'expert-vikram.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    'expert-sneha.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'article-hackathon.jpg': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    'article-lecture.jpg': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    'article-tech.jpg': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in images.items():
    dest = os.path.join('public/images', name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded: {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")

print("Image download complete.")
