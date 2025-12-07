# How to Try the Demo

## Option 1: Run Locally (5 minutes)

### Prerequisites
- Node.js 18+ installed
- Groq API key ([get one free](https://console.groq.com))

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/brain-dump.git
cd brain-dump/brain-dump-nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env.local file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

---

## What to Try

### Test Case 1: Simple Idea
**Input:**
```
I want to build a todo app
```

**Expected Output:**
- Clear interpretation of the goal
- Key insights about todo app features
- Processing time: ~7-8 seconds

---

### Test Case 2: Complex/Messy Thought
**Input:**
```
I'm thinking about maybe creating some kind of system where people can like share their ideas but also get feedback and I'm not sure if it should be public or private or both and maybe there could be voting or comments or something
```

**Expected Output:**
- Structured breakdown of the concept
- Identified uncertainties (public vs private, feedback mechanisms)
- Suggested considerations
- Processing time: ~7-8 seconds

---

### Test Case 3: Brainstorming
**Input:**
```
Need to plan a team offsite but budget is tight, maybe virtual activities, or local park, not sure about timing either
```

**Expected Output:**
- Extracted constraints (budget, location options)
- Key decisions needed (virtual vs in-person, timing)
- Organized thoughts
- Processing time: ~7-8 seconds

---

## What You'll See

### Visual Feedback
Watch the 5 blob characters animate as each agent processes:
1. **Listie** (pink) - Listening and extracting
2. **Linky** (cyan) - Finding connections
3. **Wordy** (yellow) - Clarifying language
4. **Sparky** (orange) - Challenging assumptions
5. **Blendy** (purple) - Synthesizing final output

### Result Card
After processing, you'll see:
- **Interpretation:** Clear summary of what you want/need
- **Key Points:** 3-4 structured insights
- **Actions:** "Yes! Nailed it" or "Try again"

---

## Known Limitations During Demo

### Processing Time
- Expect 7-8 seconds per request
- This is 5 sequential API calls, not optimized for speed

### JSON Parsing
- ~10-15% of requests may show slightly malformed output
- Agents sometimes ignore JSON format instructions

### Input Length
- Keep input under 500 words for best results
- Very long input may timeout

### Cost
- Each demo request costs ~$0.01-0.02 in API calls
- Be mindful if using personal API key

---

## Troubleshooting

### "Failed to process" Error
**Cause:** Invalid Groq API key or API rate limit

**Fix:**
1. Check `.env.local` has correct API key
2. Verify API key is active at https://console.groq.com
3. Wait 1 minute and try again (rate limit)

---

### Blank Screen / Won't Load
**Cause:** Port 3000 already in use

**Fix:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

### Agents Stuck on "Processing"
**Cause:** Network timeout or API error

**Fix:**
1. Check internet connection
2. Refresh page and try again
3. Check browser console for errors (F12)

---

## Demo Video

[Coming soon - will add screen recording]

---

## Questions?

This is a portfolio project. If you're reviewing for hiring/collaboration:
- **Email:** [your email]
- **LinkedIn:** [your LinkedIn]
- **GitHub:** [your GitHub]

---

**Last Updated:** December 6, 2024
