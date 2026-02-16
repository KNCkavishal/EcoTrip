/* 🌿 MAIN CONTAINER */
.eco-container {
  min-height: 100vh;
  background: #ffffff;
  font-family: "Segoe UI", sans-serif;
  position: relative;
  overflow: hidden;
   display: flex;
  flex-direction: column;

}

/* 🍃 FLOATING LEAVES */
.leaf-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.leaf {
  position: absolute;
  font-size: 22px;
  opacity: 0.35;
  animation: leafFloat linear infinite;
}

.leaf:nth-child(1) { left: 8%;  animation-duration: 18s; }
.leaf:nth-child(2) { left: 22%; animation-duration: 24s; font-size: 26px; }
.leaf:nth-child(3) { left: 40%; animation-duration: 28s; }
.leaf:nth-child(4) { left: 58%; animation-duration: 20s; font-size: 24px; }
.leaf:nth-child(5) { left: 75%; animation-duration: 26s; }
.leaf:nth-child(6) { left: 92%; animation-duration: 30s; font-size: 20px; }

@keyframes leafFloat {
  from {
    top: -10%;
    transform: translateX(0) rotate(0deg);
  }
  to {
    top: 110%;
    transform: translateX(40px) rotate(360deg);
  }
}

/* 🔝 NAVBAR */
.eco-navbar {
  background-color: #1b5e20;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
  position: relative;
  z-index: 1;
}

.eco-logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
}

.eco-nav-links {
  list-style: none;
  display: flex;
  gap: 35px;
}

.eco-nav-links li {
  cursor: pointer;
  font-size: 1rem;
  color: white;
}

.eco-nav-links li:hover {
  color: #4f8f4f;
}

/* 🌍 HERO SECTION */
.eco-hero {
  display: flex;
  flex:1;
  align-items: center;
  justify-content: space-between;
  padding: 100px 80px;
  position: relative;
  z-index: 1;
}

/* 📝 TEXT */
.eco-text {
  max-width: 850px;
  width: 100%;
  min-height: 420px;   /* 🔥 increase height here */
  display: flex;
  flex-direction: column;
  justify-content: center;  /* vertically center content */
}



.eco-text h1 {
  font-size: 3.2rem;
  color: #4f8f4f;
  margin-bottom: 10px;
}

.eco-text p {
  margin-top: 25px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #555;
}

/* 🧊 GLASS SHADOW BOX */
.eco-shadow-box {
  background: rgba(255, 255, 255, 0.6);
  padding: 45px 60px;   /* 🔥 more space */
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(14px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.eco-shadow-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.18);
}

/* ================= BUTTON ROW ================= */

.eco-btn-row {
  display: flex;
  gap: 20px;
  margin-top: 35px;
  flex-wrap: wrap;
}

/* Base Professional Button */
.eco-btn {
  padding: 14px 28px;
  min-width: 190px;
  background: #4f8f4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* Hover Effect */
.eco-btn:hover {
  background: #3c7a3c;
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}


/* 🖼 IMAGE */
.eco-image img {
  width: 420px;
  max-width: 100%;
}

/* 🌱 BACKGROUND BLOB */
.eco-blob {
  position: absolute;
  right: -200px;
  top: 0;
  width: 650px;
  height: 650px;
  background: #f7f2cf;
  border-radius: 50%;
  z-index: 0;
}

/* 🌑 FOOTER */
.eco-footer {
  background-color: #0b3d2e !important;
  color: #e8f5e9;
  padding: 25px 0;
  font-size: 14px;
  margin-top: au;
  width: 100%;
  position: relative;
  z-index: 1;
}

.eco-footer p {
  margin: 0;
}

/* 🎬 PAGE ANIMATIONS */
.animate-page {
  animation: fadeUp 0.9s ease-out both;
}

.animate-text {
  animation: slideFromLeft 1.1s ease-out both;
}

.animate-image {
  animation: slideFromRight 1.3s ease-out both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideFromLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slideFromRight {
  from { opacity: 0; transform: translateX(50px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* 📱 RESPONSIVE */
@media (max-width: 900px) {
  .eco-hero {
    flex-direction: column;
    text-align: center;
  }

  .eco-image {
    margin-top: 40px;
  }

  .eco-nav-links {
    display: none;
  }

  .eco-shadow-box {
    padding: 28px 24px;
  }
}
.eco-btn-secondary {
  background: transparent;
  border: 2px solid #2ecc71;
  color: #2ecc71;
}

.eco-btn-secondary:hover {
  background: #2ecc71;
  color: white;
}
/* 🌍 NAVBAR ACTION BUTTON */
.eco-nav-actions {
  display: flex;
  align-items: center;
}

.eco-nav-btn {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.eco-nav-btn:hover {
  transform: translateY(-3px);
  background: linear-gradient(135deg, #27ae60, #1e8449);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
}