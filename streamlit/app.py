import streamlit as st

st.set_page_config(
    page_title="Smart Parking AI",
    page_icon="🚗",
    layout="wide"
)

st.title("🚗 Smart Parking AI")

st.write(
    "AI-based parking availability and prediction system."
)

st.info(
    "AI/ML module will be added here."
)

st.subheader("Parking Information")

col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Total Slots", "100")

with col2:
    st.metric("Available Slots", "35")

with col3:
    st.metric("Occupied Slots", "65")

st.subheader("Future AI Features")

st.write("""
- Parking slot detection
- Vehicle detection using YOLO
- Occupancy prediction
- Future parking availability
- Camera-based parking monitoring
""")
