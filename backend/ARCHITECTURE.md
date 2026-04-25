# ARAIS Backend Architecture Blueprint

## 📋 Overview

This document outlines the backend architecture for the Adaptive Real-World Anomaly Intelligence System (ARAIS). The backend is a Python-based system running FastAPI that manages the complete ML pipeline from data ingestion to model serving with real-time evaluation and adaptive orchestration.

---

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Electron UI (React)                          │
│              (User Interface & Visualization)                   │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTP/IPC
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                   FastAPI Server (Port 8000)                    │
│                    (Python Backend)                             │
│                                                                 │
│  ┌─────────────┬─────────────┬─────────────┬──────────────┐   │
│  │ Routes      │ Controllers │ Services    │ Utils        │   │
│  │ (API)       │ (Logic)     │ (Business)  │ (Helpers)    │   │
│  └─────────────┴─────────────┴─────────────┴──────────────┘   │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │         PIPELINE LAYERS (Data Processing)              │   │
│  │                                                        │   │
│  │  1. Ingestion → 2. Parsing → 3. Preprocessing         │   │
│  │      ↓             ↓              ↓                   │   │
│  │  4. OOD Detection → 5. Orchestrator → 6. Model Infer  │   │
│  │      ↓             ↓              ↓                   │   │
│  │  7. Uncertainty → 8. Evaluation → 9. Feedback        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │           ML MODELS & ENGINES                          │   │
│  │                                                        │   │
│  │  - Model Pool (Multiple anomaly detectors)            │   │
│  │  - OOD Detection Engine                               │   │
│  │  - Uncertainty Estimator                              │   │
│  │  - Evaluation Metrics Engine                          │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│              Storage Layer (Local Database)                     │
│                                                                 │
│  - SQLite (Configuration, Logs, Metrics)                       │
│  - Model Checkpoints (Local filesystem)                        │
│  - Dataset Cache (Preprocessed data)                           │
│  - Feedback Queue (User corrections)                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
backend/
├── ARCHITECTURE.md                 # This file
├── requirements.txt                # Python dependencies
├── server.py                       # FastAPI application entry point
│
├── routes/                         # API endpoints
│   ├── __init__.py
│   ├── ingestion.py               # File upload & stream endpoints
│   ├── inference.py               # Model prediction endpoints
│   ├── evaluation.py              # Evaluation & monitoring endpoints
│   ├── feedback.py                # User feedback collection
│   └── health.py                  # System health & status
│
├── controller/                     # Business logic controllers
│   ├── __init__.py
│   ├── pipeline_controller.py     # Orchestrates data flow
│   ├── model_controller.py        # Model selection & management
│   ├── evaluation_controller.py   # Metrics & performance tracking
│   └── feedback_controller.py     # Learning from user input
│
├── services/                       # Core service implementations
│   ├── __init__.py
│   │
│   ├── ingestion_service.py       # Layer 1: Data ingestion
│   ├── parsing_service.py         # Layer 2: Data parsing
│   ├── preprocessing_service.py   # Layer 3: Preprocessing & normalization
│   │
│   ├── ood_detection_service.py   # Layer 4: OOD detection
│   ├── orchestrator_service.py    # Layer 5: Adaptive orchestration
│   │
│   ├── ml_engine/
│   │   ├── __init__.py
│   │   ├── model_pool.py          # Layer 6: Model management
│   │   ├── inference.py           # Layer 6: Model inference
│   │   ├── uncertainty.py         # Layer 7: Uncertainty estimation
│   │   └── base_detector.py       # Abstract base for anomaly detectors
│   │
│   ├── evaluation_service.py      # Layer 8: Evaluation & metrics
│   ├── feedback_service.py        # Layer 9: Feedback loop integration
│   │
│   └── pipeline/
│       ├── __init__.py
│       ├── data_pipeline.py       # Coordinates all layers
│       └── validators.py          # Input/output validation
│
├── middleware/                     # Application middleware
│   ├── __init__.py
│   ├── auth.py                    # (Optional) Authentication
│   ├── cors.py                    # CORS configuration
│   ├── error_handler.py           # Global error handling
│   └── db.py                      # Database connection pool
│
├── model/                          # Data models & schemas
│   ├── __init__.py
│   ├── schemas.py                 # Pydantic schemas for API
│   ├── entities.py                # Database entities/ORM models
│   └── constants.py               # System-wide constants
│
├── ml_training/                    # ML model training & management
│   ├── dataset/                   # Dataset tools
│   │   ├── builder.py             # Dataset construction
│   │   └── cleaner.py             # Data cleaning utilities
│   ├── datasets/                  # Pre-trained datasets
│   ├── ml_models/                 # Model definitions
│   │   ├── lstm_detector.py       # LSTM-based anomaly detector
│   │   ├── isolation_forest.py    # Isolation Forest detector
│   │   ├── autoencoder.py         # Autoencoder detector
│   │   └── statistical.py         # Statistical methods (Z-score, IQR)
│   └── model_script/              # Training & evaluation scripts
│
├── config/                         # Configuration files
│   ├── __init__.py
│   ├── settings.py                # Environment & app settings
│   ├── logging.py                 # Logging configuration
│   └── database.py                # Database configuration
│
└── utils/                          # Utility functions
    ├── __init__.py
    ├── logger.py                  # Logging setup
    ├── metrics.py                 # Metrics calculation helpers
    ├── data_utils.py              # Data manipulation utilities
    ├── file_handler.py            # File I/O helpers
    └── exceptions.py              # Custom exceptions
```

---

## 🔄 Pipeline Layer Architecture

### Layer 1: Ingestion Service

**File**: `services/ingestion_service.py`

**Responsibilities**:

- Accept file uploads (CSV, JSON, HDF5)
- Stream data from API endpoints
- Generate synthetic test streams
- Validate input format and schema
- Store raw data in temporary cache

**Outputs**:

- Timestamped data buffers
- File metadata (size, format, schema)
- Ingestion logs

---

### Layer 2: Parsing Service

**File**: `services/parsing_service.py`

**Responsibilities**:

- Extract timestamp column
- Identify value columns (univariate or multivariate)
- Create structured data representation
- Handle missing values
- Generate data statistics (mean, variance, distribution)

**Outputs**:

- Parsed data objects
- Column metadata
- Initial statistics

---

### Layer 3: Preprocessing Service

**File**: `services/preprocessing_service.py`

**Responsibilities**:

- Apply windowing (sliding window generation)
- Normalize values (z-score, min-max scaling)
- Optional drift/noise injection (for evaluation)
- Generate feature vectors
- Compute reference statistics for OOD comparison

**Outputs**:

- Preprocessed windows
- Feature vectors
- Training statistics cache

---

### Layer 4: OOD Detection Service

**File**: `services/ood_detection_service.py`

**Responsibilities**:

- Compare input statistics against training distribution
- Calculate Mahalanobis distance or KL divergence
- Flag out-of-distribution inputs
- Route OOD samples to triage pipeline

**Decision Point**:

- **In-Distribution** → Continue to Orchestrator
- **Out-of-Distribution** → Route to Novel Anomaly Triage

**Outputs**:

- OOD flag (boolean)
- OOD score (continuous)
- Routing decision

---

### Layer 5: Orchestrator Service

**File**: `services/orchestrator_service.py`

**Responsibilities**:

- Monitor system metrics (CPU, memory, latency)
- Track user-defined risk tier (LOW/MEDIUM/HIGH)
- Maintain cost-accuracy frontier lookup table
- Select appropriate model from pool based on:
  - Current latency budget
  - System resource availability
  - Risk tier
  - Recent false-positive rate
- Implement adaptive switching logic

**Decision Matrix**:
| Condition | Decision |
|-----------|----------|
| High latency + Normal resources | Switch to faster model |
| Normal latency + HIGH risk tier | Switch to highest-accuracy model |
| Low CPU + Normal load | Allow heavier model |
| High CPU load | Force lightweight model |

**Outputs**:

- Selected model name
- Orchestration decision log

---

### Layer 6: Model Inference Layer

**File**: `services/ml_engine/inference.py`

**Responsibilities**:

- Load selected model from model pool
- Execute inference on preprocessed data
- Return anomaly classification
- Provide confidence score
- Track inference latency

**Available Models** (managed in `ml_models/`):

- LSTM-based detector
- Isolation Forest
- Autoencoder
- Statistical methods (Z-score, IQR)

**Outputs**:

- Anomaly flag (NORMAL/ANOMALY)
- Confidence score [0, 1]
- Raw model outputs

---

### Layer 7: Uncertainty & Validation Layer

**File**: `services/ml_engine/uncertainty.py`

**Responsibilities**:

- Estimate epistemic uncertainty (model's self-doubt)
- Combine model confidence with uncertainty
- Flag high-uncertainty predictions
- Mark predictions as "uncertain anomaly" if confidence is low
- Generate risk indicators

**Uncertainty Metrics**:

- Model entropy
- Prediction confidence interval
- Ensemble disagreement (if using multiple models)

**Outputs**:

- Uncertainty score
- Adjusted confidence
- Risk flag (UNCERTAIN/RELIABLE)

---

### Layer 8: Evaluation Layer

**File**: `services/evaluation_service.py`

**Responsibilities**:

- Track real-time performance metrics:
  - True Positive Rate (sensitivity)
  - False Positive Rate
  - Precision, Recall, F1-score
  - ROC-AUC
- Monitor model performance under different noise/drift levels
- Track latency histograms
- Log model switch events
- Build cost-accuracy frontier profile
- Generate live performance reports

**Metrics Tracked**:

- Per-model accuracy
- Per-model latency
- False positive trends
- System stability metrics

**Outputs**:

- Performance report
- Cost-accuracy frontier updates
- Live metrics dashboard data

---

### Layer 9: Feedback Loop

**File**: `services/feedback_service.py`

**Responsibilities**:

- Accept user corrections (e.g., "this is NOT an error")
- Store corrections in feedback queue
- Identify patterns in corrections
- Trigger retraining when threshold is met
- Update training dataset incrementally
- Track feedback-driven improvements

**Outputs**:

- Feedback entry (logged)
- Retraining trigger signals

---

### Layer 10: Storage Layer

**File**: `middleware/db.py`

**Responsibilities**:

- Manage SQLite/MongoDB connections
- Store:
  - Uploaded files (cache)
  - Inference results
  - Performance metrics
  - User feedback
  - Model checkpoints metadata
  - System logs

**Database Schema** (see `model/entities.py`)

---

### Layer 11: Output Layer

**Implemented in**: `routes/inference.py` + Controller

**Responsibilities**:

- Format results for API response
- Include all signals:
  - Anomaly flag
  - Confidence score
  - Uncertainty level
  - OOD proximity
  - Risk indicators
- Generate downloadable evaluation reports
- Push real-time updates to UI via WebSocket (optional)

**Example Output**:

```json
{
  "anomaly": true,
  "confidence": 0.92,
  "uncertainty": 0.05,
  "risk_level": "RELIABLE",
  "ood_flag": false,
  "model_used": "lstm_detector",
  "timestamp": "2026-04-25T10:30:00Z",
  "processing_latency_ms": 12
}
```

---

## 🎯 Key Components

### Model Pool Management (`services/ml_engine/model_pool.py`)

**Responsibilities**:

- Load/cache multiple anomaly detection models
- Track model metadata (accuracy, speed, memory)
- Provide model selection interface
- Update cost-accuracy frontier based on evaluation results

**Models Available**:

1. **LSTM Detector** - Deep learning, high accuracy, slower
2. **Isolation Forest** - Fast, good for high-dimensional data
3. **Autoencoder** - Reconstruction-based, flexible
4. **Statistical** - Simple, fast, baseline reference

---

### Model Controller (`controller/model_controller.py`)

**Responsibilities**:

- Coordinate model selection with orchestrator
- Manage model lifecycle (load, infer, unload)
- Track active model performance
- Trigger model switching when needed

---

### Pipeline Controller (`controller/pipeline_controller.py`)

**Responsibilities**:

- Orchestrate data flow through all 11 layers
- Coordinate between services
- Handle error propagation
- Log pipeline execution
- Return structured results to API routes

---

### Evaluation Controller (`controller/evaluation_controller.py`)

**Responsibilities**:

- Compute real-time metrics
- Maintain performance profiles per model
- Generate evaluation reports
- Update adaptive orchestration parameters

---

## 🔌 API Routes Structure

### `routes/ingestion.py`

```
POST   /api/upload            → Upload file for analysis
POST   /api/stream/start      → Start synthetic stream
GET    /api/stream/status     → Check stream status
POST   /api/stream/stop       → Stop stream
```

### `routes/inference.py`

```
POST   /api/infer             → Run inference on data
GET    /api/infer/{id}        → Get inference result
GET    /api/models/active     → Get currently active model
```

### `routes/evaluation.py`

```
GET    /api/metrics           → Get real-time performance metrics
GET    /api/evaluation/report → Generate evaluation report
GET    /api/model-switch-log  → Get model adaptation history
```

### `routes/feedback.py`

```
POST   /api/feedback          → Submit user correction
GET    /api/feedback/queue    → View pending feedback
POST   /api/retrain           → Trigger retraining
```

### `routes/health.py`

```
GET    /api/health            → System health status
GET    /api/status            → Full system status
```

---

## 🛠️ Configuration & Settings

**File**: `config/settings.py`

**Key Settings**:

- `MODEL_DIR`: Path to model checkpoints
- `DATA_DIR`: Path to data cache
- `FASTAPI_PORT`: Server port (default 8000)
- `BATCH_SIZE`: Inference batch size
- `OOD_THRESHOLD`: Mahalanobis distance threshold
- `LATENCY_BUDGET_MS`: Target inference time
- `RISK_TIER`: Default risk level (LOW/MEDIUM/HIGH)
- `ENABLE_UNCERTAINTY`: Enable uncertainty estimation
- `EVAL_UPDATE_FREQUENCY`: Metrics update interval

---

## 🚀 Deployment & Startup

**Entry Point**: `server.py`

**Initialization Order**:

1. Load configuration
2. Initialize logger
3. Connect to database
4. Load pre-trained models into memory
5. Initialize orchestrator (cost-accuracy table)
6. Start FastAPI server on port 8000
7. Ready for Electron IPC calls

**Shutdown Cleanup**:

- Save current metrics to database
- Close database connections
- Unload models from memory

---

## 📊 Data Schemas

See `model/schemas.py` for Pydantic schemas:

- `FileUploadRequest`
- `InferenceRequest`
- `InferenceResponse`
- `EvaluationMetrics`
- `FeedbackEntry`
- `SystemStatus`

---

## 🔒 Error Handling

**File**: `middleware/error_handler.py`

**Exception Hierarchy** (see `utils/exceptions.py`):

- `ARaisException` (base)
  - `DataIngestionError`
  - `PreprocessingError`
  - `OODDetectionError`
  - `ModelInferenceError`
  - `EvaluationError`
  - `StorageError`

---

## 📝 Logging

**File**: `config/logging.py`

**Log Levels**:

- DEBUG: Detailed pipeline execution
- INFO: Layer transitions, model switches
- WARNING: High uncertainty, OOD flags
- ERROR: Processing failures
- CRITICAL: System failures

**Logs Stored**:

- Console output
- File: `logs/arais.log`
- Database: Performance metrics table

---

## 🔗 Integration Points

### Electron → FastAPI

- HTTP requests on `localhost:8000`
- Electron IPC bridges API calls
- State updates via JSON responses

### Python Backend → Storage

- Asynchronous writes to SQLite
- Model checkpoints stored in filesystem
- Metrics aggregated periodically

### ML Engine → Orchestrator

- Model selection based on runtime metrics
- Cost-accuracy frontier lookup
- Feedback-driven parameter updates

---

## ⚡ Performance Considerations

- **Inference Latency Target**: <50ms per inference
- **Batch Processing**: Group multiple inferences
- **Model Caching**: Keep models in memory
- **Async I/O**: Use async database queries
- **Resource Monitoring**: Track CPU/memory usage

---

## 🧪 Testing Strategy

- Unit tests: Individual service layer tests
- Integration tests: Full pipeline tests
- Performance tests: Latency benchmarks
- Evaluation tests: Metrics accuracy

---

## 📚 Next Steps for Implementation

1. **Setup**:
   - Configure `requirements.txt` with dependencies
   - Setup database schema
   - Create model checkpoint storage

2. **Core Layers**:
   - Implement ingestion → preprocessing pipeline
   - Build OOD detection engine
   - Setup orchestrator with cost-accuracy frontier

3. **ML Integration**:
   - Load/adapt pre-trained models
   - Implement model selection logic
   - Setup uncertainty estimation

4. **Evaluation & Feedback**:
   - Build metrics calculation engine
   - Implement feedback collection
   - Setup retraining triggers

5. **API & Integration**:
   - Create FastAPI routes
   - Connect to Electron frontend
   - Setup WebSocket for real-time updates (optional)

6. **Testing**:
   - Unit test each service
   - Integration test full pipeline
   - Performance benchmarking

---

## 📞 Dependencies

Will be defined in `requirements.txt`:

- FastAPI (web framework)
- Pydantic (data validation)
- SQLAlchemy (ORM)
- NumPy, Pandas (data processing)
- scikit-learn (ML models)
- PyTorch or TensorFlow (deep learning)
- SQLite3 (database)

---

**Last Updated**: April 25, 2026  
**Status**: Architecture Blueprint - Ready for Implementation
