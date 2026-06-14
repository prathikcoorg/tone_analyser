import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.post('/api/upload-transcript', upload.single('transcript'), async (req, res) => {
    try {
        let transcriptText = "";

        if (req.file) {
            transcriptText = req.file.buffer.toString('utf-8');
        } else if (req.body.text) {
            transcriptText = req.body.text;
        } else {
            return res.status(400).json({ error: "No transcript data provided." });
        }

        const systemInstruction = `You are an advanced AI organizational psychologist. Analyze the meeting transcript text data. 
        Calculate exact speaker talk percentages based on relative word count, flag ignored people, map sentiment chronologically, and return this EXACT JSON format:
        {
          "meetingHealthScore": 85,
          "decisionClarityScore": 70,
          "summary": "Brief narrative summary of meeting alignment",
          "tensionPoints": [{"timestamp": "02:15", "description": "Friction point description", "severity": "Medium"}],
          "sentimentTimeline": [{"timestamp": "01:00", "sentimentScore": 2}],
          "speakerMetrics": [{"name": "John", "talkTimePercentage": 60, "questionsAsked": 3, "isIgnored": false}]
        }`;

        
        const aiResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Here is the transcript data to analyze:\n\n${transcriptText}`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                temperature: 0.1
            }
        });

        const analysis = JSON.parse(aiResponse.text);

    
        try {
            const meetingResult = await pool.query(
                `INSERT INTO meetings (health_score, decision_clarity_score, summary, tension_points, sentiment_timeline) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                [analysis.meetingHealthScore, analysis.decisionClarityScore, analysis.summary, JSON.stringify(analysis.tensionPoints), JSON.stringify(analysis.sentimentTimeline)]
            );

            const meetingId = meetingResult.rows[0].id;

            for (let speaker of analysis.speakerMetrics) {
                await pool.query(
                    `INSERT INTO speaker_metrics (meeting_id, speaker_name, talk_time_percentage, questions_asked, is_ignored) 
                     VALUES ($1, $2, $3, $4, $5)`,
                    [meetingId, speaker.name, speaker.talkTimePercentage, speaker.questionsAsked, speaker.isIgnored]
                );
            }
            res.json({ meetingId, ...analysis });
        } catch (dbError) {
            console.warn("Database save skipped or failed, passing raw data to frontend.", dbError.message);
           
            res.json({ meetingId: 1, ...analysis });
        }

    } catch (error) {
        console.error("Backend processing error:", error);
        res.status(500).json({ error: "Internal server error processing transcript." });
    }
});


app.get('/api/meetings', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, summary, health_score, created_at 
             FROM meetings 
             ORDER BY created_at DESC`
        );
  
        const history = result.rows.map(row => ({
            id: row.id,
            title: row.summary ? row.summary.split('.').slice(0, 2).join('.') + '...' : `Meeting #${row.id}`,
            date: row.created_at ? new Date(row.created_at).toLocaleDateString() : 'Recent Run',
            health: row.health_score
        }));

        res.json(history);
    } catch (error) {
        console.error("Database fetch error:", error.message);
        res.status(500).json({ error: "Failed to retrieve archive rows." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend engine online on port ${PORT} via Gemini AI`));