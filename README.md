# 🌱 Hyacinth Flow – From Weed to Wealth  

Transforming the invasive **water hyacinth** into **livelihood, clean energy, and eco-products** through an interactive AI-powered platform.  

🚀 Live Demo → [![Visit Site](https://img.shields.io/badge/Live-Site-brightgreen?style=for-the-badge&logo=vercel)](https://hyacinth-flow.vercel.app/#)  

---

## ✨ About the Project  

Water hyacinth clogs rivers, destroys biodiversity, and impacts farming communities.  
Instead of seeing it as waste, **Hyacinth Flow** reimagines it as a **resource**:  

- 🌿 Farmers harvest & trade hyacinth in batches (e.g., 100 kg).  
- 🧵 Fibers are processed into sustainable products (mats, handicrafts, textiles).  
- ⚡ Extra biomass is converted into clean biogas with a **70/30 or 80/20 revenue model**.  
- 🛒 An **online marketplace** connects eco-conscious buyers with local artisans.  

The platform is **community-first**, eco-conscious, and designed for **circular economy impact**.  

---

## 🖼️ Features  

✅ **Floating Fact Bubbles** → Real-time impact values (updated continuously).  
✅ **Farmer Rewards System** → Trade batches & unlock farming tools or clean-energy incentives.  
✅ **Circular Economy Model** → From weed → fiber → eco-products → clean energy.  
✅ **Marketplace** → Eco-products listed & sold directly.  
✅ **AI Insights** → Plain-language recommendations for farmers & NGOs.  
✅ **Interactive Design** → A floating tree that grows as users scroll.  

---

## 📊 Revenue Model  

- **Product Sales Commission** → 10–20% platform fee.  
- **Biogas Energy Sharing** → 20–30% revenue from biogas units.  
- **CSR & Partnerships** → With NGOs, government, and eco-brands.  

💡 Example: If ₹75,000 worth of products are sold, the platform earns ~₹11,000 commission while farmers & artisans keep the majority share.  

---

## 🌍 Impact  

- 👩‍🌾 **Farmers Empowered** – Additional income + rewards.  
- 🏞️ **Waterways Restored** – Cleaner lakes, improved biodiversity.  
- ♻️ **Eco-Products Created** – Mats, textiles, handicrafts.  
- ⚡ **Clean Energy** – Biogas units for households and communities.  

---

## 🛠️ Technology Stack  

### 🎨 Frontend  
- React 18 + Vite + Tailwind CSS + Framer Motion  
- Deployment → Vercel  
- Real-time UI with Supabase  

### ⚙️ Backend  
- FastAPI + SQLAlchemy + Pydantic + Uvicorn  
- REST APIs + Supabase integration  

### 📚 Database  
- Supabase PostgreSQL  
- Real-time subscriptions  
- Row-Level Security (RLS) enabled  

### 🧠 AI/ML/LLM  

#### 🔹 Machine Learning  
- **SVM Classifier** → Weed infestation risk (Accuracy: 80%)  
- **XGBoost Regressor** → Biomass growth forecasting (R² = 0.89)  
- **Random Forest** → Backup classification  
- **Neural Network** → Complex pattern fallback  

#### 🔹 Large Language Model (LLM)  
- **Model:** OpenAI GPT-3.5  
- **Uses:**  
  - Converts ML outputs into farmer-friendly advice  
  - Provides risk explanations (e.g., “Harvest in 10 days to avoid oxygen loss”)  
  - Generates awareness messages (SMS/WhatsApp style)  
  - Suggests market linkages for products (biogas, compost, handicrafts)  

---

## 🗄️ Database Schema (Supabase PostgreSQL)  

```sql
CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    water_temperature FLOAT NOT NULL,
    water_ph FLOAT NOT NULL,
    nutrient_level FLOAT NOT NULL,
    sunlight_exposure FLOAT NOT NULL,
    water_flow_rate FLOAT NOT NULL,
    current_biomass_density FLOAT NOT NULL,
    water_body_type VARCHAR(50) NOT NULL,
    season VARCHAR(20) NOT NULL,
    infestation_risk VARCHAR(20),
    biomass_growth FLOAT,
    insights TEXT
);
