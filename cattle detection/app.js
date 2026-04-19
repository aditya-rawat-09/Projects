const URL = "./model/";
let model, maxPredictions;
let currentPrediction = null;

// Breed Information Database with Images
const breedInfo = {
    "Gir": {
        type: "Cow",
        origin: "Gujarat, India",
        characteristics: "Heat tolerant, good milk producer, distinctive humped back, reddish-brown color",
        milkYield: "10-12 liters/day",
        uses: "Milk production, drought power"
    },
    "Sahiwal": {
        type: "Cow", 
        origin: "Punjab, Pakistan",
        characteristics: "Reddish brown color, heat resistant, good milker, loose skin",
        milkYield: "8-10 liters/day",
        uses: "Milk production"
    },
    "Murraha": {
        type: "Buffalo",
        origin: "Haryana, India", 
        characteristics: "Black color, curved horns, high milk yield, heavy body",
        milkYield: "12-18 liters/day",
        uses: "Milk production, high fat content"
    },
    "Bhadawari": {
        type: "Buffalo",
        origin: "Uttar Pradesh, India",
        characteristics: "Small size, light brown color, hardy, curved horns",
        milkYield: "4-6 liters/day", 
        uses: "Milk production in harsh conditions"
    },
    "Pandharpuri": {
        type: "Buffalo",
        origin: "Maharashtra, India",
        characteristics: "Medium size, black color, good for drought conditions",
        milkYield: "6-8 liters/day",
        uses: "Milk production, agricultural work"
    },
    "Toda": {
        type: "Buffalo",
        origin: "Tamil Nadu, India",
        characteristics: "Small size, hardy, adapted to hilly regions",
        milkYield: "3-5 liters/day",
        uses: "Milk production in hilly areas"
    },
    "nilli ravi": {
        type: "Buffalo",
        origin: "Punjab, Pakistan",
        characteristics: "Large size, black color, high milk yield, white markings",
        milkYield: "15-20 liters/day",
        uses: "High milk production"
    },
    "Mehsana": {
        type: "Buffalo",
        origin: "Gujarat, India",
        characteristics: "Medium to large size, black color, good milk producer",
        milkYield: "8-12 liters/day",
        uses: "Milk production"
    },
    "jaffarabadi": {
        type: "Buffalo",
        origin: "Gujarat, India",
        characteristics: "Very large size, black color, curved horns, heavy milk producer",
        milkYield: "12-15 liters/day",
        uses: "Milk production, breeding"
    },
    "Surti": {
        type: "Buffalo",
        origin: "Gujarat, India",
        characteristics: "Medium size, black color, good milk quality",
        milkYield: "6-10 liters/day",
        uses: "Milk production"
    },
    "Nagpuri": {
        type: "Buffalo",
        origin: "Maharashtra, India",
        characteristics: "Medium size, black color, hardy breed",
        milkYield: "5-8 liters/day",
        uses: "Milk production, drought work"
    },
    "Nagori": {
        type: "Cow",
        origin: "Rajasthan, India",
        characteristics: "White to light grey color, drought resistant, good for arid regions",
        milkYield: "4-6 liters/day",
        uses: "Drought power, milk production"
    },
    "Rathi": {
        type: "Cow",
        origin: "Rajasthan, India",
        characteristics: "White with black patches, heat tolerant, good milker",
        milkYield: "6-8 liters/day",
        uses: "Milk production, drought work"
    },
    "HARIANA": {
        type: "Cow",
        origin: "Haryana, India",
        characteristics: "White to light grey color, good for drought, medium milk yield",
        milkYield: "6-10 liters/day",
        uses: "Drought power, milk production"
    },
    "MALVI": {
        type: "Cow",
        origin: "Madhya Pradesh, India",
        characteristics: "Light grey color, good drought animal, medium size",
        milkYield: "4-6 liters/day",
        uses: "Agricultural work, milk production"
    },
    "KANKAREJ": {
        type: "Cow",
        origin: "Gujarat, India",
        characteristics: "Silver grey color, good milker, heat tolerant",
        milkYield: "8-12 liters/day",
        uses: "Milk production, drought work"
    },
    "MEWATI": {
        type: "Cow",
        origin: "Haryana, India",
        characteristics: "Light grey color, compact body, good for drought",
        milkYield: "4-8 liters/day",
        uses: "Agricultural work, milk production",
        image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop&q=80"
    }
};

// Add images to existing breeds - Cow and Buffalo specific photos
breedInfo["Gir"].image = "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop&q=80";
breedInfo["Sahiwal"].image = "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop&q=80";
breedInfo["Murraha"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["Bhadawari"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["Pandharpuri"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["Toda"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["nilli ravi"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["Mehsana"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["jaffarabadi"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["Surti"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["Nagpuri"].image = "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop&q=80";
breedInfo["Nagori"].image = "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop&q=80";
breedInfo["Rathi"].image = "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop&q=80";
breedInfo["HARIANA"].image = "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop&q=80";
breedInfo["MALVI"].image = "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop&q=80";
breedInfo["KANKAREJ"].image = "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop&q=80";

// Enhanced Breeds Database Functions
let currentFilter = 'all';
let currentPage = 1;
const breedsPerPage = 6;
let filteredBreeds = [];

function displayBreedsDatabase() {
    updateBreedStats();
    updateBreedCounts();
    filterAndDisplayBreeds();
}

function updateBreedStats() {
    const breeds = Object.keys(breedInfo);
    const totalBreeds = breeds.length;
    
    // Calculate average milk yield
    let totalMilk = 0;
    let validMilkEntries = 0;
    
    breeds.forEach(breedName => {
        const milkYield = breedInfo[breedName].milkYield;
        const match = milkYield.match(/\d+/);
        if (match) {
            totalMilk += parseInt(match[0]);
            validMilkEntries++;
        }
    });
    
    const avgMilk = validMilkEntries > 0 ? Math.round(totalMilk / validMilkEntries) : 0;
    
    // Count unique countries
    const countries = new Set();
    breeds.forEach(breedName => {
        const origin = breedInfo[breedName].origin;
        const country = origin.split(',').pop().trim();
        countries.add(country);
    });
    
    document.getElementById('totalBreeds').textContent = totalBreeds;
    document.getElementById('avgMilk').textContent = avgMilk + 'L';
    document.getElementById('countries').textContent = countries.size;
}

function updateBreedCounts() {
    const breeds = Object.keys(breedInfo);
    const cowCount = breeds.filter(name => breedInfo[name].type === 'Cow').length;
    const buffaloCount = breeds.filter(name => breedInfo[name].type === 'Buffalo').length;
    
    document.getElementById('allCount').textContent = breeds.length;
    document.getElementById('cowCount').textContent = cowCount;
    document.getElementById('buffaloCount').textContent = buffaloCount;
}

function filterAndDisplayBreeds() {
    const searchTerm = document.getElementById('breedSearch')?.value.toLowerCase() || '';
    
    filteredBreeds = Object.keys(breedInfo).filter(breedName => {
        const breed = breedInfo[breedName];
        const matchesFilter = currentFilter === 'all' || breed.type.toLowerCase() === currentFilter;
        const matchesSearch = breedName.toLowerCase().includes(searchTerm) || 
                            breed.origin.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });
    
    displayBreedsPage();
}

function displayBreedsPage() {
    const grid = document.getElementById('breedsGrid');
    grid.innerHTML = '';
    
    const startIndex = (currentPage - 1) * breedsPerPage;
    const endIndex = startIndex + breedsPerPage;
    const breedsToShow = filteredBreeds.slice(startIndex, endIndex);
    
    breedsToShow.forEach((breedName, index) => {
        const breed = breedInfo[breedName];
        const card = createBreedCard(breedName, breed);
        card.style.animationDelay = `${index * 0.1}s`;
        grid.appendChild(card);
    });
    
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredBreeds.length / breedsPerPage);
    const pagination = document.getElementById('breedsPagination');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function createBreedCard(name, breed) {
    const card = document.createElement('div');
    card.className = `breed-card ${breed.type.toLowerCase()}`;
    
    card.innerHTML = `
        <div class="breed-header">
            <h3 class="breed-name">${name}</h3>
            <span class="breed-type">${breed.type}</span>
        </div>
        <div class="breed-details">
            <div class="detail-item">
                <span class="detail-label">Origin:</span>
                <span class="detail-value">${breed.origin}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Milk Yield:</span>
                <span class="detail-value">${breed.milkYield}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Features:</span>
                <span class="detail-value">${breed.characteristics.substring(0, 80)}${breed.characteristics.length > 80 ? '...' : ''}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Primary Use:</span>
                <span class="detail-value">${breed.uses}</span>
            </div>
        </div>
    `;
    
    // Add click event for detailed view
    card.addEventListener('click', () => {
        showBreedInfo(name);
    });
    
    card.style.cursor = 'pointer';
    
    return card;
}

function filterBreeds(type) {
    currentFilter = type;
    currentPage = 1;
    filterAndDisplayBreeds();
}

// Enhanced filter and search functionality
document.addEventListener('DOMContentLoaded', () => {
    displayBreedsDatabase();
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterBreeds(btn.dataset.filter);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('breedSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            filterAndDisplayBreeds();
        });
    }
    
    // Pagination
    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayBreedsPage();
        }
    });
    
    document.getElementById('nextPage')?.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredBreeds.length / breedsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayBreedsPage();
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

async function init() {
    console.log("Initializing Cattle Detection App...");
    
    // Always enable demo mode first
    enableDemoMode();
    
    // Try to load the real model in the background
    try {
        showLoading(true);
        console.log("Attempting to load AI model from:", URL);
        
        // Set a reasonable timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const modelCheck = await fetch(URL + "model.json", { 
            signal: controller.signal,
            cache: 'no-cache'
        });
        
        clearTimeout(timeoutId);
        
        if (modelCheck.ok) {
            model = await tmImage.load(URL + "model.json", URL + "metadata.json");
            maxPredictions = model.getTotalClasses();
            console.log("✅ AI Model loaded successfully with", maxPredictions, "classes");
            
            // Update UI to show AI is available
            document.getElementById('result').innerHTML = `
                <div class="alert alert-success">
                    <h3>🤖 AI Model Ready</h3>
                    <p>Advanced AI model loaded successfully! Upload an image to get accurate breed predictions.</p>
                </div>
            `;
        } else {
            throw new Error(`Model not accessible: ${modelCheck.status}`);
        }
        
    } catch (error) {
        console.log("AI model not available, using demo mode:", error.message);
        
        document.getElementById('result').innerHTML = `
            <div class="alert alert-info">
                <h3>📱 Demo Mode Active</h3>
                <p>AI model is not available, but you can still:</p>
                <ul style="text-align: left; margin: 1rem 0;">
                    <li>Upload images for demo predictions</li>
                    <li>Browse the comprehensive breeds database</li>
                    <li>Learn about different cattle breeds</li>
                </ul>
                <button onclick="document.getElementById('breeds').scrollIntoView({behavior: 'smooth'})" class="btn btn-primary">
                    Explore Breeds Database
                </button>
            </div>
        `;
    } finally {
        showLoading(false);
    }
}

function showLoading(show) {
    document.getElementById("loadingIndicator").style.display = show ? "block" : "none";
}

async function predict(image) {
    showLoading(true);
    try {
        const prediction = await model.predict(image);
        currentPrediction = prediction;
        
        // Sort predictions by probability and take top 3
        const topPredictions = prediction
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 3);

        displayPredictionResults(topPredictions, false); // false indicates real AI mode
        showLoading(false);
    } catch (error) {
        console.error("Prediction error:", error);
        showLoading(false);
        document.getElementById('result').innerHTML = `
            <div class="alert alert-warning">
                <h3>⚠️ Prediction Failed</h3>
                <p>There was an error processing your image. Please try again with a different image.</p>
            </div>
        `;
    }
}

let uploadedImage = null;

// Upload area drag and drop functionality
const uploadArea = document.getElementById('uploadArea');
const imageUpload = document.getElementById('imageUpload');
const previewSection = document.getElementById('previewSection');

uploadArea.addEventListener('click', () => {
    imageUpload.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        console.log('File dropped:', file.name, file.type, file.size);
        handleImageUpload(file);
    } else {
        alert('No files detected. Please try again.');
    }
});

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

function handleImageUpload(file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, or WEBP)');
        return;
    }
    
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        alert('File size too large. Please upload an image smaller than 10MB.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('preview');
        img.onload = function() {
            // Image loaded successfully
            previewSection.style.display = 'block';
            uploadedImage = img;
            
            // Clear previous results and show ready message
            document.getElementById('result').innerHTML = `
                <div class="alert alert-success">
                    <h3>📷 Image Ready</h3>
                    <p>Image uploaded successfully! Click "Analyze Image" to identify the breed.</p>
                </div>
            `;
            
            // Add visual feedback
            const analyzeBtn = document.getElementById('startBtn');
            analyzeBtn.style.animation = 'pulse 2s infinite';
            
            console.log('Image uploaded successfully:', {
                width: img.naturalWidth,
                height: img.naturalHeight,
                size: file.size,
                type: file.type
            });
        };
        
        img.onerror = function() {
            alert('Error loading image. Please try a different file.');
        };
        
        img.src = e.target.result;
    };
    
    reader.onerror = function() {
        alert('Error reading file. Please try again.');
    };
    
    reader.readAsDataURL(file);
}

// Start Prediction Button
document.getElementById("startBtn").addEventListener("click", () => {
    if (!uploadedImage) {
        document.getElementById('result').innerHTML = `
            <div class="alert alert-info">
                <h3>📷 No Image Selected</h3>
                <p>Please upload an image or use the camera to start analysis.</p>
            </div>
        `;
        return;
    }
    
    if (!model && window.demoPredict) {
        // Use demo mode
        window.demoPredict(uploadedImage);
    } else if (model) {
        // Use real model
        predict(uploadedImage);
    } else {
        document.getElementById('result').innerHTML = `
            <div class="alert alert-warning">
                <h3>🤖 AI Not Available</h3>
                <p>The AI model is not loaded and demo mode is not available. Please refresh the page or browse our breeds database instead!</p>
                <button onclick="document.getElementById('breeds').scrollIntoView({behavior: 'smooth'})" class="btn btn-primary">
                    View Breeds Database
                </button>
            </div>
        `;
    }
});

// Camera functionality
let stream = null;

document.getElementById("cameraBtn").addEventListener("click", async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("video").srcObject = stream;
        document.getElementById("cameraModal").style.display = "block";
    } catch (error) {
        alert("Camera access denied or not available");
    }
});

document.getElementById("captureBtn").addEventListener("click", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/jpeg', 0.8);
    const img = document.getElementById('preview');
    img.src = dataURL;
    previewSection.style.display = 'block';
    uploadedImage = img;
    
    // Clear previous results
    document.getElementById('result').innerHTML = '';
    
    // Close camera
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    document.getElementById('cameraModal').style.display = 'none';
});

// Breed info modal
function showBreedInfo(breedName) {
    const modal = document.getElementById("breedModal");
    const nameEl = document.getElementById("breedName");
    const infoEl = document.getElementById("breedInfo");
    
    nameEl.innerText = breedName;
    
    const info = breedInfo[breedName];
    if (info) {
        infoEl.innerHTML = `
            <h4>Type:</h4> <p>${info.type}</p>
            <h4>Origin:</h4> <p>${info.origin}</p>
            <h4>Characteristics:</h4> <p>${info.characteristics}</p>
            <h4>Milk Yield:</h4> <p>${info.milkYield}</p>
            <h4>Uses:</h4> <p>${info.uses}</p>
        `;
    } else {
        infoEl.innerHTML = "<p>Information not available for this breed.</p>";
    }
    
    modal.style.display = "block";
}



// Close modals
document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", function() {
        this.closest(".modal").style.display = "none";
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    });
});

// Close modal on outside click
window.addEventListener("click", function(event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    }
});

// Mobile menu toggle
document.getElementById("mobileMenuToggle").addEventListener("click", function() {
    const navMenu = document.getElementById("navMenu");
    const toggle = document.getElementById("mobileMenuToggle");
    
    navMenu.classList.toggle("active");
    toggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        const navMenu = document.getElementById("navMenu");
        const toggle = document.getElementById("mobileMenuToggle");
        
        navMenu.classList.remove("active");
        toggle.classList.remove("active");
    });
});

// Contact form submission
document.querySelector('.contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

// Demo mode function for when model is not available
function enableDemoMode() {
    console.log("Demo mode enabled");
    
    // Override the predict function with demo predictions
    window.demoPredict = function(image) {
        showLoading(true);
        
        // Simulate processing time
        setTimeout(() => {
            const allBreeds = Object.keys(breedInfo);
            const shuffled = allBreeds.sort(() => 0.5 - Math.random());
            const topPredictions = shuffled.slice(0, 3).map((breed, index) => {
                // Generate realistic confidence scores
                let confidence = Math.random() * 0.4 + 0.5; // 50-90%
                if (index === 0) confidence = Math.max(confidence, 0.7); // Top result at least 70%
                if (index > 0) confidence = confidence - (index * 0.15); // Decrease for lower ranks
                
                return {
                    className: breed,
                    probability: Math.max(0.1, confidence)
                };
            }).sort((a, b) => b.probability - a.probability);
            
            displayPredictionResults(topPredictions, true); // true indicates demo mode
            showLoading(false);
        }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
    };
}

function displayPredictionResults(topPredictions, isDemoMode = false) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Create results grid
    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'result-grid';
    
    topPredictions.forEach((p, index) => {
        const card = document.createElement('div');
        card.classList.add('prediction-card');
        if (index === 0) {
            card.classList.add('top');
        }

        const nameEl = document.createElement('div');
        nameEl.classList.add('prediction-name');
        nameEl.innerText = p.className;

        const probEl = document.createElement('div');
        probEl.classList.add('prediction-prob');
        probEl.innerText = (p.probability * 100).toFixed(1) + '% confidence';

        const barBg = document.createElement('div');
        barBg.classList.add('prediction-bar-bg');

        const barFill = document.createElement('div');
        barFill.classList.add('prediction-bar-fill');
        setTimeout(() => {
            barFill.style.width = (p.probability * 100) + '%';
        }, 100 + (index * 100));

        // Add breed info button
        const infoBtn = document.createElement('button');
        infoBtn.classList.add('breed-info-btn');
        infoBtn.innerText = 'View Details';
        infoBtn.onclick = () => showBreedInfo(p.className);

        barBg.appendChild(barFill);
        card.appendChild(nameEl);
        card.appendChild(probEl);
        card.appendChild(barBg);
        card.appendChild(infoBtn);

        resultsGrid.appendChild(card);
    });
    
    resultDiv.appendChild(resultsGrid);

    // Add summary section
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'prediction-summary';
    
    if (isDemoMode) {
        summaryDiv.innerHTML = `
            <h3>🎯 Demo Analysis Complete</h3>
            <p><strong>Demo Mode:</strong> This is a simulated prediction for demonstration purposes.</p>
            <p>The most likely breed appears to be <strong>${topPredictions[0].className}</strong> with ${(topPredictions[0].probability * 100).toFixed(1)}% confidence.</p>
            <p>Click "View Details" to learn more about each breed!</p>
        `;
    } else {
        summaryDiv.innerHTML = `
            <h3>🤖 AI Analysis Complete</h3>
            <p>Based on advanced AI analysis, the most likely breed is <strong>${topPredictions[0].className}</strong> with ${(topPredictions[0].probability * 100).toFixed(1)}% confidence.</p>
            <p>Click "View Details" to learn more about each breed!</p>
        `;
    }
    
    resultDiv.appendChild(summaryDiv);
}

init();

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = ['breeds', 'about', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                current = section;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        } else if (current === '' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
});
