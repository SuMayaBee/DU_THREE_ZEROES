from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import base64

app = FastAPI()

# Enable CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend running on port 3000 (Next.js)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GPTResponseModel(BaseModel):
    gptResponse: str

# Directory for saving uploaded files
UPLOAD_DIR = "C:/Users/ThinkPad/DU_Three_Zeroes/public/uploads"

# Directory for saving GPT responses
QUERY_DIR = "public/query/"
if not os.path.exists(QUERY_DIR):
    os.makedirs(QUERY_DIR)


# Ensure the upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Simulating OpenAI GPT API for image analysis (this can be integrated with the real OpenAI API)
@app.post("/api/openai")
async def openai_mock(image: str = Body(...)):
    # Decoding the image and performing mock analysis
    try:
        # Assuming the image is in base64 format
        base64_image = image.split(",")[1]
        image_data = base64.b64decode(base64_image)

        # Perform mock analysis (replace this with actual OpenAI API call)
        response = {
            "response": "This is a mock GPT response analyzing the image content."
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
# File upload API
@app.post("/upload-file/")
async def create_upload_file(uploaded_file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, uploaded_file.filename)
    
    # Save the uploaded file to the specified location
    with open(file_location, "wb+") as file_object:
        file_object.write(uploaded_file.file.read())
    
    return {"info": f"file '{uploaded_file.filename}' saved at '{file_location}'"}


# API to list uploaded images in the folder
@app.get("/list-files/")
async def list_uploaded_files():
    try:
        # Check if directory exists and list files
        if not os.path.exists(UPLOAD_DIR):
            raise HTTPException(status_code=404, detail="Uploads directory not found.")
        
        # List files in the upload directory
        files = os.listdir(UPLOAD_DIR)
        if len(files) == 0:
            return {"message": "No files found", "files": []}
        
       
        print(files)
        return JSONResponse(content={"files": files})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing files: {str(e)}")
    
@app.post("/save-response")
async def save_gpt_response(gptResponse: GPTResponseModel):
    try:
        # Create the file path
        response_filename = os.path.join(QUERY_DIR, "gpt_response.txt")
        
        # Save the GPT response as a .txt file
        with open(response_filename, "w") as file:
            file.write(gptResponse.gptResponse)
        
        return {"message": "Response saved successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error saving the response.")

# Run this FastAPI server using:
# uvicorn main:app --reload



# Start FastAPI with: uvicorn main:app --reload



# uvicorn main:app --reload