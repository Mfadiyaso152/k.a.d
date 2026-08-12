
import { GoogleGenAI } from "@google/genai";

export const generateRamadanGreeting = async (name: string, tone: string): Promise<string> => {
  // Always initialize with direct process.env.API_KEY and correct object structure per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";

  const prompt = `أنت مساعد ذكي يساعد محمد في صياغة تهاني رمضان. 
  المطلوب: كتابة رسالة تهنئة بمناسبة شهر رمضان المبارك لشخص يدعى "${name}". 
  أسلوب الكتابة يجب أن يكون "${tone === 'formal' ? 'رسمي وراقي' : 'ودي وقريب للقلب'}". 
  يجب أن تنتهي الرسالة بعبارة: "مع تحيات محمد". 
  اكتب الرسالة باللغة العربية بأسلوب أدبي جميل وبليغ ومختصر (لا يزيد عن 50 كلمة).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    // The text property returns the generated content; do not use .text()
    return response.text?.trim() || "رمضان كريم من محمد!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `يا ${name}، رمضان كريم ومبارك عليك وعلى أحبائك. تقبل الله طاعاتكم. مع تحيات محمد.`;
  }
};
