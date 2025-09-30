
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
  if (apiKey) {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch (error) {
      console.error("Error initializing GoogleGenAI:", error);
      ai = null;
    }
  } else {
    ai = null;
  }
};


const model = 'gemini-2.5-flash';

const API_KEY_ERROR_MESSAGE = "Error: La clave API de Google AI no ha sido configurada. Por favor, ingrésela haciendo clic en el ícono de la llave en la esquina superior derecha.";

const SYSTEM_INSTRUCTION = `Eres 'Lex Dominicana', un asistente de IA experto en el marco legal de la República Dominicana. Tus respuestas deben basarse EXCLUSIVAMENTE en la legislación dominicana vigente. NUNCA ofrezcas asesoría legal directa ni opiniones personales. Tu objetivo es informar de manera precisa y objetiva. Es CRÍTICO que cada afirmación legal que hagas esté respaldada por una cita de la fuente exacta (por ejemplo: 'según el Artículo 47 de la Ley No. 631-16...'). Si no encuentras una base legal directa para la pregunta del usuario, indícalo claramente. Eres una herramienta de consulta, no un abogado.`;

export const getLegalResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    return API_KEY_ERROR_MESSAGE;
  }
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Lower temperature for more factual, less creative responses
        topP: 0.9,
        topK: 30,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, ha ocurrido un error al procesar tu solicitud. Es posible que la pregunta contenga contenido no seguro, que la clave API sea inválida o que haya un problema con el servicio. Por favor, intenta de nuevo más tarde.";
  }
};

export const generateLegalDocument = async (templateTitle: string, formData: { [key: string]: string }): Promise<string> => {
  if (!ai) {
    return API_KEY_ERROR_MESSAGE;
  }
  const prompt = `
    **Tarea:** Redactar un borrador de documento legal para la República Dominicana.
    **Rol:** Asistente de redacción.
    **Instrucción Clave:** Utiliza la información proporcionada para completar la plantilla del documento. El resultado debe ser solo el texto del documento, sin comentarios adicionales, advertencias ni formato markdown.

    **Tipo de Documento:** ${templateTitle}

    **Datos para el Documento:**
    ${Object.entries(formData)
      .map(([label, value]) => `- ${label}: ${value}`)
      .join('\n')}

    **Directrices de Formato y Contenido:**
    1.  Usa un lenguaje formal y la terminología legal estándar de la República Dominicana.
    2.  Estructura el documento con cláusulas claras y párrafos bien definidos.
    3.  Incorpora todos los "Datos para el Documento" en las secciones correspondientes.
    4.  Añade las cláusulas estándar requeridas para este tipo de contrato (ej. objeto, precio, duración, obligaciones de las partes, jurisdicción aplicable, etc.).
    5.  Concluye con un espacio para las firmas de las partes (nombre completo y cédula) y un espacio para la fecha y lugar.
    6.  Incluye el siguiente párrafo de cierre: "Hecho y firmado en dos (2) originales de un mismo tenor y efecto, uno para cada una de las partes."
    7.  Genera únicamente el texto del documento legal. No incluyas títulos como "Borrador" o notas de la IA.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        // No system instruction here to allow for more creative document generation
        temperature: 0.5,
        topP: 0.95,
        topK: 40,
      },
    });
     if (!response.text || response.text.trim() === '') {
       return "La IA no pudo generar el documento. Esto puede ocurrir si la solicitud infringe las políticas de seguridad. Por favor, ajuste los datos e intente de nuevo.";
    }
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for document generation:", error);
    return "Error al generar el documento. Por favor, revise los datos e intente nuevamente. Si el problema persiste, es posible que el servicio no esté disponible o la clave API sea inválida.";
  }
};
