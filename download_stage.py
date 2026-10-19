import urllib.request

urls = {
    'stage-keynote-1.jpg': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&auto=format&fit=crop&q=85',
    'stage-keynote-2.jpg': 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1600&auto=format&fit=crop&q=85'
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r, open(f'public/images/{name}', 'wb') as f:
            f.write(r.read())
        print(f'Downloaded {name}')
    except Exception as e:
        print(f'Failed {name}: {e}')
