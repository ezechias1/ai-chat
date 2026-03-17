/* ===== NexusAI - Chat Application ===== */

// ── Knowledge Base (10+ Q&A pairs) ────────────────────────────────
const knowledgeBase = [
  {
    keywords: ['react', 'hook', 'hooks', 'usestate', 'useeffect'],
    question: 'Explain React hooks',
    answer: `## React Hooks Explained

React Hooks let you use state and lifecycle features in **functional components** without writing classes. Here are the most important ones:

### useState
Manages local component state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### useEffect
Handles side effects like API calls and subscriptions:

\`\`\`jsx
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('/api/data');
    const json = await res.json();
    setData(json);
  };
  fetchData();

  return () => {
    // Cleanup runs on unmount
    console.log('Component unmounted');
  };
}, [dependency]); // Re-runs when dependency changes
\`\`\`

### Key Rules
- **Only call hooks at the top level** -- never inside loops or conditions
- **Only call hooks from React functions** -- components or custom hooks
- Custom hooks always start with \`use\` (e.g., \`useAuth\`, \`useFetch\`)

### Other Useful Hooks
- \`useContext\` -- access context values without wrapping
- \`useRef\` -- persist values between renders without re-rendering
- \`useMemo\` / \`useCallback\` -- performance optimization through memoization

Hooks transformed React development by making code more readable and reusable. They're now the standard way to write React components.`
  },
  {
    keywords: ['python', 'scrape', 'scraping', 'web scrape', 'beautifulsoup', 'requests'],
    question: 'Write a Python web scraper',
    answer: `## Python Web Scraper

Here's a complete web scraper using \`requests\` and \`BeautifulSoup\`:

\`\`\`python
import requests
from bs4 import BeautifulSoup
import csv
import time

def scrape_website(url, output_file='results.csv'):
    """Scrape article titles and links from a website."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                       'AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    articles = []

    for item in soup.select('article, .post, .entry'):
        title_el = item.select_one('h2 a, h3 a, .title a')
        if title_el:
            articles.append({
                'title': title_el.get_text(strip=True),
                'link': title_el.get('href', ''),
                'summary': item.select_one('p').get_text(strip=True)
                           if item.select_one('p') else ''
            })

    # Save to CSV
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['title', 'link', 'summary'])
        writer.writeheader()
        writer.writerows(articles)

    print(f"Scraped {len(articles)} articles -> {output_file}")
    return articles

# Usage
if __name__ == '__main__':
    results = scrape_website('https://example-blog.com')
    for r in results:
        print(f"  {r['title']}")
\`\`\`

### Setup
\`\`\`bash
pip install requests beautifulsoup4
\`\`\`

### Tips
- Always add a **User-Agent** header to avoid being blocked
- Use \`time.sleep(1)\` between requests to be respectful
- Check the site's \`robots.txt\` before scraping
- For JavaScript-heavy sites, consider using **Playwright** or **Selenium** instead`
  },
  {
    keywords: ['debug', 'error', 'bug', 'fix', 'issue', 'problem', 'broken'],
    question: 'Debug code',
    answer: `## Debugging Guide

Here's a systematic approach to finding and fixing bugs:

### 1. Read the Error Message Carefully
Error messages tell you **what** went wrong and **where**:

\`\`\`python
# TypeError: Cannot read properties of undefined (reading 'map')
# This means: you're calling .map() on something that is undefined

# Fix: add a guard
const items = data?.results ?? [];
items.map(item => item.name);
\`\`\`

### 2. Common Bug Patterns

**Off-by-one errors:**
\`\`\`javascript
// Bug: skips last element
for (let i = 0; i < arr.length - 1; i++) { ... }

// Fix:
for (let i = 0; i < arr.length; i++) { ... }
\`\`\`

**Async timing issues:**
\`\`\`javascript
// Bug: data is undefined because fetch hasn't completed
fetchData();
console.log(data); // undefined!

// Fix: await the result
const data = await fetchData();
console.log(data); // works
\`\`\`

**Reference vs. value:**
\`\`\`javascript
// Bug: mutating the original array
const sorted = originalArray.sort();

// Fix: create a copy first
const sorted = [...originalArray].sort();
\`\`\`

### 3. Debugging Tools
- **console.log** -- quick inspection of values
- **Browser DevTools** -- breakpoints, network tab, element inspector
- **\`debugger\`** statement -- pauses execution in DevTools
- **Stack traces** -- read bottom-to-top to trace the call chain

### 4. Rubber Duck Method
Explain your code line by line out loud. You'll often find the bug just by articulating what each line *should* do.

Share your error message and code, and I'll help pinpoint the issue!`
  },
  {
    keywords: ['async', 'await', 'promise', 'asynchronous', 'callback'],
    question: 'Explain async/await',
    answer: `## Async/Await in JavaScript

Async/await is syntactic sugar over Promises that makes asynchronous code read like synchronous code.

### The Evolution

**1. Callbacks (old way):**
\`\`\`javascript
getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments); // Callback hell
    });
  });
});
\`\`\`

**2. Promises (better):**
\`\`\`javascript
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));
\`\`\`

**3. Async/Await (best):**
\`\`\`javascript
async function loadComments(id) {
  try {
    const user = await getUser(id);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    console.log(comments);
  } catch (err) {
    console.error('Failed:', err.message);
  }
}
\`\`\`

### Running in Parallel
When tasks are independent, run them concurrently:

\`\`\`javascript
// Sequential (slow) - 3 seconds total
const a = await fetchA(); // 1s
const b = await fetchB(); // 1s
const c = await fetchC(); // 1s

// Parallel (fast) - 1 second total
const [a, b, c] = await Promise.all([
  fetchA(),
  fetchB(),
  fetchC()
]);
\`\`\`

### Key Concepts
- \`async\` functions **always return a Promise**
- \`await\` pauses execution until the Promise settles
- Use \`try/catch\` for error handling
- \`Promise.all()\` for parallel execution
- \`Promise.allSettled()\` when you want results even if some fail`
  },
  {
    keywords: ['css', 'flexbox', 'grid', 'layout', 'center', 'align'],
    question: 'CSS Layout',
    answer: `## CSS Layout: Flexbox vs Grid

### Flexbox -- One-Dimensional Layout
Best for laying out items in a single row or column:

\`\`\`css
/* Center anything perfectly */
.container {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  min-height: 100vh;
}

/* Responsive navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

/* Equal-width columns that wrap */
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card-row > * {
  flex: 1 1 300px; /* grow, shrink, min-width */
}
\`\`\`

### Grid -- Two-Dimensional Layout
Best for complex page layouts:

\`\`\`css
/* Classic holy grail layout */
.page {
  display: grid;
  grid-template:
    "header header header" 60px
    "nav    main   aside"  1fr
    "footer footer footer" 50px
    / 200px 1fr    200px;
  min-height: 100vh;
}
.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive card grid -- no media queries! */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`

### When to Use Which
| Feature | Flexbox | Grid |
|---------|---------|------|
| Direction | One axis | Two axes |
| Use case | Navbars, card rows | Full layouts |
| Item sizing | Content-based | Track-based |

**Pro tip:** They work great together -- use Grid for the page layout and Flexbox for components inside it.`
  },
  {
    keywords: ['api', 'rest', 'fetch', 'http', 'endpoint', 'request'],
    question: 'REST API',
    answer: `## Working with REST APIs

### Fetch API (Modern JavaScript)

\`\`\`javascript
// GET request
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

// POST request
async function createUser(data) {
  const res = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Reusable API client
class ApiClient {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    };
  }

  async request(endpoint, options = {}) {
    const res = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      headers: this.headers,
      ...options
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || \`HTTP \${res.status}\`);
    }
    return res.json();
  }

  get(endpoint)          { return this.request(endpoint); }
  post(endpoint, data)   { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }); }
  put(endpoint, data)    { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }); }
  delete(endpoint)       { return this.request(endpoint, { method: 'DELETE' }); }
}
\`\`\`

### HTTP Status Codes
- **200** OK -- Success
- **201** Created -- Resource created
- **400** Bad Request -- Invalid input
- **401** Unauthorized -- Authentication required
- **404** Not Found -- Resource doesn't exist
- **500** Internal Server Error -- Server broke`
  },
  {
    keywords: ['git', 'github', 'commit', 'branch', 'merge', 'version'],
    question: 'Git commands',
    answer: `## Essential Git Commands

### Daily Workflow
\`\`\`bash
# Check what's changed
git status
git diff

# Stage and commit
git add -A
git commit -m "feat: add user authentication"

# Push to remote
git push origin main
\`\`\`

### Branching
\`\`\`bash
# Create and switch to a new branch
git checkout -b feature/login-page

# Switch between branches
git checkout main

# Merge a branch into main
git checkout main
git merge feature/login-page

# Delete branch after merge
git branch -d feature/login-page
\`\`\`

### Undo Mistakes
\`\`\`bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Discard all uncommitted changes
git checkout -- .

# Amend the last commit message
git commit --amend -m "new message"

# Revert a specific commit (safe for shared branches)
git revert abc123
\`\`\`

### Commit Message Convention
Use prefixes for clarity:
- \`feat:\` -- new feature
- \`fix:\` -- bug fix
- \`refactor:\` -- code restructure
- \`docs:\` -- documentation
- \`chore:\` -- build/tooling changes

### Golden Rules
1. **Commit often** -- small, focused commits
2. **Never force-push to shared branches**
3. **Write meaningful commit messages**
4. **Pull before you push** to avoid conflicts`
  },
  {
    keywords: ['sql', 'database', 'query', 'select', 'join', 'table'],
    question: 'SQL queries',
    answer: `## SQL Query Guide

### Basic Queries
\`\`\`sql
-- Select with filtering and sorting
SELECT name, email, created_at
FROM users
WHERE status = 'active'
  AND created_at > '2024-01-01'
ORDER BY created_at DESC
LIMIT 20;

-- Aggregate functions
SELECT
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary,
  MAX(salary) as top_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY avg_salary DESC;
\`\`\`

### Joins
\`\`\`sql
-- Get orders with customer info
SELECT
  o.id AS order_id,
  c.name AS customer,
  o.total,
  o.created_at
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'completed'
ORDER BY o.created_at DESC;

-- Left join to include customers with no orders
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name;
\`\`\`

### Subqueries and CTEs
\`\`\`sql
-- Common Table Expression (modern, readable)
WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', created_at) AS month,
    SUM(total) AS revenue
  FROM orders
  WHERE status = 'completed'
  GROUP BY month
)
SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month,
  revenue - LAG(revenue) OVER (ORDER BY month) AS growth
FROM monthly_revenue
ORDER BY month;
\`\`\`

### Performance Tips
- Add **indexes** on columns you filter/join on
- Use \`EXPLAIN ANALYZE\` to check query plans
- Avoid \`SELECT *\` -- only fetch columns you need
- Use **pagination** (\`LIMIT\`/\`OFFSET\`) for large results`
  },
  {
    keywords: ['typescript', 'type', 'interface', 'generic', 'ts'],
    question: 'TypeScript basics',
    answer: `## TypeScript Essentials

### Type Annotations
\`\`\`typescript
// Basic types
let name: string = "Alice";
let age: number = 30;
let active: boolean = true;
let tags: string[] = ["dev", "design"];

// Object type with interface
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor'; // Union type
  settings?: UserSettings;            // Optional
}

// Function typing
function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

// Arrow function with typed params
const add = (a: number, b: number): number => a + b;
\`\`\`

### Generics
\`\`\`typescript
// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first<number>([1, 2, 3]);  // number
first<string>(["a", "b"]); // string

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UsersResponse = ApiResponse<User[]>;
type SingleUser = ApiResponse<User>;
\`\`\`

### Utility Types
\`\`\`typescript
// Partial -- all properties optional
function updateUser(id: number, updates: Partial<User>) { ... }

// Pick -- select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit -- exclude properties
type CreateUser = Omit<User, 'id'>;

// Record -- typed key-value map
const scores: Record<string, number> = {
  alice: 95,
  bob: 87
};
\`\`\`

TypeScript catches bugs at compile time that would otherwise crash in production. Start by adding it gradually to existing JS projects with \`// @ts-check\` comments.`
  },
  {
    keywords: ['docker', 'container', 'dockerfile', 'compose', 'image'],
    question: 'Docker basics',
    answer: `## Docker Quick Reference

### Dockerfile
\`\`\`dockerfile
# Node.js application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb

volumes:
  pgdata:
\`\`\`

### Common Commands
\`\`\`bash
docker build -t myapp .           # Build image
docker run -p 3000:3000 myapp     # Run container
docker compose up -d              # Start all services
docker compose down               # Stop all services
docker logs -f container_name     # View logs
docker exec -it container bash    # Shell into container
docker system prune -a            # Clean up everything
\`\`\`

### Best Practices
- Use **multi-stage builds** to keep images small
- Pin specific versions (not \`latest\`)
- Add a \`.dockerignore\` file (similar to .gitignore)
- Run as **non-root user** in production
- One process per container`
  },
  {
    keywords: ['regex', 'regular expression', 'pattern', 'match', 'replace'],
    question: 'Regular expressions',
    answer: `## Regular Expressions Cheat Sheet

### Common Patterns
\`\`\`javascript
// Email validation
const email = /^[\\w.-]+@[\\w-]+\\.[a-zA-Z]{2,}$/;

// URL matching
const url = /https?:\\/\\/[\\w.-]+(?:\\.[a-zA-Z]{2,})[\\/\\w.-]*/;

// Phone number (US)
const phone = /^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;

// Strong password (8+ chars, upper, lower, number, symbol)
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
\`\`\`

### Syntax Reference
| Pattern | Meaning |
|---------|---------|
| \`.\` | Any character except newline |
| \`\\d\` | Digit (0-9) |
| \`\\w\` | Word character (a-z, 0-9, _) |
| \`\\s\` | Whitespace |
| \`+\` | One or more |
| \`*\` | Zero or more |
| \`?\` | Optional (zero or one) |
| \`{n,m}\` | Between n and m times |
| \`^\` / \`$\` | Start / end of string |
| \`()\` | Capture group |
| \`(?:)\` | Non-capturing group |
| \`(?=)\` | Positive lookahead |

### Practical Examples
\`\`\`javascript
// Extract all hashtags from text
const hashtags = text.match(/#\\w+/g);

// Replace multiple spaces with single space
const clean = text.replace(/\\s+/g, ' ').trim();

// Parse CSV values (handles quoted values)
const values = line.match(/(".*?"|[^",]+)/g);

// Named capture groups
const datePattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const { year, month, day } = '2024-03-15'.match(datePattern).groups;
\`\`\`

**Tip:** Test your regex at [regex101.com](https://regex101.com) -- it explains each part visually.`
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greet', 'morning', 'afternoon'],
    question: 'Greeting',
    answer: `Hey there! I'm **NexusAI**, your coding assistant. I can help you with:

- Writing and explaining code in any language
- Debugging errors and fixing bugs
- Explaining programming concepts
- Reviewing code and suggesting improvements
- Writing SQL queries, regex patterns, and more

What would you like to work on today?`
  }
];

const genericResponses = [
  `That's a great question! While I don't have a specific pre-built answer for that, I can share some general guidance.

When tackling any programming challenge, I recommend:

1. **Break it down** -- Split the problem into smaller, manageable pieces
2. **Research** -- Check documentation and community resources
3. **Prototype** -- Write a minimal version first, then iterate
4. **Test** -- Verify edge cases and error scenarios

Could you share more details about what you're working on? I'd love to help with specific code examples!`,

  `Interesting topic! Here's how I'd approach this:

First, let's think about the **core requirements**. What exactly does the solution need to do? Once we have that clarity, we can:

- Choose the right tools and technologies
- Design the architecture
- Implement step by step

Feel free to share code snippets or error messages, and I'll give you targeted help. The more context you provide, the better I can assist!`,

  `I'd be happy to help with that! To give you the best possible answer, it would help to know:

- What **language/framework** you're using
- What you've **tried so far**
- Any **error messages** you're seeing

In the meantime, here are some universal debugging tips:

\`\`\`javascript
// Add logging to trace execution flow
console.log('[DEBUG] Variable state:', { myVar });

// Use typeof to check unexpected types
console.log(typeof myVariable);

// JSON.stringify for complex objects
console.log(JSON.stringify(data, null, 2));
\`\`\`

Drop your code here and I'll take a closer look!`
];

// ── State ─────────────────────────────────────────────────────────
let conversations = [];
let activeConversationId = null;
let isTyping = false;

// ── DOM Elements ──────────────────────────────────────────────────
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const btnHamburger = document.getElementById('btnHamburger');
const btnNewChat = document.getElementById('btnNewChat');
const conversationList = document.getElementById('conversationList');
const chatMessages = document.getElementById('chatMessages');
const welcomeScreen = document.getElementById('welcomeScreen');
const messageInput = document.getElementById('messageInput');
const btnSend = document.getElementById('btnSend');
const chatTitle = document.getElementById('chatTitle');
const searchInput = document.getElementById('searchInput');

// ── Initialize ────────────────────────────────────────────────────
function init() {
  loadConversations();
  renderConversationList();
  bindEvents();

  if (conversations.length === 0) {
    showWelcome();
  } else {
    switchConversation(conversations[0].id);
  }
}

function bindEvents() {
  btnNewChat.addEventListener('click', createNewChat);
  btnSend.addEventListener('click', sendMessage);
  btnHamburger.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  messageInput.addEventListener('input', () => {
    autoResize(messageInput);
    btnSend.disabled = !messageInput.value.trim();
  });

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageInput.value.trim() && !isTyping) sendMessage();
    }
  });

  searchInput.addEventListener('input', (e) => {
    renderConversationList(e.target.value.toLowerCase());
  });

  document.querySelectorAll('.suggestion-card').forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.dataset.prompt;
      messageInput.value = prompt;
      btnSend.disabled = false;
      sendMessage();
    });
  });
}

// ── Sidebar ───────────────────────────────────────────────────────
function toggleSidebar() {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('visible');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
}

// ── Conversations ─────────────────────────────────────────────────
function loadConversations() {
  try {
    const stored = localStorage.getItem('nexusai_conversations');
    if (stored) conversations = JSON.parse(stored);
  } catch (e) {
    conversations = [];
  }
}

function saveConversations() {
  localStorage.setItem('nexusai_conversations', JSON.stringify(conversations));
}

function createNewChat() {
  const conv = {
    id: Date.now().toString(),
    title: 'New conversation',
    messages: [],
    createdAt: new Date().toISOString()
  };
  conversations.unshift(conv);
  saveConversations();
  switchConversation(conv.id);
  renderConversationList();
  closeSidebar();
}

function switchConversation(id) {
  activeConversationId = id;
  const conv = conversations.find(c => c.id === id);
  if (!conv) return;

  chatTitle.textContent = conv.title === 'New conversation' ? 'NexusAI' : conv.title;

  renderConversationList();
  renderMessages(conv.messages);

  if (conv.messages.length === 0) {
    showWelcome();
  }

  messageInput.focus();
}

function deleteConversation(id, e) {
  e.stopPropagation();
  conversations = conversations.filter(c => c.id !== id);
  saveConversations();

  if (activeConversationId === id) {
    if (conversations.length > 0) {
      switchConversation(conversations[0].id);
    } else {
      activeConversationId = null;
      showWelcome();
      chatTitle.textContent = 'NexusAI';
    }
  }
  renderConversationList();
}

function renderConversationList(filter = '') {
  const filtered = filter
    ? conversations.filter(c => c.title.toLowerCase().includes(filter))
    : conversations;

  conversationList.innerHTML = filtered.map(c => {
    const isActive = c.id === activeConversationId;
    const date = formatDate(c.createdAt);
    return `
      <div class="conversation-item ${isActive ? 'active' : ''}"
           onclick="switchConversation('${c.id}')" data-id="${c.id}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 2v-2a2 2 0 01-1-1.73V4z"
                stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <div class="conversation-info">
          <div class="conversation-title">${escapeHtml(c.title)}</div>
          <div class="conversation-date">${date}</div>
        </div>
        <button class="conversation-delete" onclick="deleteConversation('${c.id}', event)" title="Delete">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');
}

// ── Messages ──────────────────────────────────────────────────────
function showWelcome() {
  welcomeScreen.classList.remove('hidden');
  chatMessages.querySelectorAll('.message-row').forEach(el => el.remove());
}

function hideWelcome() {
  welcomeScreen.classList.add('hidden');
}

function renderMessages(messages) {
  chatMessages.querySelectorAll('.message-row').forEach(el => el.remove());

  if (messages.length === 0) {
    showWelcome();
    return;
  }

  hideWelcome();
  messages.forEach(msg => appendMessageBubble(msg, false));
  scrollToBottom();
}

function appendMessageBubble(msg, animate = true) {
  const row = document.createElement('div');
  row.className = `message-row ${msg.role}`;
  if (!animate) row.style.animation = 'none';

  const avatarContent = msg.role === 'user'
    ? 'E'
    : '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="white"/></svg>';

  const renderedContent = msg.role === 'assistant'
    ? renderMarkdown(msg.content)
    : escapeHtml(msg.content);

  row.innerHTML = `
    <div class="message-wrapper">
      <div class="message-avatar">${avatarContent}</div>
      <div class="message-content">
        <div class="message-bubble">${renderedContent}</div>
        <div class="message-meta">
          <span class="message-time">${formatTime(msg.timestamp)}</span>
        </div>
      </div>
    </div>
  `;

  chatMessages.appendChild(row);
  // Bind copy buttons
  row.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => copyCode(btn));
  });
  return row;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || isTyping) return;

  // Ensure conversation exists
  if (!activeConversationId) {
    createNewChat();
  }

  const conv = conversations.find(c => c.id === activeConversationId);
  if (!conv) return;

  hideWelcome();

  // Add user message
  const userMsg = {
    role: 'user',
    content: text,
    timestamp: new Date().toISOString()
  };
  conv.messages.push(userMsg);
  appendMessageBubble(userMsg);

  // Update conversation title from first message
  if (conv.messages.length === 1) {
    conv.title = text.length > 40 ? text.slice(0, 40) + '...' : text;
    chatTitle.textContent = conv.title;
    renderConversationList();
  }

  saveConversations();

  // Reset input
  messageInput.value = '';
  messageInput.style.height = 'auto';
  btnSend.disabled = true;

  scrollToBottom();

  // Show typing then respond
  showTypingIndicator();
  isTyping = true;

  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    removeTypingIndicator();
    const response = findResponse(text);
    streamResponse(conv, response);
  }, delay);
}

function showTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'message-row assistant';
  row.id = 'typingRow';

  row.innerHTML = `
    <div class="message-wrapper">
      <div class="message-avatar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="white"/></svg>
      </div>
      <div class="message-content">
        <div class="message-bubble">
          <div class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  chatMessages.appendChild(row);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById('typingRow');
  if (el) el.remove();
}

// ── Streaming / Typewriter ────────────────────────────────────────
function streamResponse(conv, text) {
  const msg = {
    role: 'assistant',
    content: text,
    timestamp: new Date().toISOString()
  };

  // Create message row with empty bubble
  const row = document.createElement('div');
  row.className = 'message-row assistant';
  row.innerHTML = `
    <div class="message-wrapper">
      <div class="message-avatar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="white"/></svg>
      </div>
      <div class="message-content">
        <div class="message-bubble"><span class="cursor-blink"></span></div>
        <div class="message-meta">
          <span class="message-time">${formatTime(msg.timestamp)}</span>
        </div>
      </div>
    </div>
  `;
  chatMessages.appendChild(row);
  scrollToBottom();

  const bubble = row.querySelector('.message-bubble');
  let charIndex = 0;
  const speed = 8; // ms per character
  let accumulated = '';

  function typeChar() {
    if (charIndex < text.length) {
      // Add characters in small batches for performance
      const batchSize = Math.min(3, text.length - charIndex);
      accumulated += text.slice(charIndex, charIndex + batchSize);
      charIndex += batchSize;

      bubble.innerHTML = renderMarkdown(accumulated) + '<span class="cursor-blink"></span>';
      scrollToBottom();

      // Bind copy buttons during streaming
      bubble.querySelectorAll('.btn-copy').forEach(btn => {
        if (!btn.dataset.bound) {
          btn.dataset.bound = 'true';
          btn.addEventListener('click', () => copyCode(btn));
        }
      });

      setTimeout(typeChar, speed);
    } else {
      // Done streaming
      bubble.innerHTML = renderMarkdown(text);
      bubble.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => copyCode(btn));
      });
      conv.messages.push(msg);
      saveConversations();
      isTyping = false;
      scrollToBottom();
    }
  }

  typeChar();
}

// ── Response Matching ─────────────────────────────────────────────
function findResponse(input) {
  const lower = input.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += kw.length; // Longer keyword matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// ── Markdown Rendering ────────────────────────────────────────────
function renderMarkdown(text) {
  // Process code blocks first (preserve them from other processing)
  const codeBlocks = [];
  let processed = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const placeholder = `%%CODEBLOCK_${codeBlocks.length}%%`;
    const langLabel = lang || 'code';
    const highlighted = highlightSyntax(code.trim(), lang);
    codeBlocks.push(`
      <div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-block-lang">${escapeHtml(langLabel)}</span>
          <button class="btn-copy" data-code="${encodeURIComponent(code.trim())}">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            Copy
          </button>
        </div>
        <pre><code>${highlighted}</code></pre>
      </div>
    `);
    return placeholder;
  });

  // Inline code
  processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  processed = processed.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  processed = processed.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  processed = processed.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Tables (basic)
  processed = processed.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split('|').map(c => c.trim());
    if (cells.every(c => /^[-:]+$/.test(c))) return ''; // separator row
    const cellTags = cells.map(c => `<td style="padding:4px 10px;border:1px solid var(--border)">${c}</td>`).join('');
    return `<tr>${cellTags}</tr>`;
  });
  processed = processed.replace(/(<tr>.*<\/tr>\n?)+/gs, (match) => {
    return `<table style="border-collapse:collapse;margin:8px 0;font-size:13px">${match}</table>`;
  });

  // Unordered lists
  processed = processed.replace(/^- (.+)$/gm, '<li>$1</li>');
  processed = processed.replace(/(<li>.*<\/li>\n?)+/gs, (match) => `<ul>${match}</ul>`);

  // Ordered lists
  processed = processed.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Paragraphs - wrap loose text blocks
  processed = processed.replace(/\n\n/g, '</p><p>');
  if (!processed.startsWith('<')) processed = '<p>' + processed;
  if (!processed.endsWith('>')) processed += '</p>';

  // Clean up empty paragraphs
  processed = processed.replace(/<p>\s*<\/p>/g, '');
  processed = processed.replace(/<p>(<[hulo])/g, '$1');
  processed = processed.replace(/(<\/[hulo][^>]*>)<\/p>/g, '$1');
  processed = processed.replace(/<p>(<div)/g, '$1');
  processed = processed.replace(/(<\/div>)<\/p>/g, '$1');
  processed = processed.replace(/<p>(<table)/g, '$1');
  processed = processed.replace(/(<\/table>)<\/p>/g, '$1');

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    processed = processed.replace(`%%CODEBLOCK_${i}%%`, block);
  });

  return processed;
}

// ── Syntax Highlighting (lightweight) ─────────────────────────────
function highlightSyntax(code, lang) {
  let escaped = escapeHtml(code);

  // Comments
  escaped = escaped.replace(/(\/\/.*$|#.*$)/gm, '<span class="cm">$1</span>');
  escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="cm">$1</span>');
  escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="cm">$1</span>');

  // Strings
  escaped = escaped.replace(/(&quot;.*?&quot;|&#x27;.*?&#x27;|`[^`]*`)/g, '<span class="str">$1</span>');

  // Keywords
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try',
    'catch', 'throw', 'new', 'this', 'typeof', 'instanceof', 'true', 'false',
    'null', 'undefined', 'def', 'self', 'print', 'with', 'as', 'in', 'not',
    'and', 'or', 'None', 'True', 'False', 'SELECT', 'FROM', 'WHERE', 'JOIN',
    'ON', 'GROUP', 'BY', 'ORDER', 'INSERT', 'UPDATE', 'DELETE', 'CREATE',
    'TABLE', 'INDEX', 'INTO', 'VALUES', 'SET', 'HAVING', 'LIMIT', 'INNER',
    'LEFT', 'RIGHT', 'AS', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'DISTINCT',
    'interface', 'type', 'extends', 'implements', 'enum', 'readonly',
    'public', 'private', 'protected', 'static', 'abstract', 'override',
    'yield', 'switch', 'case', 'break', 'continue', 'do', 'finally',
    'void', 'super', 'of', 'using', 'namespace', 'struct'
  ];
  const kwPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  escaped = escaped.replace(kwPattern, (m) => {
    // Don't highlight inside already-highlighted spans
    return `<span class="kw">${m}</span>`;
  });

  // Numbers
  escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');

  // Function calls
  escaped = escaped.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="fn">$1</span>');

  return escaped;
}

// ── Copy Code ─────────────────────────────────────────────────────
function copyCode(btn) {
  const code = decodeURIComponent(btn.dataset.code);
  navigator.clipboard.writeText(code).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Copied!
    `;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        Copy
      `;
    }, 2000);
  });
}

// ── Utilities ─────────────────────────────────────────────────────
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  const days = Math.floor(diff / 86400000);

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

// ── Expose to HTML onclick ────────────────────────────────────────
window.switchConversation = switchConversation;
window.deleteConversation = deleteConversation;

// ── Boot ──────────────────────────────────────────────────────────
init();
