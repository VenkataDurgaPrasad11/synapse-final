import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, CareerPath, Course } from "../types";
import { MOCK_AI_QUIZ, MOCK_AI_CAREER_PATH } from "../constants";


// Always use new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

export const generateText = async (prompt: string): Promise<string> => {
    console.log("Gemini generating text for prompt:", prompt);
    try {
        // Use ai.models.generateContent to query GenAI.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Basic text task
            contents: prompt,
        });
        // Access the .text property for the string output.
        return response.text;
    } catch (error) {
        console.error("Error generating text:", error);
        return "Sorry, I couldn't generate a response right now. Please try again later.";
    }
};

export const generateQuiz = async (courseTitle: string): Promise<QuizQuestion[]> => {
    console.log("Gemini generating quiz for:", courseTitle);
    const prompt = `Generate a 2-question multiple-choice quiz about "${courseTitle}". Each question should have 4 options and a correct answer.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            options: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                            correctAnswer: { type: Type.STRING }
                        },
                        required: ["question", "options", "correctAnswer"]
                    }
                }
            }
        });

        // The response text is a JSON string.
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as QuizQuestion[];
    } catch (error) {
        console.error("Error generating quiz:", error);
        return MOCK_AI_QUIZ; // Return mock on error
    }
};

export const generateCareerPath = async (careerGoal: string, courses: Course[]): Promise<CareerPath | null> => {
     console.log("Gemini generating career path for:", careerGoal);
     
     const courseListForPrompt = JSON.stringify(courses.map(c => ({
         id: c.id,
         title: c.title,
         description: c.description,
         tags: c.tags,
         level: c.level
     })));

     const prompt = `Given the following list of available courses: ${courseListForPrompt}. 
     Generate a realistic career path for a "${careerGoal}". 
     The path must include a title, a brief description, an average salary, and a demand level (High, Medium, or Low). 
     The learning path must consist of exactly 3 steps in a logical order. 
     For each step, you must select the most appropriate course from the provided list and return its corresponding 'id' as 'courseId'.`;

     try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        avgSalary: { type: Type.STRING },
                        demand: { type: Type.STRING },
                        learningPath: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    step: { type: Type.INTEGER },
                                    courseId: { type: Type.INTEGER }
                                },
                                required: ["step", "courseId"]
                            }
                        }
                    },
                    required: ["title", "description", "avgSalary", "demand", "learningPath"]
                }
            }
        });
        
        const jsonText = response.text.trim();
        const parsedPath = JSON.parse(jsonText);
        
        // Map the returned course IDs to full course details for the UI
        return {
            ...parsedPath,
            learningPath: parsedPath.learningPath.map((step: { step: number; courseId: number }) => {
                const course = courses.find(c => c.id === step.courseId);
                return {
                    step: step.step,
                    courseId: step.courseId,
                    title: course ? course.title : "Selected Course",
                    duration: course ? course.duration : "Varies"
                };
            })
        } as CareerPath;

     } catch(error) {
         console.error("Error generating career path:", error);
         return MOCK_AI_CAREER_PATH; // Return mock on error
     }
};


export const generateTimetable = async (prompt: string): Promise<any> => {
    console.log("Gemini generating timetable for prompt:", prompt);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    description: "A JSON object where keys are week numbers (e.g., 'Week 1') and values are arrays of strings representing tasks for that week.",
                    // Adding properties to satisfy schema requirements for OBJECT type.
                    properties: {
                        "Week 1": { type: Type.ARRAY, items: { type: Type.STRING } },
                        "Week 2": { type: Type.ARRAY, items: { type: Type.STRING } },
                        "Week 3": { type: Type.ARRAY, items: { type: Type.STRING } },
                        "Week 4": { type: Type.ARRAY, items: { type: Type.STRING } },
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating timetable:", error);
        return { "Error": "Could not generate a schedule." };
    }
};