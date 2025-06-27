# Diary-to-Empathy AI Pipeline

## About This Project

This is my personal implementation of a **13-step modular AI pipeline** designed to transform a single diary transcript entry into an emotionally intelligent, concise AI reply along with a dynamically updated long-term user profile. The system addresses two key scenarios:

- **Cold start:** Processing the first-ever diary entry with no prior user data.
- **Mature profile:** Processing the 100th diary entry after accumulating rich historical context.

The project emphasizes clean modular design, strict logging as per specifications, and mocking external APIs to ensure zero operational cost and ease of local development.

##

Design Assumptions
Embeddings fixed at 384 dimensions (MiniLM standard)

Empathetic reply length capped at ~55 characters

User profile state accumulates incrementally

Entry IDs are auto-incremented per user starting from entry_1

Logging format strictly adheres to specification for ease of testing

Mock implementations replace paid API calls to enable offline development

---

## Core Pipeline Workflow

The pipeline consists of 13 distinct stages, each with a specific role:

| Step               | Purpose                                                        | Input                          | Output                         |
| ------------------ | -------------------------------------------------------------- | ------------------------------ | ------------------------------ |
| `RAW_TEXT_IN`      | Accept raw diary transcript                                    | String (raw text)              | Raw transcript string          |
| `EMBEDDING`        | Generate semantic embedding vector (mocked MiniLM)             | Raw text                       | 384-dimensional embedding      |
| `FETCH_RECENT`     | Retrieve last 5 parsed entries for context                     | User ID                        | Array of recent parsed entries |
| `FETCH_PROFILE`    | Fetch or initialize user profile                               | User ID                        | User profile JSON              |
| `META_EXTRACT`     | Extract lexical and punctuation metadata                       | Raw text                       | Metadata JSON                  |
| `PARSE_ENTRY`      | Parse transcript into structured JSON with theme, vibe, etc.   | Raw text                       | Parsed entry JSON              |
| `CARRY_IN`         | Evaluate thematic or emotional similarity for context carry-in | Current & recent entries       | Boolean carry-in flag          |
| `CONTRAST_CHECK`   | Detect emotional shift vs. dominant profile vibe               | Dominant vibe, new vibe        | Boolean contrast flag          |
| `PROFILE_UPDATE`   | Update profile counters and traits with new entry data         | Parsed entry, existing profile | Updated user profile           |
| `SAVE_ENTRY`       | Persist parsed entry in mock DB with auto-incremented ID       | Parsed entry, User ID          | Entry ID string                |
| `GPT_REPLY`        | Generate concise empathetic response (≤ 55 characters)         | Parsed entry                   | AI response string             |
| `PUBLISH`          | Package final outputs for downstream use                       | Entry ID, response, carry-in   | JSON output package            |
| `COST_LATENCY_LOG` | Log mock API cost and latency                                  | —                              | Log output                     |

Each step emits detailed logs following the pattern:  
`[TAG] input=<...> | output=<...> | note=<...>`

---

## Data Structures & Types

### ParsedEntry

Semantic interpretation of a diary entry:

````ts
interface ParsedEntry {
  theme: string[];
  vibe: string[];
  intent: string;
  subtext: string;
  persona_trait: string[];
  bucket: string[];
}

## Technical Implementation Details

- **Language & Environment:** TypeScript on Node.js 18+
- **Embeddings:** Mocked 384-dim MiniLM vectors for semantic similarity
- **AI Replies:** GPT-like responses generated via mock API calls for cost-free development
- **Storage:** In-memory Maps simulating persistent storage keyed by `userId`
- **Testing:** Unit tests validate carry-in logic, profile updates, and pipeline integrity
- **Linting:** ESLint ensures code quality and maintainability

---

## How to Run

 Install dependencies:

   ```bash
   npm install
   npm run simulate:first
   npm run simulate:hundred

---

Run simulation for first-ever entry (cold start):

bash
Copy
Edit

Run simulation for 100th entry (with prior 99 entries loaded):

bash
Copy
Edit
npm run simulate:hundred
Each simulation prints 13 detailed log lines showing inputs, outputs, and notes per step.

````
