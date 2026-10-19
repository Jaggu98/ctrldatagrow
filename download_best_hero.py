import urllib.request

# High quality professional auditorium / lecture hall photos
candidates = {
    'speaker-keynote.jpg': 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=1600&auto=format&fit=crop&q=85',
    'auditorium-crowd.jpg': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=85',
    'hall-presentation.jpg': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=85',
    'tech-speaker.jpg': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&auto=format&fit=crop&q=85'
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in candidates.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r, open(f'public/images/{name}', 'wb') as f:
            f.write(r.read())
        print(f'Successfully downloaded {name}')
    except Exception as e:
        print(f'Failed {name}: {e}')
