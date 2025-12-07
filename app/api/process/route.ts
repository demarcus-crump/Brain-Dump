import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Agent 1: Listie - The Listener
async function listie(input: string) {
    const prompt = `You are Listie, an expert at extracting key information from messy thoughts.

USER INPUT:
"${input}"

TASK:
1. Identify the main ideas (3-5 key points)
2. Extract any action items or tasks mentioned
3. Note the emotional tone or urgency level
4. List any questions or uncertainties the user has

Be concise and clear. Output your analysis as a structured response.

OUTPUT FORMAT (JSON):
{
  "keyPoints": ["point 1", "point 2", ...],
  "actionItems": ["action 1", "action 2", ...],
  "tone": "description of emotional tone",
  "questions": ["question 1", "question 2", ...]
}`;

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    try {
        return JSON.parse(content);
    } catch {
        return { keyPoints: [content], actionItems: [], tone: 'neutral', questions: [] };
    }
}

// Agent 2: Linky - The Connector
async function linky(listieOutput: any) {
    const prompt = `You are Linky, an expert at finding connections and patterns between ideas.

EXTRACTED INFORMATION:
${JSON.stringify(listieOutput, null, 2)}

TASK:
1. Group related ideas together
2. Identify cause-effect relationships
3. Find any contradictions or tensions
4. Map how different ideas connect to each other

OUTPUT FORMAT (JSON):
{
  "groups": [{"name": "group name", "items": ["item 1", "item 2"]}],
  "relationships": ["relationship 1", "relationship 2"],
  "contradictions": ["contradiction 1", ...],
  "connections": ["connection 1", "connection 2"]
}`;

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    try {
        return JSON.parse(content);
    } catch {
        return { groups: [], relationships: [content], contradictions: [], connections: [] };
    }
}

// Agent 3: Wordy - The Translator
async function wordy(linkyOutput: any) {
    const prompt = `You are Wordy, an expert at clarifying and articulating ideas clearly.

CONNECTED IDEAS:
${JSON.stringify(linkyOutput, null, 2)}

TASK:
1. Rephrase any unclear statements in simple, clear language
2. Define any ambiguous terms or concepts
3. Simplify complex ideas into digestible explanations
4. Suggest better, clearer language where needed

OUTPUT FORMAT (JSON):
{
  "clarifications": ["clarification 1", "clarification 2"],
  "definitions": {"term1": "definition", "term2": "definition"},
  "simplifications": ["simplified idea 1", "simplified idea 2"]
}`;

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    try {
        return JSON.parse(content);
    } catch {
        return { clarifications: [content], definitions: {}, simplifications: [] };
    }
}

// Agent 4: Sparky - The Challenger
async function sparky(wordyOutput: any) {
    const prompt = `You are Sparky, a critical thinker who identifies gaps and asks probing questions.

CLARIFIED IDEAS:
${JSON.stringify(wordyOutput, null, 2)}

TASK:
1. Find missing information or gaps in the thinking
2. Identify hidden assumptions being made
3. Ask 2-3 probing questions that would deepen understanding
4. Highlight potential issues or concerns

OUTPUT FORMAT (JSON):
{
  "gaps": ["gap 1", "gap 2"],
  "assumptions": ["assumption 1", "assumption 2"],
  "questions": ["question 1", "question 2"],
  "concerns": ["concern 1", "concern 2"]
}`;

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    try {
        return JSON.parse(content);
    } catch {
        return { gaps: [], assumptions: [], questions: [content], concerns: [] };
    }
}

// Agent 5: Blendy - The Synthesizer
async function blendy(allOutputs: any) {
    const prompt = `You are Blendy, a master synthesizer who creates coherent, actionable output.

ALL AGENT INSIGHTS:
Listie (Listener): ${JSON.stringify(allOutputs.listie, null, 2)}
Linky (Connector): ${JSON.stringify(allOutputs.linky, null, 2)}
Wordy (Translator): ${JSON.stringify(allOutputs.wordy, null, 2)}
Sparky (Challenger): ${JSON.stringify(allOutputs.sparky, null, 2)}

TASK:
Create a final interpretation that:
1. Summarizes the core message in 1-2 clear sentences
2. Lists 3-4 key insights or takeaways
3. Validates understanding with a question

Be helpful, clear, and human-centered.

OUTPUT FORMAT (JSON):
{
  "interpretation": "Clear 1-2 sentence summary of what the user wants/needs",
  "keyPoints": ["insight 1", "insight 2", "insight 3", "insight 4"]
}`;

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    try {
        return JSON.parse(content);
    } catch {
        return { interpretation: content, keyPoints: [] };
    }
}

export async function POST(request: NextRequest) {
    try {
        const { input } = await request.json();

        if (!input || typeof input !== 'string') {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        // Process through all 5 agents sequentially
        const listieOutput = await listie(input);
        const linkyOutput = await linky(listieOutput);
        const wordyOutput = await wordy(linkyOutput);
        const sparkyOutput = await sparky(wordyOutput);
        const blendyOutput = await blendy({
            listie: listieOutput,
            linky: linkyOutput,
            wordy: wordyOutput,
            sparky: sparkyOutput,
        });

        return NextResponse.json({
            success: true,
            result: blendyOutput,
            debug: {
                listie: listieOutput,
                linky: linkyOutput,
                wordy: wordyOutput,
                sparky: sparkyOutput,
            },
        });
    } catch (error: any) {
        console.error('Error processing:', error);
        return NextResponse.json(
            { error: 'Failed to process input', details: error.message },
            { status: 500 }
        );
    }
}
