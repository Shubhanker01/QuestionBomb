# Project Requirements Document (PRD): QuestionBomb

## 📌 1. Project Metadata
* **Project Name:** QuestionBomb
* **Target Hackathon:** Build with Gemini XPRIZE ($2M Global Challenge)
* **Track:** Education & Human Potential
* **Tech Stack:** MERN Stack (MongoDB, Express, React, Node.js) + TypeScript + Google Gemini SDK
* **Deployment Platform:** Google Cloud Run (Serverless Container Platform)

---

## 🎯 2. Executive Summary & Problem Statement

### The Problem
UPSC Combined Defence Services (CDS) aspirants face massive resource fragmentation and "static content inertia." While notes and basic question banks are widely accessible across the web, finding context-targeted, high-fidelity practice sets that mirror UPSC's modern conceptual testing style requires scrolling through messy platforms or joining capital-intensive physical coaching academies. Furthermore, static mock tests do not adapt to individual weaknesses, and students must wait days for evaluations.
The preparation landscape for the UPSC Combined Defence Services (CDS) examination suffers from a critical three-part crisis that compromises candidate efficiency and performance:

1. Hyper-Fragmented Resource Ecosystems: While foundational question banks exist across the web, they are isolated across dozens of disconnected websites and static platforms. Candidates face intense cognitive fatigue manually sorting and compiling these disparate segments into cohesive mock testing patterns.

2. Environment Inefficiency (The Telegram Trap): Seeking immediate, cost-effective daily practice, millions of defense aspirants resort to crowd-sourced Telegram channels and messaging groups to attempt sporadic quiz polls. However, Telegram is fundamentally an asynchronous messaging utility, not a focus-driven workspace. Attempting to practice within a chaotic stream of notifications, group chats, and resource leaks shatters the psychological "Deep Work" immersion necessary for exam success—turning rigorous conditioning into a distraction loop.

3. The High-Yield NCERT Deficit: UPSC exams rely heavily on the conceptual foundations of NCERT textbooks. However, standard question repositories completely neglect high-yield, exam-aligned NCERT extractions. To get structured, concept-targeted questions built directly from foundational textbooks, candidates are forced to either join capital-intensive physical coaching academies or browse unstructured, unverified social media channels.

### The Solution
**QuestionBomb** is an AI-native adaptive exam engine that decentralizes elite exam coaching. Instead of serving pre-compiled static test papers, the system leverages Google Gemini to generate high-fidelity, concept-targeted mock questions **on the go**, completely tailored to the student’s live learning behavior. The application evaluates answers instantly and exposes cognitive gaps through real-time feedback loops—providing a personalized coaching experience at a minute fraction of traditional costs.

---

## 🏗️ 3. Architecture 

### 3.1 Tech Stack Architecture
* **Frontend:** React (Vite + TypeScript) + Tailwind CSS
* **Backend:** Express + Node.js (TypeScript) deployed on Google Cloud Run
* **Database:** MongoDB Atlas (Structured purely for telemetry logging, no bulky text blocks)
* **AI Engine:** Google Gemini SDK (`gemini-2.5-flash` model for structured JSON outputs)
* **Auth & Payments:** Google OAuth (Direct Gmail signup) + Stripe API (Payment infrastructure)

## 🚀 4. Core App Features & Technical Specifications

### 4.1 Authentication and Authorization (Frictionless Onboarding)
* **Functional Description:** To remove boundaries for busy defense aspirants, QuestionBomb bypasses traditional password management. Users authenticate via a native Google One-Tap/OAuth button on the frontend client. 
* **Technical Flow:** 
  1. The React frontend obtains a secure cryptographic `id_token` directly from Google's client service.
  2. The token is dispatched to the backend `POST /api/auth/google` gateway.
  3. The TypeScript backend uses the official `google-auth-library` to securely verify the signature against Google's public keys.
  4. If the email signature is validated, a session is established, user metadata is synced with MongoDB, and an application-level bearer access handshake completes.

### 4.2 Mock Engine (Sectional & Topic-Wise)
* **Functional Description:** High yield sectional and topic wise questions generated for the aspirants.
* **Technical Flow:**
  1. Express handlers receive structural variables (`section`, `topic`, `difficulty`) from the React arena dashboard.
  2. The system initiates a request using the official `@google/genai` client targeting the `gemini-2.5-flash` model.
  3. By declaring a rigid, schema-constrained `responseSchema` configuration, the model is restricted to returning a strictly structured JSON object containing an array of custom questions, distraction-trap options, correct answer indices, and deeply specific explanatory feedback.

### 4.3 AI Post-Mock Performance Analytics
* **Functional Description:** Once a user submits their completed mock exam, the application runs deep diagnostic tracking over their attempt rather than just rendering a basic numeric score. The interface breaks down their precise conceptual blind spots and categorizes errors.
* **Technical Flow:**
  1. The client-side state logs exact behavioral patterns, creating a performance dataset. This includes total elapsed time, a precise array of `timeSpentSecondsPerQuestion`, and tracking for "option oscillation" (detecting when a user toggles an option back and forth due to lack of confidence).
  2. This aggregate diagnostic array is routed back through the API alongside a request for analytical summary evaluation.
  3. The Gemini API analyzes the metrics and returns an actionable report:
     ```json
     {
       "cognitiveGaps": ["Confusing absolute veto with suspensive veto parameters"],
       "speedEfficiency": "Pacing on Question 3 indicates hesitation; review core articles.",
       "actionableRemediationPlan": "Review NCERT Class XI Indian Constitution at Work, Chapter 2."
     }
     ```
  4. This telemetry report is persistently committed to the MongoDB `user_analytics` log cluster to build historical charts on the student's personal optimization dashboard.


## 🛑 5. API Endpoint Architecture (`api/v1/`)

All requests and responses communicate via strict JSON payloads. Protected endpoints require a valid Bearer Token passed inside the HTTPS Authorization header.

### 5.1 Authentication Sub-System (`/auth`)

| Method | Endpoint | Access | Description | Request Payload |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/signup` | Public | Registers a new defense aspirant via Google `id_token` verification. | `{ "idToken": "string" }` |
| **POST** | `/api/v1/auth/login` | Public | Validates an existing user session and issues an app-level access token. | `{ "idToken": "string" }` |

### 5.2 Mock Engine Sub-System (`/mock`)

| Method | Endpoint | Access | Description | Query Parameters |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/mock/science/:section` 
| **GET** | `/api/v1/mock/geography/:section` 

*Note: `:section` represents dynamic parameters corresponding to the curated NCERT syllabus (e.g., `/api/v1/mock/science/physics`, `/api/v1/mock/geography/physical-geography`).*


