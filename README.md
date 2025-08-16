# Chatbot Application

## Setup Instructions

### 1. Create Nhost Project
1. Go to [Nhost](https://nhost.io) and sign up/login
2. Create a new project
3. Note your project's subdomain and region

### 2. Environment Variables
Create `.env.local` in the project root:
```bash
VITE_NHOST_BACKEND_URL=https://YOUR-SUBDOMAIN.YOUR-REGION.nhost.run
```

### 3. Nhost Configuration
1. In Nhost dashboard, go to Settings → General
2. Add `http://localhost:5173` to "Allowed Origins"
3. Create the required tables in Hasura:
   - `chats` table with RLS
   - `messages` table with RLS
   - `sendMessage` Action pointing to n8n webhook

### 4. Run Development Server
```bash
npm run dev
```

### 5. Test
- Open http://localhost:5173
- Try to sign up with your email
- If successful, you can create chats and send messages

## Current Issue
The domain `bzohpugtcpqwlkrbczat.ap-south-1.nhost.run` cannot be resolved. Please:
1. Verify your Nhost project exists
2. Check the correct URL format
3. Update `.env.local` with the working URL
