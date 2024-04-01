# MyCFO
MyCFO is an AI-powered chatbot application designed to assist individuals who may lack financial literacy by offering insightful financial summaries and personalized advice tailored to their financial circumstances. Through simple conversation with our chatbot, users can effortlessly obtain their monthly expenditures or savings without the need for manual calculations. MyCFO emphasizes on the capability to visualize users' spending records by dynamically generating charts based on query results retrieved from the database, facilitating easier comprehension of their financial activities.

Additionally, MyCFO incorporates features aimed at streamlining transaction data entry and enhancing user experience, such as in-app options for adding new transaction records and tracking expenses. 

**Key Features**:
- **Personalized Financial Advice and Recommendations**: Utilizing Retrieval-Augmented Generation (RAG) technology to craft responses tailored to the user's financial situation, ensuring relevant and personalized advice.
- **In-App Expense Entry and Tracking**: Easily input and monitor expenses directly within the application for seamless financial management.
- **Dynamic Visualization of Query Results**: Instantly view graphical representations of financial data based on user queries, enhancing comprehension and analysis.
- **Tax Advice in Accordance with Latest Taxation Policies**: Stay updated with relevant tax advice aligned with current taxation regulations and policies for optimal financial planning.


**Technology Used**:
- Frontend: React Native
- Backend for CRUD operations: NestJS with Prisma ORM
- Backend for AI Integration: Django
- AI Integration: OpenAI Assistant API
- Database: PostgreSQL hosted on Supabase



## Frontend (React Native Expo)
1. `cd frontend`
2. `npm install`
3. `npm run start`
4. `a` for android simulator

## Backend (NEST) runs at PORT 3000
1. `cd backend`
2. `npm install`
3. `npm run start:dev`

## Backend (DJANGO) runs at PORT 8000
you need to have python installed in your local machine
1. `cd django`
2. `pip install django`
2. `cd umhack`
3. `python manage.py runserver`

IF cant resolve other package u have to pip install accordingly


env
- OPENAI_API_KEY
- DATABASE_URL
- SUPABASE_URL
- SUPABASE_KEY

