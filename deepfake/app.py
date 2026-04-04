import streamlit as st
from PIL import Image
from transformers import pipeline

# --- Page Config ---
st.set_page_config(page_title="AI Digital Safety Guardian", page_icon="🛡️", layout="wide")

# --- Load AI Models ---
# st.cache_resource ensures we only download and load these heavy models once!
@st.cache_resource
def load_models():
    # 1. Text Model for Phishing/Spam (NLP)
    text_model = pipeline("text-classification", model="mrm8488/bert-tiny-finetuned-sms-spam-detection")
    
    # 2. Vision Model for Deepfake Detection (Computer Vision)
    # Uses a Vision Transformer trained on real vs. fake faces
    vision_model = pipeline("image-classification", model="dima806/deepfake_vs_real_image_detection")
    
    return text_model, vision_model

with st.spinner("Waking up the AI models... (This takes a moment on the first run)"):
    text_classifier, deepfake_classifier = load_models()

# --- UI Layout ---
st.title("🛡️ AI Digital Safety Guardian")
st.markdown("Protecting you from digital fraud, phishing, and deepfakes.")

# Create tabs
tab1, tab2 = st.tabs(["📩 Fraud & Phishing Detection", "📸 Deepfake Scanner"])

# --- TAB 1: Fraud Detection ---
with tab1:
    st.header("Analyze Messages & Emails")
    user_text = st.text_area("Paste a suspicious message, email, or link here:", height=150)
    
    if st.button("Analyze Text", type="primary"):
        if user_text:
            with st.spinner("Analyzing linguistic patterns..."):
                result = text_classifier(user_text)[0]
                
                label = result['label'] 
                score = result['score']
                
                # mrm8488 model uses LABEL_1 for spam/fraud
                is_fraud = label == 'LABEL_1' 
                risk_percentage = score * 100 if is_fraud else (1 - score) * 100

                st.subheader("Analysis Result")
                cols = st.columns(2)
                
                with cols[0]:
                    st.metric(label="Risk Score", value=f"{risk_percentage:.1f}%")
                    st.progress(int(risk_percentage))
                    
                with cols[1]:
                    if is_fraud:
                        st.error("🚨 HIGH RISK: This message exhibits strong indicators of fraud or phishing.")
                        st.markdown("**AI Insights:** Pattern matches known spam/phishing datasets. Avoid clicking links.")
                    else:
                        st.success("✅ LOW RISK: This message appears safe.")
                        st.markdown("**AI Insights:** Standard conversational tone detected.")
        else:
            st.warning("Please enter some text to analyze.")

# --- TAB 2: Deepfake Scanner ---
with tab2:
    st.header("Scan Images for AI Manipulation")
    st.markdown("*Note: Works best on images containing human faces.*")
    
    uploaded_file = st.file_uploader("Upload an image (JPG, PNG)", type=["jpg", "jpeg", "png"])
    
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        
        cols = st.columns(2)
        with cols[0]:
            st.image(image, caption="Uploaded Media", use_container_width=True)
            
        with cols[1]:
            if st.button("Run Deepfake Analysis", type="primary"):
                with st.spinner("Scanning for pixel inconsistencies and AI artifacts..."):
                    # Run the image through the Vision Transformer
                    results = deepfake_classifier(image)
                    
                    # The pipeline returns a list of dicts: [{'label': 'Fake', 'score': 0.99}, ...]
                    # Let's find the score for the 'Fake' label
                    fake_score = next((item['score'] for item in results if item['label'].lower() == 'fake'), 0)
                    is_fake = fake_score > 0.5
                    
                    st.subheader("Analysis Result")
                    st.metric(label="Deepfake Probability", value=f"{fake_score * 100:.1f}%")
                    st.progress(int(fake_score * 100))
                    
                    if is_fake:
                        st.error("🚨 MANIPULATION DETECTED: This image is highly likely to be AI-generated or a deepfake.")
                    else:
                        st.success("✅ AUTHENTIC: High probability this is a real photograph.")