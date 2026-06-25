import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // Initialize GoogleGenAI client (server-side only)
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for generating learning roadmaps
  app.post("/api/generate-roadmap", async (req, res) => {
    try {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ error: "Missing onboarding data" });
      }

      const {
        fullName,
        role,
        studentInfo,
        teacherInfo,
        parentInfo,
        adminInstitution,
        adminDepartment,
        preferredFormats,
        dailyLearningTime,
        preferredLanguage,
        generalLearningGoals
      } = data;

      let roleContext = "";
      if (role === "student") {
        roleContext = `
Role: Student
Level/Grade: ${studentInfo?.currentLevel || "Not specified"} (Grade: ${studentInfo?.grade || "Not specified"})
School Name: ${studentInfo?.schoolName || "Not specified"}
Preferred Subjects: ${studentInfo?.preferredSubjects?.join(", ") || "None specified"}
`;
      } else if (role === "teacher") {
        roleContext = `
Role: Teacher / Educator
Institution: ${teacherInfo?.institutionName || "Not specified"}
Teaching Experience: ${teacherInfo?.teachingExperience || "Not specified"}
Subjects Taught: ${teacherInfo?.subjectsTaught?.join(", ") || "None specified"}
Qualification: ${teacherInfo?.qualification || "Not specified"}
`;
      } else if (role === "parent") {
        roleContext = `
Role: Parent / Guardian
Child's Grade Level: ${parentInfo?.childGrade || "Not specified"}
Number of Children: ${parentInfo?.numberOfChildren || 1}
Family Learning Goals: ${parentInfo?.learningGoals || "None specified"}
`;
      } else if (role === "admin") {
        roleContext = `
Role: Academic Administrator
Institution Name: ${adminInstitution || "Not specified"}
Department: ${adminDepartment || "Not specified"}
`;
      }

      const prompt = `
You are an expert academic counselor and educational designer. Generate a highly personalized, encouraging, and structured "EduQuest Learning Roadmap & Strategic Syllabus" for ${fullName || "our valued user"}.

Construct the roadmap based on their onboarding profile below:

---
${roleContext}
Preferred Learning Formats: ${preferredFormats?.join(", ") || "None specified"}
Daily Time Commitment: ${dailyLearningTime || "Not specified"}
Preferred Language: ${preferredLanguage || "English"}
General Learning Milestones: ${generalLearningGoals || "Continuous growth"}
---

Your response MUST be written entirely in the user's preferred language (${preferredLanguage || "English"}).
Format the roadmap in clean, modern markdown (using bold titles, styled sections, checklists, bullet points, and high-quality formatting). Do NOT include any HTML tags, raw JSON, or system keys.

Structure the Roadmap using these exact markdown headers:
1. **Introduction & Educational Strategy**: A personalized greeting addressing their role and validating their setup. Highlight how their unique preferences will power their dashboard.
2. **Phase 1: Foundation (Days 1-10)**: Step-by-step milestones utilizing their chosen formats (e.g., ${preferredFormats?.join(", ")}) and matching their daily commitment (${dailyLearningTime}).
3. **Phase 2: Core Acceleration (Days 11-30)**: Challenging practical applications or exercises matching their academic level and learning goals.
4. **Phase 3: Integration & Mastery (Days 30+)**: Long-term habits and workspace parameters for success.
5. **Key Platform Pro-Tips**: 2-3 specific, high-value tips for their role to maximize their EduQuest workspace.

Make the tone highly professional, encouraging, and inspirational. Keep the markdown beautiful and clean.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Roadmap generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate your personalized learning roadmap." });
    }
  });

  // Vite integration middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
