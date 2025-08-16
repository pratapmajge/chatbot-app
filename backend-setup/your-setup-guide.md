# 🚀 Your Chatbot Setup Guide

## ✅ What You Have:
- **Nhost Project**: `bzohpugtcpqwlkrbczat.ap-south-1.nhost.run`
- **Hasura Admin Secret**: `IK5D_+CE$d,tGb%rYnqN'),Aj7qaFj-2`
- **OpenRouter API Key**: `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`
- **Frontend**: Ready for Netlify deployment

## 🔧 Step-by-Step Setup:

### **Step 1: Set Up Database (5 minutes)**
1. Go to [Nhost Dashboard](https://app.nhost.io)
2. Open your project `bzohpugtcpqwlkrbczat`
3. Click **"Hasura"** → **"Open Console"**
4. Go to **"Data"** → **"SQL"**
5. Copy and paste the entire content of `hasura-schema.sql`
6. Click **"Run"**
7. Verify tables `chats` and `messages` are created

### **Step 2: Set Up n8n Workflow (10 minutes)**
1. Install n8n: `npm install -g n8n`
2. Start n8n: `n8n start`
3. Open http://localhost:5678
4. Go to **"Workflows"** → **"Import from File"**
5. Upload `n8n-workflow.json`
6. Go to **"Settings"** → **"Environment Variables"**
7. Add these variables:
   ```
   NHOST_GRAPHQL_URL=https://bzohpugtcpqwlkrbczat.ap-south-1.nhost.run/v1/graphql
   NHOST_ADMIN_SECRET=IK5D_+CE$d,tGb%rYnqN'),Aj7qaFj-2
   OPENROUTER_API_KEY=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
   ```
8. **Activate** the workflow
9. Copy the webhook URL (e.g., `http://localhost:5678/webhook/chatbot-webhook`)

### **Step 3: Create Hasura Action (5 minutes)**
1. In Hasura Console, go to **"Actions"**
2. Click **"Create"**
3. Fill in:
   - **Action Name**: `sendMessage`
   - **Action Definition**:
     ```graphql
     type Mutation {
       sendMessage(input: sendMessageInput!): sendMessageOutput!
     }
     
     input sendMessageInput {
       chat_id: uuid!
       content: String!
     }
     
     type sendMessageOutput {
       reply: String!
     }
     ```
   - **Handler**: Your n8n webhook URL from Step 2
   - **Forward client headers**: ✅ **Enable**
4. Click **"Create"**
5. Go to **"Permissions"** → Allow `user` role

### **Step 4: Configure CORS (2 minutes)**
1. In Nhost Dashboard → **"Settings"** → **"General"**
2. Add to **"Allowed Origins"**:
   - `http://localhost:5173` (development)
   - `https://your-netlify-domain.netlify.app` (after deployment)

### **Step 5: Test Your Setup**
1. Restart your frontend: `npm run dev`
2. Try to sign up with your email
3. Create a new chat
4. Send a message
5. Check if AI responds

## 🌐 Deploy to Netlify:

### **Option 1: Manual Deploy**
1. Run: `npm run build`
2. Upload `dist` folder to Netlify
3. Set environment variable: `VITE_NHOST_BACKEND_URL=https://bzohpugtcpqwlkrbczat.ap-south-1.nhost.run`

### **Option 2: GitHub + Netlify**
1. Push code to GitHub
2. Connect Netlify to your repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable

## 🧪 Testing Checklist:
- [ ] User sign-up works
- [ ] User sign-in works
- [ ] Chat creation works
- [ ] Message sending works
- [ ] AI responds via n8n
- [ ] Real-time updates work
- [ ] Users only see their own data

## 🆘 If Something Fails:
1. Check Nhost project status (should be "Running")
2. Verify database tables exist
3. Check n8n workflow is active
4. Test webhook connectivity
5. Check browser console for errors

## 🎯 Expected Result:
A fully functional chatbot where:
- Users can sign up/in
- Create and manage chats
- Send messages and get AI responses
- All data is secure and private
- Real-time updates work seamlessly

**Your chatbot will be live and working! 🎉** 