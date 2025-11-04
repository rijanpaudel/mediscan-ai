🏥 MediScan AI

An AI-powered medical report analyzer that helps patients understand their medical reports in simple terms.

🎯 Problem Statement

- 65% of patients don't understand their medical reports
- Average wait time for doctor consultation: 2-3 weeks  
- Limited healthcare access in rural areas
- Medical jargon creates confusion and anxiety

💡 Solution

MediScan AI uses OCR and AI to:
- Extract text from medical report images
- Analyze results and identify abnormal values
- Explain findings in simple, non-medical terms
- Provide urgency levels (Routine/Consult Soon/Urgent)
- Save reports for future reference

🚀 Live Demo

Live Site: https://mediscan-ai-eight.vercel.app/


Demo Credentials
- Email: demo@mediscan.ai
- Password: demo123

 🛠️ Tech Stack

 Frontend
- React 19 with Next.js 15
- TypeScript for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons

 Backend & Database
- Supabase (PostgreSQL + Authentication + Row Level Security)
- Supabase Auth for user management

 AI & OCR
- Tesseract.js - Client-side OCR (no API costs!)
- Gemini API - AI analysis 

 Deployment
- Vercel - Zero-config deployment

 📊 Impact Metrics

- ⚡ Instant analysis (30-60 seconds vs 2-3 weeks)
- 💰 100% free for users
- 🔒 HIPAA-compliant data handling
- 📱 Mobile-responsive design

 🏗️ Architecture
```
User Upload → Tesseract.js (OCR) → Gemini AI (Analysis) → Supabase (Storage) → Results Display
```

 🚀 Features

✅ Completed (MVP)
- User authentication & authorization
- Image upload with drag-and-drop
- OCR text extraction
- AI-powered report analysis
- Abnormal value detection
- Urgency level classification
- Report history & search
- Mobile responsive design

🔄 Planned Features**
- Multi-language support (Hindi, Nepali, etc.)
- PDF upload support
- Trend analysis across multiple reports
- Doctor verification system
- SMS/WhatsApp notifications for urgent cases
- Export reports as PDF

 📸 Screenshots

1. Landing page


<img width="1470" height="839" alt="Screenshot 2025-11-04 at 1 22 54 PM" src="https://github.com/user-attachments/assets/78cc8b30-66ef-4cb2-9b8f-c87b98149b69" />

 
2. Upload interface


<img width="1470" height="839" alt="Screenshot 2025-11-04 at 1 25 13 PM" src="https://github.com/user-attachments/assets/bc595fea-762a-4d57-bd1e-439050b5386a" />


3. Analysis results


<img width="1470" height="839" alt="Screenshot 2025-11-04 at 1 27 09 PM" src="https://github.com/user-attachments/assets/cad24220-873f-49b5-a6ba-7f66ac9cb2a7" />


4. Dashboard


<img width="1470" height="839" alt="Screenshot 2025-11-04 at 1 27 40 PM" src="https://github.com/user-attachments/assets/9cb2779b-a1c9-4e22-892f-2f625578e986" />


5. History page


<img width="1470" height="839" alt="Screenshot 2025-11-04 at 1 28 11 PM" src="https://github.com/user-attachments/assets/2f71966a-5c96-4ffb-8133-58a332f8b96a" />



 🎓 Why This Project?

This project demonstrates:

1. Real-world Impact: Addresses UN SDG Goal 3 (Good Health)
2. Technical Depth: Full-stack + AI + Database design
3. Scalability: Built to handle thousands of users
4. Security: Row-level security, authentication
5. Modern Stack: Latest React, TypeScript, AI APIs

Built in 2 weeks with zero budget.

 💻 Local Development
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/mediscan-ai.git
cd mediscan-ai

# Install dependencies
npm install --legacy-peer-deps

# Setup environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev
```

 🔐 Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

 📝 Database Schema
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  file_name TEXT,
  extracted_text TEXT,
  ai_analysis JSONB,
  upload_date TIMESTAMPTZ
);
```

 🤝 Contributing

This is a solo project, but feedback is welcome!

 📄 License

MIT License - Free to use and modify

 👨‍💻 Author

Rijan Paudel
- Portfolio: https://rijancreates.vercel.app/
- LinkedIn: https://www.linkedin.com/in/rijan-paudel-4ba7b8250/
- Email: paudelrijan369@gmail.com

Built with ❤️ to make healthcare accessible for everyone
