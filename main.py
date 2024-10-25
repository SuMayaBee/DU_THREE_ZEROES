from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import base64
import openai
import logging
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from datetime import date, datetime
import httpx  # For making HTTP requests
from fastapi.middleware.cors import CORSMiddleware


# Enable logging
logging.basicConfig(level=logging.INFO)

# Now your existing routes
# /createplan, /createblog, /viewblog, etc.

openai.api_key = ""

# SQLite database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Travel Plan Model
class TravelPlan(Base):
    _tablename_ = 'travel_plans'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    destination = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)
    is_completed = Column(Boolean, default=False)
    weather_event = Column(Text)
    blog = Column(Text)

# Create the tables
Base.metadata.create_all(bind=engine)

# Pydantic Models for FastAPI
class TravelPlanCreate(BaseModel):
    user_id: int
    destination: str
    date: date

class TravelPlanUpdate(BaseModel):
    blog: str


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



# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Utility to create travel plan
async def fetch_weather(destination: str):
    api_key = "2ceb1d1d25f71b5a01659409eacf60c7"  # Replace with your actual OpenWeatherMap API key
    async with httpx.AsyncClient() as client:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={destination}&appid={api_key}"
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Weather data not found")
        data = response.json()
        return data['weather'][0]['description']



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
    
  
# Route to create a travel plan
@app.post("/createplan")
async def create_plan(plan: TravelPlanCreate, db: SessionLocal = Depends(get_db)):
    # Fetch weather data for the given destination
    try:
        weather_event = await fetch_weather(plan.destination)
    except HTTPException as e:
        raise e

    # Check if the travel date is in the past
    is_completed = plan.date < date.today()

    # Insert the travel plan into the database
    db_plan = TravelPlan(
        user_id=plan.user_id,
        destination=plan.destination,
        date=plan.date,
        is_completed=is_completed,
        weather_event=weather_event,
        blog=''
    )
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan  
    
@app.get("/ongoingplan")
def get_ongoing_plans(db: SessionLocal = Depends(get_db)):
    return db.query(TravelPlan).filter(TravelPlan.is_completed == False).all()

@app.get("/completedplan")
def get_completed_plans(db: SessionLocal = Depends(get_db)):
    return db.query(TravelPlan).filter(TravelPlan.is_completed == True).all()

@app.put("/createblog/{plan_id}")
async def create_blog(plan_id: int, db: SessionLocal = Depends(get_db)):
    # Fetch the travel plan by ID
    travel_plan = db.query(TravelPlan).filter(TravelPlan.id == plan_id).first()

    if not travel_plan:
        raise HTTPException(status_code=404, detail="Travel plan not found")

    # Ensure that the plan is completed
    if not travel_plan.is_completed:
        raise HTTPException(status_code=400, detail="Plan is not completed yet")

    # Fetch the destination and weather event for the plan
    destination = travel_plan.destination
    weather_event = travel_plan.weather_event

    # Generate the blog content using OpenAI's GPT-4 model
    try:
        prompt = f"Write a detailed travel blog about visiting {destination}. The weather was {weather_event}. Include details about the experience, the environment, and local highlights."
        
        # Log the prompt and API call details
        logging.info(f"Prompt sent to GPT-4: {prompt}")

        # Use the new ChatCompletion API for GPT-4
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",  # Use the GPT-4 model
            messages=[
                {"role": "system", "content": "You are a travel blogger."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000  # Adjust token size as needed
        )

        generated_blog = response.choices[0].message['content'].strip()

        # Log the response from GPT-4
        logging.info(f"GPT-4 Response: {generated_blog}")

    except Exception as e:
        logging.error(f"Error generating blog with GPT-4: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating blog with GPT-4: {str(e)}")

    # Update the travel plan with the generated blog content
    travel_plan.blog = generated_blog
    db.commit()
    db.refresh(travel_plan)

    return {"message": "Blog created successfully", "blog": travel_plan.blog}


@app.get("/viewblog/{plan_id}")
def view_blog(plan_id: int, db: SessionLocal = Depends(get_db)):
    travel_plan = db.query(TravelPlan).filter(TravelPlan.id == plan_id).first()
    if not travel_plan:
        raise HTTPException(status_code=404, detail="Travel plan not found")
    return {"blog": travel_plan.blog}

# Run this FastAPI server using:
# uvicorn main:app --reload



# Start FastAPI with: uvicorn main:app --reload



# uvicorn main:app --reload