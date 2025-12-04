# GitHub Repository Management

## Overview

The Infonaut editor now includes automatic repository management with GitHub OAuth integration. When users log in, they can:

1. **Create a new repository** from the template with a custom name
2. **Use an existing repository** from their GitHub account
3. **Switch repositories** at any time without re-logging in
4. **Automatically push local data** to the newly created repo

## How It Works

### 1. Authentication & Login
- Users sign in with GitHub OAuth
- Token stored securely in HttpOnly cookie `gh_token`
- No server-side storage of tokens

### 2. Repository Selection
After login, users see the **Repo Selector** modal with two tabs:

#### Use Existing
- Lists all repositories owned by the user
- Click any repo to start editing (fetches `data/pages.json` from that repo)
- Updated repos shown at the top (sorted by last updated)

#### Create New
- Enter a desired repository name (defaults to `infonaut-site`)
- Repository created from the configured template
- Uses user's authenticated token (no server fallback)
- `data/pages.json` initialized automatically
  - If user has local Puck data in localStorage, it's pushed to the new repo
  - Otherwise, empty `data/pages.json` is created

### 3. Data Persistence
- **localStorage**: User's current edits saved locally during session
- **GitHub**: Commits pushed to user's selected repository
- **Template Repo**: Source for creating new user repos
- **Initial Data**: When creating a new repo, local data is pushed if available

### 4. Change Repository
- Click "📁 Change Repo" button in editor header (top-right)
- Modal re-opens to select/create a different repo
- Editor continues working with new repo context

## API Endpoints

### POST /api/repo/ensure
Create or get a repository for the authenticated user.

**Request:**
```json
{
  "name": "my-custom-site",
  "initialData": { "content": [], "root": {} }
}
```

**Response:**
```json
{
  "exists": false,
  "created": true,
  "owner": "username",
  "name": "my-custom-site",
  "html_url": "https://github.com/username/my-custom-site"
}
```

**Security:** 
- Only accepts user token from cookie (no server fallback)
- Returns 401 if not authenticated
- Enforces user ownership

### GET /api/repo/list
List all repositories owned by authenticated user.

**Response:**
```json
{
  "repos": [
    {
      "name": "infonaut-site-user",
      "owner": "username",
      "url": "https://github.com/username/infonaut-site-user",
      "description": "Infonaut page from template"
    }
  ]
}
```

### GET /api/save-page
Load page data from a repository.

**Query Params:**
- `owner` - Repository owner (defaults to GITHUB_OWNER env)
- `repo` - Repository name (defaults to GITHUB_REPO env)
- `branch` - Branch name (defaults to main)

**Example:**
```
GET /api/save-page?owner=myusername&repo=infonaut-site-user&branch=main
```

### POST /api/save-page
Commit page data to a repository.

**Request:**
```json
{
  "pageData": { "content": [], "root": {} },
  "message": "Update hero section",
  "owner": "myusername",
  "repo": "infonaut-site-user"
}
```

If `owner`/`repo` not provided, falls back to GITHUB_OWNER/GITHUB_REPO env vars.

## Environment Variables

Required in `.env.local` or deployment config:

```bash
# GitHub OAuth
GITHUB_OAUTH_CLIENT_ID=your_oauth_client_id
GITHUB_OAUTH_CLIENT_SECRET=your_oauth_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Template Repository (used for create-from-template)
TEMPLATE_OWNER=sree-pm
TEMPLATE_REPO=infonaut-ltd

# Server defaults (only used if user doesn't select repo)
GITHUB_OWNER=sree-pm
GITHUB_REPO=infonaut-ltd
GITHUB_TOKEN=github_pat_xxxxx (optional, for CI/CD)
```

## Setup Instructions

### 1. Configure GitHub OAuth App

Go to https://github.com/settings/developers/new and create a new OAuth App:

- **Application name:** Infonaut Editor
- **Homepage URL:** Your app URL (e.g., https://your-domain.com or http://localhost:3000)
- **Authorization callback URL:** `{HOMEPAGE_URL}/api/auth/callback`
  - Example: `http://localhost:3000/api/auth/callback`
  - In production: `https://your-domain.com/api/auth/callback`

Save the `Client ID` and `Client Secret`.

### 2. Mark Template as Template Repository

The repository you want users to fork from must be marked as a Template:

1. Go to your repo settings (e.g., https://github.com/sree-pm/infonaut-ltd/settings)
2. Scroll to "Repository template"
3. Check "Template repository"
4. Save

### 3. Set Environment Variables

Create `.env.local`:

```bash
GITHUB_OAUTH_CLIENT_ID=<your oauth client id>
GITHUB_OAUTH_CLIENT_SECRET=<your oauth client secret>
NEXT_PUBLIC_APP_URL=http://localhost:3000

TEMPLATE_OWNER=sree-pm
TEMPLATE_REPO=infonaut-ltd
```

### 4. Start Development Server

```bash
npm install
npm run dev
```

Visit http://localhost:3000/editor and test the flow.

## User Flow

1. User visits `/editor`
   ↓
2. Not authenticated → shows "Sign in with GitHub" button
   ↓
3. Click login → GitHub OAuth redirect
   ↓
4. Grant permissions → callback stores token in cookie
   ↓
5. Redirects back to `/editor`
   ↓
6. Shows "Repo Selector" modal
   ↓
7. User chooses:
   - **Create new** → enters name → repo created from template → data/pages.json initialized
   - **Use existing** → picks repo from list
   ↓
8. Editor loads `data/pages.json` from selected repo
   ↓
9. User can edit and commit
   ↓
10. Can click "Change Repo" to switch repos without re-logging in

## Features

✅ **GitHub OAuth** - Secure authentication with GitHub  
✅ **Per-user Repos** - Each user has their own repository  
✅ **Template Creation** - Fork template repo for each user  
✅ **Existing Repo Support** - Use any existing GitHub repo  
✅ **Local Data Sync** - Push localStorage data to new repo  
✅ **Change Repo** - Switch repos mid-session  
✅ **Security** - User tokens only, no server fallback for repo creation  
✅ **List User Repos** - Browse and select from existing repos  

## Security Considerations

- ✅ GitHub tokens stored in **HttpOnly cookies** (not accessible from JS)
- ✅ Tokens **never logged** in console or error messages
- ✅ Repo creation **only with user token** (no server token fallback)
- ✅ User **must be authenticated** to create/list repos
- ✅ Commits attributed to **authenticated user** (audit trail)
- ✅ In production, **HTTPS enforced** (secure flag set on cookie)

## Troubleshooting

### "Not authenticated: user GitHub token required"
- Make sure you're logged in (should see /repo/ensure error from browser console)
- Check that OAuth login completed successfully
- Clear cookies and try logging in again

### "Failed to create repo from template"
- Template repo must be marked as a Template repository on GitHub
- User must have permission to create repositories on their account
- Check that TEMPLATE_OWNER and TEMPLATE_REPO are correct

### "Repository name already exists"
- The repo name is already taken on the user's account
- Choose a different name in the "Create New" tab

### OAuth redirect not working
- Check that `NEXT_PUBLIC_APP_URL` matches your current hostname
- Verify GitHub OAuth App callback URL matches exactly (http vs https)
- In production, must use https (callback URL and NEXT_PUBLIC_APP_URL)
