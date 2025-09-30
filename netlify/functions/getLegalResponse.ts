import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Eres 'Lex Dominicana', un asistente de IA experto en el marco legal de la República Dominicana. Tus respuestas deben basarse EXCLUSIVAMENTE en la legislación dominicana vigente. NUNCA ofrezcas asesoría legal directa ni opiniones personales. Tu objetivo es informar de manera precisa y objetiva. Es CRÍTICO que cada afirmación legal que hagas esté respaldada por una cita de la fuente exacta (por ejemplo: 'según el Artículo 47 de la Ley No. 631-16...'). Si no encuentras una base legal directa para la pregunta del usuario, indícalo claramente. Eres una herramienta de consulta, no un abogado.`;

// El handler para la función serverless de Netlify
export const handler = async (event) => {
  // Permitir solo peticiones POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Asegurar que la API key está configurada en las variables de entorno
  if (!process.env.API_KEY) {
    console.error("API key is not configured.");
    return { statusCode: 500, body: JSON.stringify({ error: "La clave API no está configurada en el servidor." }) };
  }
  
  try {
    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "El prompt es requerido." }) };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        topP: 0.9,
        topK: 30,
      },
    });

    const text = response.text;

    return {
      statusCode: 200,
      body: JSON.stringify({ response: text }),
    };
  } catch (error) {
    console.error("Error in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Ocurrió un error al procesar tu solicitud." }),
    };
  }
};
