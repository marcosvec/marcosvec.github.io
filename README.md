# Interactive 3D Dorm Room

A fully interactive 3D render of a dorm room built with Three.js, featuring modular GLB model loading and advanced performance optimizations.

## Features

### 🎥 Camera & Navigation
- **Corner-view camera** positioned for optimal room viewing
- Smooth orbit controls with damping
- Zoom and pan restrictions for realistic movement
- Responsive camera adjustments

### 🏷️ Interactive Elements
- **Hover labels** on all interactive objects
- **Click interactions** for drawers, doors, and furniture
- Smooth animations with easing functions
- Contextual information display

### ⚙️ Graphics Presets
- **Low/Medium/High** quality settings
- Dynamic shadow map resolution adjustment
- Adaptive anti-aliasing
- Performance-based quality scaling

### 📏 Measurement Tools
- **Measure mode** for distance calculations
- Click-to-measure functionality
- Real-time distance display in inches
- Visual measurement feedback

### 💥 Advanced Features
- **Exploded view** toggle for furniture parts
- **Reduce motion** accessibility support
- **FPS + VRAM overlay** with hideable display
- **Modular GLB model loading** system

### 🚀 Performance Optimizations
- Adaptive quality adjustment based on FPS
- Low-end device detection and optimization
- Texture compression support detection
- Memory management and cleanup
- GitHub Pages deployment optimizations

## File Structure

```
marcosvec.github.io/
├── interactive-room.html    # Main application file
├── model-loader.js         # Modular GLB model loading system
├── performance-optimizer.js # Performance optimization utilities
├── styles.css              # Main site styles
├── script.js               # Main site JavaScript
└── index.html              # Landing page
```

## Usage

### Basic Setup
1. Open `interactive-room.html` in a web browser
2. Use mouse to navigate around the room
3. Hover over objects for information
4. Click on drawers and doors to interact

### Controls
- **Mouse drag**: Look around
- **Scroll wheel**: Zoom in/out
- **Graphics preset**: Change quality settings
- **Measure mode**: Click two points to measure distance
- **Exploded view**: Toggle furniture part separation
- **GLB Models**: Switch between procedural and GLB models

### Model Integration
To use your Siemens NX → Blender → GLB models:

1. Place GLB files in a `models/` directory
2. Update `FURNITURE_CONFIG` in `model-loader.js`
3. Enable GLB models using the toggle button
4. Models will load dynamically with fallback to procedural

## Technical Details

### Architecture
- **Modular design** with separate concerns
- **State management** for all application data
- **Event-driven** interaction system
- **Performance monitoring** with adaptive quality

### Performance Features
- **Adaptive quality** based on device capabilities
- **Memory management** with proper disposal
- **CDN fallbacks** for reliable loading
- **Compression detection** for optimal delivery

### Accessibility
- **Reduce motion** preference detection
- **Keyboard navigation** support
- **Screen reader** friendly labels
- **High contrast** mode support

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Notes
- Optimized for GitHub Pages deployment
- Automatic quality adjustment for low-end devices
- Efficient memory usage with proper cleanup
- CDN fallbacks for reliable asset loading

## Development
Built with:
- Three.js r128
- Vanilla JavaScript (ES6+)
- CSS3 with modern features
- WebGL 1.0/2.0 support

## License
MIT License - feel free to use and modify for your projects.