# 🐄 Cattle Breed Detection Project

An AI-powered web application for identifying cattle breeds using machine learning. This project uses TensorFlow.js and Teachable Machine to classify different cow and buffalo breeds.

## 🚀 Quick Start

### Method 1: Using the Batch File (Windows)
1. Double-click `run_server.bat`
2. The server will start automatically
3. Open your browser and go to `http://localhost:8000`

### Method 2: Using Python Directly
1. Open Command Prompt or Terminal
2. Navigate to the project directory
3. Run: `python server.py`
4. Open your browser and go to `http://localhost:8000`

### Method 3: Using Python's Built-in Server
1. Open Command Prompt or Terminal
2. Navigate to the project directory
3. Run: `python -m http.server 8000`
4. Open your browser and go to `http://localhost:8000`

## 📋 Requirements

- Python 3.x installed on your system
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for loading external libraries)

## 🎯 Features

### AI-Powered Classification
- **17 Cattle Breeds**: Supports identification of various cow and buffalo breeds
- **Real-time Analysis**: Fast prediction using optimized TensorFlow.js models
- **Confidence Scores**: Shows prediction confidence for each breed
- **Demo Mode**: Works even when AI model is not available

### Supported Breeds
**Cows:**
- Gir, Sahiwal, Nagori, Rathi, Hariana, Malvi, Kankarej, Mewati

**Buffaloes:**
- Murraha, Bhadawari, Pandharpuri, Toda, Nilli Ravi, Mehsana, Jaffarabadi, Surti, Nagpuri

### User Interface
- **Drag & Drop**: Easy image upload with drag and drop support
- **Camera Support**: Take photos directly from your device camera
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices
- **Multilingual**: English and Hindi language support
- **Breed Database**: Comprehensive information about each breed

## 🔧 How It Works

1. **Upload Image**: Drag and drop or select an image of a cow/buffalo
2. **AI Analysis**: The TensorFlow.js model analyzes the image
3. **Results**: Get top 3 breed predictions with confidence scores
4. **Learn More**: Click on any result to learn about that breed

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI/ML**: TensorFlow.js, Teachable Machine
- **Server**: Python HTTP Server
- **Styling**: Custom CSS with responsive design

### Project Structure
```
Internal_Hackathon/
├── index.html          # Main application page
├── about.html          # About page
├── app.js             # Main application logic
├── lang.js            # Language switching functionality
├── style.css          # Styling and responsive design
├── server.py          # Python server script
├── run_server.bat     # Windows batch file
├── model/             # AI model files
│   ├── model.json     # TensorFlow.js model
│   ├── metadata.json  # Model metadata
│   └── weights.bin    # Model weights
└── README.md          # This file
```

## 🐛 Troubleshooting

### Common Issues

**1. Model Not Loading**
- Check internet connection
- Ensure all model files are present in the `model/` directory
- Try refreshing the page
- The app will automatically switch to demo mode if model fails to load

**2. Images Not Uploading**
- Supported formats: JPG, PNG, WEBP
- Maximum file size: 10MB
- Try a different image or resize if too large

**3. Camera Not Working**
- Grant camera permissions when prompted
- Ensure you're using HTTPS or localhost
- Try a different browser if issues persist

**4. Server Won't Start**
- Make sure Python is installed and in your PATH
- Try a different port: `python server.py 8001`
- Check if port 8000 is already in use

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## 📱 Usage Tips

1. **Best Results**: Use clear, well-lit photos of cattle
2. **Image Quality**: Higher resolution images generally work better
3. **Angle**: Front or side view of the animal works best
4. **Background**: Try to minimize background distractions

## 🔒 Privacy & Security

- All image processing happens locally in your browser
- No images are uploaded to external servers
- No personal data is collected or stored

## 🤝 Contributing

This project was created for educational purposes. Feel free to:
- Report bugs or issues
- Suggest new features
- Improve the breed database
- Add support for more breeds

## 📄 License

This project is for educational and research purposes.

## 🙏 Acknowledgments

- **TensorFlow.js** team for the machine learning framework
- **Teachable Machine** for the model training platform
- **Unsplash** for placeholder images
- Agricultural research institutions for breed information

---

**Happy Cattle Identification! 🐄🔍**