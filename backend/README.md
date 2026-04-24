# Backend Setup (Python + ML)

## 1. Create and activate virtual environment

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## 2. Install dependencies

```powershell
pip install -r requirements.txt
```

## 3. Configure environment

```powershell
Copy-Item .env.example .env
```

Update `.env` values as needed.

## 4. Run API server

```powershell
uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

## 5. Check API docs

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc
