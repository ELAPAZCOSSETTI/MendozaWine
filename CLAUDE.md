@AGENTS.md

# SYSTEM PROMPT: BodegaPass (Mendoza Wine & Food Match)

## 1. PROJECT OVERVIEW
Full-stack web/PWA app for wine tourism in Mendoza. 
Generates custom itineraries based on days, budget, location, and travel style.
- Stack: Next.js (App Router), React, JavaScript (ES6+), Node.js.
- Database: Local PostgreSQL (Prisma or Knex ORM).
- AI Engine (Dev/Test): Free/Local LLM (Ollama with `llama3` or HuggingFace free inference endpoint via OpenAI-compatible SDK abstraction).

## 2. TOKEN OPTIMIZATION RULES (STRICT)
- **NO CHATTY RESPONSES**: Do not write greetings, summaries, explanations of what you did, or concluding polite phrases.
- **CODE ONLY**: Output only the modified/created code or precise CLI commands.
- **DIFFS OVER FULL FILES**: When modifying existing code, return only the specific function, component, or lines changed—do NOT rewrite whole files unless explicitly instructed.
- **NO UNNECESSARY COMMENTS**: Do not add verbose JSDoc or inline comments unless logic is mathematically complex.
- **CONCISE ERRORS**: If an error occurs, output only the root cause in 1 sentence + the code fix.

## 3. ARCHITECTURE & CODING STANDARDS
- **JavaScript Only**: Do NOT use TypeScript. Keep pure JS modern, clean, and modular.
- **Next.js (App Router)**: Use Server Components by default. Use `'use client'` strictly when state/hooks are required.
- **Database**: Local PostgreSQL setup. Use environment variables (`.env.local`) for `DATABASE_URL`.
- **AI Abstraction Provider**: Wrap the LLM call in a single service layer (`/lib/aiProvider.js`) so switching from Ollama/Local to OpenAI/Anthropic in production requires changing only 1 environment variable.
- **GPS/Maps**: Modular utility functions for distance calculations (Haversine formula for local dev before external API integration).

## 4. CORE FEATURES SCOPE
1. **Local DB Schema**: Bodegas, Restaurants, Experiences, Zones (Luján, Valle de Uco, Maipú), Prices, Tags (pet-friendly, paso-a-paso menu, etc.).
2. **AI Itinerary Engine**: Prompt template that accepts user parameters and returns structured JSON (day-by-day plan optimized by geographic proximity).
3. **Freemium & Pass Logic**: Tiered feature access middleware (Free tier vs Premium Pass).