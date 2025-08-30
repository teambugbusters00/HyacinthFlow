# 🌿 AquaGuard AI - Water Hyacinth Prediction System

A comprehensive AI-powered system for predicting and monitoring water hyacinth infestations using machine learning, real-time data, and modern web technologies.

## 🚀 Features

- **Real-time ML Predictions**: Advanced machine learning models for water hyacinth risk assessment
- **Live Dashboard**: Real-time updates with Supabase integration
- **AI-Powered Insights**: OpenAI GPT integration for actionable recommendations
- **Modern Web Interface**: React-based frontend with Tailwind CSS
- **Robust Backend**: FastAPI with PostgreSQL database
- **Real-time Synchronization**: Live data updates across all connected clients

## 🧠 How the ML Model Works

### 📊 Data Processing Pipeline

```
Raw Environmental Data → Feature Engineering → Model Training → Prediction → Insights
```

### 🔬 ML Model Architecture

#### 1. **Data Collection & Preprocessing**
- **Input Features**: 9 environmental parameters
  - Latitude/Longitude (Geographic location)
  - Water Temperature (°C)
  - Water pH Level
  - Nutrient Concentration (mg/L)
  - Solar Exposure (0-1 scale)
  - Water Flow Rate (m/s)
  - Current Biomass Density (kg/m²)
  - Water Body Type (lake, river, pond, reservoir)
  - Season (spring, summer, autumn, winter)

#### 2. **Feature Engineering**
- **Categorical Encoding**: One-hot encoding for water body types and seasons
- **Geographic Features**: Distance calculations and regional clustering
- **Temporal Features**: Seasonal patterns and time-based transformations
- **Interaction Features**: Cross-feature relationships (temperature × nutrients)

#### 3. **Model Training Process**

##### **Hyperparameter Optimization**
```python
# Using Optuna for automated hyperparameter tuning
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=20)

# Best parameters found:
# Classification: SVM with C=0.16, kernel='linear'
# Regression: XGBoost with learning_rate=0.11, max_depth=2
```

##### **Model Ensemble**
- **Primary Model**: Support Vector Machine (SVM) for risk classification
- **Secondary Model**: XGBoost for biomass growth prediction
- **Fallback Models**: Random Forest and Neural Networks

#### 4. **Prediction Categories**

##### **Infestation Risk Levels**
- **🟢 LOW**: < 30% risk - Monitor occasionally
- **🟡 MEDIUM**: 30-70% risk - Regular monitoring required
- **🔴 HIGH**: > 70% risk - Immediate intervention needed

##### **Biomass Growth Prediction**
- **Range**: 0-500 kg/m²
- **Accuracy**: R² Score > 0.87
- **Precision**: ±15% prediction accuracy

### 🎯 Model Performance Metrics

#### Classification Results
```
Accuracy: 80.0%
Precision: 80%
Recall: 79%
F1-Score: 79%

Detailed Classification Report:
              precision    recall  f1-score   support

     LOW          0.83      0.84      0.83        51
   MEDIUM        0.77      0.68      0.72        44
    HIGH         0.80      0.82      0.81       105

    accuracy                           0.80       200
   macro avg       0.80      0.78      0.79       200
weighted avg       0.80      0.80      0.80       200
```

#### Regression Results
```
Mean Squared Error: 27.06
R² Score: 0.89
Prediction Accuracy: ±15%
```

### 🤖 AI Insights Generation

#### **OpenAI GPT Integration**
- **Model**: GPT-3.5-turbo
- **Purpose**: Generate actionable recommendations
- **Input**: ML predictions + environmental context
- **Output**: Human-readable insights and mitigation strategies

#### **Insight Categories**
1. **Immediate Actions**: Urgent interventions required
2. **Monitoring Recommendations**: Suggested observation frequency
3. **Prevention Strategies**: Long-term control measures
4. **Environmental Analysis**: Impact assessment and trends

## 🏗️ System Architecture

### Backend Architecture (FastAPI + SQLAlchemy)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FastAPI       │    │   ML Service    │    │   LLM Service   │
│   - REST API    │    │   - SVM Model   │    │   - GPT-3.5      │
│   - Validation  │    │   - XGBoost     │    │   - Insights     │
│   - CORS        │    │   - Prediction  │    │   - Analysis     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Supabase      │
                    │   PostgreSQL    │
                    │   Real-time     │
                    └─────────────────┘
```

### Frontend Architecture (React + Supabase)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Dashboard     │    │   Prediction    │
│   - Components  │    │   - Real-time   │    │   - Form        │
│   - State Mgmt  │    │   - Analytics   │    │   - Results     │
│   - Routing     │    │   - Charts      │    │   - Insights    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Supabase      │
                    │   Real-time     │
                    │   Subscriptions │
                    └─────────────────┘
```

## 📋 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Supabase account
- OpenAI API key (optional)

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure Environment**
```bash
# Copy and edit .env file
cp .env.example .env
# Add your Supabase credentials
```

3. **Create Database Tables**
```bash
python create_tables.py
```

4. **Start Backend Server**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Configure Supabase**
```javascript
// Update src/supabase.js with your credentials
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'
```

3. **Start Development Server**
```bash
npm run dev
```

## 🔄 API Endpoints

### Prediction Endpoints
- `POST /api/predict` - Create new prediction
- `GET /api/predictions` - Get all predictions
- `GET /api/predictions/{id}` - Get specific prediction

### Analytics Endpoints
- `GET /api/analytics/summary` - Prediction statistics
- `GET /api/feature-importance` - Model feature importance

### Insights Endpoints
- `POST /api/insights` - Generate AI insights
- `GET /api/insights/{id}` - Get prediction insights
- `POST /api/insights/trends` - Analyze trends

## 🎨 User Interface

### Prediction Form
- **Input Validation**: Real-time validation with helpful error messages
- **Geographic Mapping**: Interactive location selection
- **Parameter Guidance**: Tooltips and help text for each field

### Dashboard Features
- **Real-time Updates**: Live data synchronization
- **Interactive Charts**: Risk distribution and biomass trends
- **Analytics Cards**: Key metrics and KPIs
- **Prediction History**: Chronological prediction log

### Results Display
- **Risk Visualization**: Color-coded risk levels
- **Biomass Charts**: Growth prediction graphs
- **AI Insights**: Actionable recommendations
- **Export Options**: PDF and CSV export capabilities

## 🔐 Security & Authentication

### Supabase Security
- **Row Level Security (RLS)**: Database-level access control
- **JWT Authentication**: Secure token-based authentication
- **API Key Management**: Secure key rotation and management

### Data Protection
- **Encryption**: Data encrypted at rest and in transit
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API rate limiting and abuse prevention

## 📈 Performance Optimization

### ML Model Optimization
- **Model Quantization**: Reduced model size for faster inference
- **Batch Processing**: Efficient batch prediction handling
- **Caching**: Prediction result caching for repeated queries

### Database Optimization
- **Indexing**: Optimized database indexes for fast queries
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Optimized SQL queries for better performance

### Frontend Optimization
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized images and assets
- **Caching**: Browser caching for static assets

## 🚀 Deployment

### Production Deployment

1. **Backend Deployment**
```bash
# Using Docker
docker build -t aquaguard-backend .
docker run -p 8000:8000 aquaguard-backend
```

2. **Frontend Deployment**
```bash
# Build for production
npm run build

# Deploy to hosting service (Vercel, Netlify, etc.)
```

3. **Database Setup**
```bash
# Supabase handles database hosting
# Configure environment variables in production
```

## 🧪 Testing

### Unit Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Integration Tests
```bash
# API integration tests
pytest tests/integration/

# E2E tests
npm run test:e2e
```

## 📚 Documentation

### API Documentation
- **Swagger UI**: Interactive API documentation at `/docs`
- **ReDoc**: Alternative documentation at `/redoc`
- **OpenAPI Spec**: JSON specification available at `/openapi.json`

### Code Documentation
- **Docstrings**: Comprehensive Python docstrings
- **Type Hints**: Full type annotations
- **Comments**: Inline code documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Supabase**: Real-time database and authentication
- **FastAPI**: Modern Python web framework
- **React**: Frontend framework
- **OpenAI**: AI insights generation
- **Scikit-learn**: Machine learning algorithms
- **Optuna**: Hyperparameter optimization

## 📞 Support

For support and questions:
- **Email**: support@aquaguard.ai
- **Documentation**: [docs.aquaguard.ai](https://docs.aquaguard.ai)
- **Issues**: [GitHub Issues](https://github.com/aquaguard/ai/issues)

---

**Built with ❤️ for environmental conservation and sustainable water management**