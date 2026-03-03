#!/bin/bash

# Image optimization script
# This script will convert PNG images to WebP format and compress them

echo "🖼️  Starting image optimization..."

# Check if cwebp is installed (WebP encoder)
if ! command -v cwebp &> /dev/null; then
    echo "Installing webp tools..."
    brew install webp
fi

# Create backup directory
mkdir -p public/backup-original-images
echo "📦 Creating backup of original images..."

# Find all PNG and JPG files and convert to WebP
find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read img; do
    # Skip if already in backup or optimized directory
    if [[ "$img" == *"backup-original-images"* || "$img" == *"/optimized/"* ]]; then
        continue
    fi

    # Get file size before
    size_before=$(du -h "$img" | cut -f1)

    # Copy to backup (keep folder structure flattened to avoid collisions)
    mkdir -p public/backup-original-images
    backup_path="public/backup-original-images/$(basename "$img")"
    cp "$img" "$backup_path" 2>/dev/null || true

    # Build optimized output path under public/optimized preserving relative path
    rel_path=${img#public/}
    out_dir="public/optimized/$(dirname "$rel_path")"
    mkdir -p "$out_dir"
    output="$out_dir/$(basename "${rel_path%.*}").webp"

    # Convert to WebP (quality 85 for good balance)
    cwebp -q 85 "$img" -o "$output" 2>/dev/null

    # Get file size after
    if [ -f "$output" ]; then
        size_after=$(du -h "$output" | cut -f1)
        echo "✅ Converted: $(basename "$img") ($size_before) → $(basename "$output") ($size_after)"
    fi
done

echo ""
echo "✨ Optimization complete!"
echo "📊 Check the file sizes:"
du -sh public/backup-original-images
du -sh public
echo ""
echo "Note: Original images backed up to public/backup-original-images/"
echo "Update your code to use .webp extensions for optimized loading"
