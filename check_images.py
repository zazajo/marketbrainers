# check_correct_structure.py
from pathlib import Path
import os

# Current working directory
CWD = Path.cwd()
print(f"Current working directory: {CWD}")
print(f"Directory name: {CWD.name}")

# Expected structure
if CWD.name == 'mb_og':
    BASE_DIR = CWD
    print(f"✓ Found correct base directory: {BASE_DIR}")
else:
    # Try to find mb_og
    BASE_DIR = Path(__file__).resolve().parent.parent
    print(f"Using resolved base: {BASE_DIR}")

print("\n" + "="*50)
print("Checking project structure:")
print("="*50)

# Check all critical directories
check_dirs = [
    (BASE_DIR / 'mb_site', 'Project folder (mb_site/)'),
    (BASE_DIR / 'mb_site' / 'static', 'Static files'),
    (BASE_DIR / 'mb_site' / 'static' / 'images', 'Images directory'),
    (BASE_DIR / 'mb_site' / 'templates', 'Templates directory'),
    (BASE_DIR / 'core', 'Core app'),
    (BASE_DIR / 'manage.py', 'Manage.py file'),
]

all_good = True
for path, description in check_dirs:
    if path.exists():
        print(f"✓ {description}: {path}")
        if path.is_dir():
            # List contents for important directories
            if 'images' in str(path):
                print(f"  Contains: {list(path.glob('*'))}")
            elif 'static' in str(path):
                print(f"  Contains: {[d.name for d in path.iterdir() if d.is_dir()]}")
    else:
        print(f"✗ {description}: NOT FOUND at {path}")
        all_good = False

print("\n" + "="*50)
print("Checking for your specific images:")
print("="*50)

# Check your images
your_images = [
    ('logo/abstract-logo.png', 'Abstract brain logo'),
    ('logo/typography-logo.png', 'Typography logo'),
    ('hero/hero-section-bg.jpg', 'Hero background'),
    ('features/3d-element.jpg', '3D element'),
    ('features/data-visualization.jpg', 'Data visualization'),
    ('features/feature-icons.png', 'Feature icons'),
    ('features/infographic-style.jpg', 'Infographic style'),
    ('features/service.jpg', 'Service illustration'),
    ('team/team-about.jpg', 'Team/about photo'),
    ('misc/cover-image.jpg', 'Cover image'),
]

images_dir = BASE_DIR / 'mb_site' / 'static' / 'images'
found_count = 0

for subpath, description in your_images:
    full_path = images_dir / subpath
    if full_path.exists():
        found_count += 1
        size_kb = full_path.stat().st_size / 1024
        print(f"✓ {description}: {size_kb:.1f} KB")
    else:
        print(f"✗ {description}: NOT FOUND")
        # Check if parent directory exists
        parent = full_path.parent
        if parent.exists():
            print(f"  Files in {parent.name}/: {[f.name for f in parent.glob('*')]}")

print(f"\nFound {found_count}/{len(your_images)} images")

if not all_good:
    print("\n" + "="*50)
    print("QUICK FIX COMMANDS:")
    print("="*50)
    print(f"cd {BASE_DIR}")
    print("mkdir -p mb_site/static/{css,js,images/{logo,hero,features,team,misc}}")
    print("mkdir -p mb_site/templates/core")
    print("\nThen move your images to:")
    print(f"{BASE_DIR}/mb_site/static/images/")