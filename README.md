PestSentry 🐛
[
]

PestSentry is a real-world, full-stack pest management web application that leverages AI-driven automation to generate extermination reports based on user-submitted data.
Designed to streamline pest control operations, PestSentry brings together modern web technologies with intelligent workflows for maximum efficiency.

<br />

✨ Features
🧠 AI-Powered Report Generation:
Automatically creates detailed extermination reports based on submitted treatment data, saving time and improving accuracy.

📦 Full-Stack Architecture:
React.js frontend, Node.js + Express backend, and Supabase for cloud storage and database management.

🔒 Secure User Authentication:
Supports user signup/login flows with protected endpoints.

📁 File Upload Support:
Upload evidence (photos) with records using Supabase Storage.

📈 Real-Time Record Management:
Add, view, and manage extermination records dynamically.

⚡ Responsive UI:
Mobile-friendly forms and layouts built with React Bootstrap.

🌍 Deployed to Production:
Live and accessible on the web via Render hosting.

<br />

🚀 Tech Stack

Frontend | Backend | Database & Storage | AI | Deployment
React.js | Node.js + Express | Supabase | Custom AI Prompt Engineering | Render.com
<br />

⚙️ Installation
If you want to run PestSentry locally:

# Clone the repository
git clone https://github.com/xCyanidex/pestsentry

# Navigate into the project folder
cd pestsentry

# Install frontend dependencies
cd frontend
<br />
npm install

# Install backend dependencies
cd ../backend
<br />
npm install

🏃 Running the app locally:
<br />

Frontend:
<br />
cd frontend
<br />
npm run dev

Backend:
<br />
cd backend
<br />
npm run start

Make sure you create a .env file in your server with your Supabase credentials and any required API keys.

<br />

🛠️ Environment Variables
Create a .env file in the backend root:

MONGO_URI=
<br />
PORT=3001
<br />
TEST_MONGODB_URI=
<br />
SECRET=
<br />
SUPABASE_URL=
<br />
SUPABASE_SERVICE_ROLE_KEY=
<br />
GEMINI_API_KEY=
<br />


📋 Future Enhancements:

📈 Admin Dashboard with statistics and analytics

🛡️ Two-Factor Authentication (2FA)

🗺️ Map integration to track extermination locations

📄 PDF Export for reports

🧑‍💻 Author
Duraiz
Full-Stack Developer | AI Enthusiast 

GitHub: https://github.com/xCyanidex

LinkedIn: https://www.linkedin.com/in/duraizhaider/

<br />

🏆 Acknowledgments:

Thanks to Google Gemini for inspiration in AI text generation.

Special thanks to the pest control domain experts who helped shape real-world workflows.


