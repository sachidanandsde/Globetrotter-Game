# Globetrotter Game

Globetrotter Game is an interactive travel guessing game where users can challenge their friends, test their geographical knowledge, and track their scores. Built with Django, React, and MongoDB, this full-stack application provides an engaging user experience with AI-powered features.

## Features
- **Guess the Location**: Players guess locations based on images and clues.
- **Challenge a Friend**: Invite friends via a shareable link with a dynamic image.
- **AI-Powered Insights**: AI integration enhances gameplay.
- **Score Tracking**: Leaderboard to track performance.
- **Social Features**: Share and compete with friends.

## Tech Stack
- **Frontend**: React, Bootstrap, Animate.css
- **Backend**: Django, Django REST Framework
- **Database**: MongoDB (using PyMongo)
- **Deployment**: AWS EC2, Gunicorn, PM2 (for frontend hosting)

## Installation & Setup
### Backend Setup
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/sachidanandsde/Globetrotter-Game.git
   cd Globetrotter-Game/globetrotter-backend
   ```
2. **Set Up Virtual Environment & Install Dependencies:**
   ```sh
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. **Configure MongoDB** (Update `settings.py` with MongoDB credentials).
4. **Run Migrations & Start Server:**
   ```sh
   python manage.py migrate
   python manage.py runserver 0.0.0.0:8000
   ```

### Frontend Setup
1. **Navigate to the Frontend Directory:**
   ```sh
   cd ../globetrotter-frontend
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Run the Development Server:**
   ```sh
   npm start
   ```
4. **For Production Build:**
   ```sh
   npm run build
   ```

## Deployment
### Backend (Django + Gunicorn on AWS EC2)
- Run the server with Gunicorn:
  ```sh
  gunicorn --bind 0.0.0.0:8000 globetrotter.wsgi:application
  ```

### Frontend (React on AWS EC2 using PM2)
- Serve the React build folder:
  ```sh
  pm2 serve build --name globetrotter-frontend --spa --port 3000
  ```

## API Endpoints
- `POST /api/game/create-user` - Create a new user.
- `GET /api/game/leaderboard` - Fetch leaderboard.
- `POST /api/game/challenge` - Send a challenge invite.

## Contributing
1. Fork the repo & clone it locally.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m "Added feature X"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For queries, open an issue or contact [Sachidanand](https://github.com/sachidanandsde).

