from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

app = FastAPI(title="ML Service", version="0.0.1")

# Load model on startup
model: SentenceTransformer | None = None


@app.on_event("startup")
async def load_model():
    global model
    model = SentenceTransformer("intfloat/multilingual-e5-small")


class EmbedRequest(BaseModel):
    texts: list[str]


class EmbedResponse(BaseModel):
    embeddings: list[list[float]]


@app.post("/embed", response_model=EmbedResponse)
async def embed(request: EmbedRequest) -> EmbedResponse:
    """Generate embeddings for texts."""
    if model is None:
        raise RuntimeError("Model not loaded")

    embeddings = model.encode(request.texts).tolist()
    return EmbedResponse(embeddings=embeddings)


@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": model is not None}
