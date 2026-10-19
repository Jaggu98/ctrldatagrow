import urllib.request
import os

# Top tier professional auditorium conference photos
# 1. Tech keynotes in grand hall
# 2. Tech leader presenting to students
urls = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=85'
]

headers = {'User-Agent': 'Mozilla/5.0'}

for idx, u in enumerate(urls):
    dest = f'public/images/auditorium-option-{idx+1}.jpg'
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r, open(dest, 'wb') as f:
            f.write(r.read())
        print(f'Downloaded {dest}')
    except Exception as e:
        print(f'Error downloading {u}: {e}')

# Overwrite hero-auditorium.png with option 1
if os.path.exists('public/images/auditorium-option-1.jpg'):
    with open('public/images/auditorium-option-1.jpg', 'rb') as f1, open('public/images/hero-auditorium.png', 'wb') as f2:
        f2.write(f1.read())
    print('Replaced hero-auditorium.png with clean, professional keynote auditorium photo!')
