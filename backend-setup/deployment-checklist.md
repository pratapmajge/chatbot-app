# Complete Project Deployment Checklist

## 🚀 Frontend (Already Complete)
- ✅ React + TypeScript app
- ✅ Nhost SDK integration
- ✅ Apollo Client with GraphQL
- ✅ Authentication UI
- ✅ Chat components
- ✅ Real-time subscriptions
- ✅ Netlify configuration

## 🔧 Backend Setup Required

### 1. Nhost Project Creation
- [ ] Go to [Nhost.io](https://nhost.io)
- [ ] Create new project
- [ ] Note subdomain and region
- [ ] Wait for deployment (2-5 minutes)

### 2. Database Schema Setup
- [ ] Open Hasura Console in Nhost
- [ ] Go to Data → SQL
- [ ] Run the SQL from `hasura-schema.sql`
- [ ] Verify tables: `chats`, `messages`
- [ ] Check RLS policies are active

### 3. Hasura Action Configuration
- [ ] Go to Actions → Create
- [ ] Action name: `sendMessage`
- [ ] Input type: `sendMessageInput`
- [ ] Output type: `sendMessageOutput`
- [ ] Handler: Your n8n webhook URL
- [ ] Enable `forward_client_headers`
- [ ] Set permissions: Allow `user` role

### 4. n8n Workflow Setup
- [ ] Install n8n: `npm install -g n8n`
- [ ] Start n8n: `n8n start`
- [ ] Import workflow from `n8n-workflow.json`
- [ ] Set environment variables:
  - `OPENROUTER_API_KEY`
  - `NHOST_GRAPHQL_URL`
  - `NHOST_ADMIN_SECRET`
- [ ] Activate workflow
- [ ] Copy webhook URL

### 5. Environment Configuration
- [ ] Update frontend `.env.local`:
  ```
  VITE_NHOST_BACKEND_URL=https://your-subdomain.your-region.nhost.run
  ```
- [ ] Add CORS origins in Nhost:
  - `http://localhost:5173` (development)
  - `https://your-netlify-domain.netlify.app` (production)

### 6. OpenRouter API Setup
- [ ] Sign up at [OpenRouter](https://openrouter.ai/)
- [ ] Get API key
- [ ] Add to n8n environment variables

## 🧪 Testing Checklist

### Authentication
- [ ] User can sign up with email/password
- [ ] User can sign in with existing credentials
- [ ] Unauthenticated users can't access chat features

### Chat Functionality
- [ ] User can create new chat
- [ ] User can send message
- [ ] AI responds via n8n workflow
- [ ] Messages are stored in database
- [ ] Real-time updates work via subscriptions

### Security
- [ ] Users can only see their own chats
- [ ] RLS policies are working
- [ ] Action permissions are enforced

## 🌐 Deployment

### Frontend (Netlify)
- [ ] Push code to GitHub
- [ ] Connect to Netlify
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Add environment variables
- [ ] Deploy

### Backend (Nhost)
- [ ] Ensure project is running
- [ ] Test all GraphQL operations
- [ ] Verify webhook connections

### n8n (Production)
- [ ] Deploy to cloud service (Railway, Render, etc.)
- [ ] Update webhook URL in Hasura Action
- [ ] Set production environment variables

## 📋 Final Verification
- [ ] Frontend loads without errors
- [ ] Authentication works end-to-end
- [ ] Chat creation and messaging works
- [ ] AI responses are generated
- [ ] Real-time updates function
- [ ] All security measures active

## 🆘 Troubleshooting
- Check Nhost project status
- Verify database permissions
- Test webhook connectivity
- Check n8n execution logs
- Verify environment variables
- Test CORS configuration 