from fastapi import FastAPI, HTTPException, Header, Request
from typing import Optional
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")  # Assuming your CSS and JS are in a 'static' folder

templates = Jinja2Templates(directory="templates")  # Assuming your HTML is in a 'templates' folder


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Simulate a simple in-memory data store
messages = {}


@app.get("/message")
async def get_message(api_key: Optional[str] = Header(None)):
  if not api_key:
    raise HTTPException(status_code=400, detail="API key missing")

  if api_key in messages:
    return {"message": messages[api_key]}
  else:
    raise HTTPException(status_code=404, detail="Message not found")


@app.put("/message")
async def update_or_create_message(message_data: dict,
                                   api_key: Optional[str] = Header(None)):
  if not api_key:
    raise HTTPException(status_code=400, detail="API key missing")

  if "message" not in message_data:
    raise HTTPException(status_code=400,
                        detail="Missing 'message' in request body")

  messages[api_key] = message_data["message"]
  return {"status": "Message updated or created"}


if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=10000)
