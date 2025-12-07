# Known Issues & Limitations

## Current Limitations (Design Constraints)

### Not Truly Agentic
**Issue:** Agents run in a fixed sequence (Listie → Linky → Wordy → Sparky → Blendy) with no autonomous decision-making.

**Impact:** 
- Can't adapt processing based on input complexity
- Always runs all 5 agents even if unnecessary
- No dynamic routing or looping back

**Why:** Built as sequential pipeline for simplicity. True agentic behavior requires LangGraph (see Roadmap).

---

### No Tool Use
**Issue:** Agents can't access external tools (web search, databases, calculators, etc.)

**Impact:**
- Limited to knowledge in LLM training data
- Can't fact-check or gather additional context
- Can't perform calculations or lookups

**Why:** Tool integration requires more complex orchestration framework.

---

### Expensive Processing
**Issue:** Each request makes 5 separate API calls (~$0.01-0.02 per use)

**Impact:**
- 5x more expensive than single AI call
- Not cost-effective for production use
- Limits scalability

**Why:** Sequential processing design. Could be optimized with caching or parallel execution.

---

### Slow Response Time
**Issue:** Processing takes 7-8 seconds (5 sequential API calls)

**Impact:**
- Users wait longer than typical AI chat
- Not suitable for real-time applications

**Why:** Sequential processing + network latency. Could improve with streaming or parallel execution.

---

### JSON Parsing Failures
**Issue:** Agents sometimes return invalid JSON despite prompt instructions

**Impact:**
- Fallback to plain text parsing
- Occasional malformed output
- Inconsistent structure

**Frequency:** ~10-15% of requests

**Workaround:** Try-catch with fallback parsing logic

---

### No Input Validation
**Issue:** No length limits or content filtering on user input

**Impact:**
- Very long inputs may timeout
- Inappropriate content not filtered
- No handling of non-English text

**Why:** MVP focused on core functionality first

---

### Single-User Only
**Issue:** No authentication, user accounts, or history

**Impact:**
- Can't save results
- Can't track usage
- No personalization

**Why:** Intentionally out of scope for POC

---

## What We're Fixing

### High Priority (If Continuing Development)
- [ ] Add input validation (max 500 words)
- [ ] Implement streaming responses for better UX
- [ ] Add caching to reduce redundant API calls
- [ ] Improve JSON parsing reliability

### Medium Priority
- [ ] Add save/export functionality
- [ ] Implement rate limiting
- [ ] Add analytics/usage tracking

### Low Priority
- [ ] Add dark mode toggle
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts

---

## What's Intentionally Out of Scope

### LangGraph Migration
**Status:** Planned for Phase 2 (not started)

**Why Not Now:** Adds significant complexity. Current sequential approach is sufficient for POC validation.

**When:** Only if POC proves valuable enough to warrant investment.

---

### Production Deployment
**Status:** Not planned

**Why:** This is a portfolio/demo project, not a product. Production would require:
- User authentication
- Database for history
- Rate limiting
- Content moderation
- Cost optimization
- Monitoring/logging

---

### Mobile App
**Status:** Won't have

**Why:** Web-first focus. Mobile web works adequately for demo purposes.

---

### Real-time Collaboration
**Status:** Won't have

**Why:** Single-user POC. Multi-user would require WebSockets, state sync, conflict resolution.

---

## Edge Cases / Where This Breaks

### Very Long Input (> 500 words)
**Behavior:** May timeout or produce incomplete output

**Recommendation:** Keep input under 500 words

---

### Non-English Text
**Behavior:** Untested, likely degraded quality

**Recommendation:** English only for now

---

### Highly Technical Content
**Behavior:** Agents lack domain expertise (medical, legal, scientific)

**Recommendation:** Use for general brainstorming, not specialized domains

---

### Rapid Repeated Requests
**Behavior:** No rate limiting, could hit Groq API limits

**Recommendation:** Wait for previous request to complete

---

## Reporting Issues

This is a personal portfolio project, not actively maintained for external users.

If you're reviewing this for hiring/collaboration purposes and find issues, feel free to reach out directly rather than opening GitHub issues.

---

**Last Updated:** December 6, 2024
