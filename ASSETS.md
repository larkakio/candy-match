# Assets Required

## Images

### 1. Icon (1024x1024 PNG)
- **Location**: `public/icon.png`
- **Requirements**: 
  - 1024x1024 pixels
  - PNG format
  - No transparency (Base.app requirement)
  - Readable at small sizes
  - Soap and knife design with gradient colors (purple → pink)

**Current**: SVG placeholder at `public/icon.svg` - Convert to PNG before deployment

### 2. Hero Image (1200x630 PNG/JPG)
- **Location**: `public/hero-image.png`
- **Requirements**:
  - 1200x630 pixels (1.91:1 aspect ratio)
  - PNG or JPG format
  - High quality
  - "Slice & Shine" title
  - Colorful layered soap visualization
  - No Base logo or team photos

**Current**: SVG placeholder at `public/hero-image.svg` - Convert to PNG before deployment

### 3. Screenshots (1284x2778 PNG)
- **Location**: `public/screenshot-*.png`
- **Requirements**:
  - 1284x2778 pixels (portrait orientation)
  - 3 screenshots highlighting key functionality
  - High quality

## Audio Files

### 1. Slice Sound
- **Location**: `public/sounds/slice.mp3`
- **Requirements**:
  - ASMR soap cutting sound
  - Soft, satisfying
  - Duration: ~0.5s
  - Size: ~50KB

### 2. Complete Sound
- **Location**: `public/sounds/complete.mp3`
- **Requirements**:
  - Level completion sound
  - Happy, energetic
  - Duration: ~1s
  - Size: ~50KB

### 3. Background Music (Optional)
- **Location**: `public/sounds/bg-music.mp3`
- **Requirements**:
  - Calm lo-fi music
  - Loopable
  - Volume: 30%
  - Size: <500KB

## Generation Options

1. **AI Generation**: Use DALL-E, Midjourney, or Stable Diffusion for images
2. **Design Tools**: Figma, Canva, or Adobe Illustrator
3. **Audio**: 
   - FreeSound.org for free sounds
   - ElevenLabs for AI-generated sounds
   - Create placeholder beep sounds programmatically

## Conversion Commands

To convert SVG to PNG:
```bash
# Using ImageMagick
convert -background white -size 1024x1024 public/icon.svg public/icon.png
convert -background white -size 1200x630 public/hero-image.svg public/hero-image.png
```

Or use online tools like CloudConvert or Inkscape.
