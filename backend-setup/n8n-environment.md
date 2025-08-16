# n8n Environment Configuration

## Required Environment Variables

### 1. OpenRouter API Key
```bash
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**How to get:**
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up and get your API key
3. Use the free tier (1000 requests/month)

### 2. Nhost Configuration
```bash
NHOST_GRAPHQL_URL=https://your-subdomain.your-region.nhost.run/v1/graphql
NHOST_ADMIN_SECRET=your_hasura_admin_secret
```

**How to get:**
1. **GraphQL URL**: From your Nhost project dashboard
2. **Admin Secret**: In Nhost → Hasura → Settings → API → Admin Secret

## n8n Setup Steps

### 1. Install n8n
```bash
npm install -g n8n
```

### 2. Start n8n
```bash
n8n start
```

### 3. Import Workflow
1. Open n8n at http://localhost:5678
2. Go to Workflows → Import from File
3. Upload the `n8n-workflow.json` file

### 4. Configure Environment
1. Go to Settings → Environment Variables
2. Add the three variables above
3. Save and restart n8n

### 5. Activate Workflow
1. Click the "Active" toggle on your workflow
2. Copy the webhook URL (e.g., `http://localhost:5678/webhook/chatbot-webhook`)
3. Use this URL in your Hasura Action

## Webhook URL Format
Your webhook will be available at:
```
http://localhost:5678/webhook/chatbot-webhook
```

**For production:** Deploy n8n to a cloud service and use the public URL.

## Testing
1. Send a POST request to your webhook
2. Check n8n execution logs
3. Verify database updates in Hasura 