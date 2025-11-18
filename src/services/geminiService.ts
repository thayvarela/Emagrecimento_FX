import { GoogleGenAI, Type } from "@google/genai";
import { TargetShape, WeeklyPlan } from '../types.ts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const planSchema = {
  type: Type.OBJECT,
  properties: {
    plan: {
      type: Type.ARRAY,
      description: "Um plano de 7 dias com refeições e treinos. Cada dia deve ter pelo menos 3 refeições e 1 treino. Os dias devem estar em ordem, começando pela Segunda-feira.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.STRING,
            description: "Dia da semana (ex: 'Segunda-feira')."
          },
          meals: {
            type: Type.ARRAY,
            description: "Lista de refeições para o dia.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: {
                  type: Type.STRING,
                  description: "Horário da refeição (ex: '08:00')."
                },
                description: {
                  type: Type.STRING,
                  description: "Descrição detalhada da refeição."
                },
              },
              required: ["time", "description"],
            },
          },
          workouts: {
            type: Type.ARRAY,
            description: "Lista de treinos para o dia. Se for dia de descanso, este array pode estar vazio.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: {
                  type: Type.STRING,
                  description: "Horário do treino (ex: '18:00')."
                },
                description: {
                  type: Type.STRING,
                  description: "Descrição detalhada do treino, incluindo exercícios, séries e repetições."
                },
              },
              required: ["time", "description"],
            },
          },
        },
        required: ["day", "meals", "workouts"],
      },
    },
  },
  required: ["plan"],
};

// We modify the return type to Omit the properties we will add manually
export const generatePlan = async (weight: number, height: number, age: number, shape: TargetShape): Promise<Omit<WeeklyPlan, 'id' | 'createdAt' | 'userInput'> | null> => {
  try {
    const prompt = `
      Crie um plano de emagrecimento e condicionamento físico detalhado de 7 dias para uma pessoa com as seguintes características:
      - Peso: ${weight} kg
      - Altura: ${height} cm
      - Idade: ${age} anos
      - Objetivo de Shape: ${shape}

      O plano deve incluir:
      1.  Refeições diárias (café da manhã, lanche, almoço, lanche, jantar) com horários e descrições claras.
      2.  Treinos diários com horários e descrições detalhadas dos exercícios, incluindo séries e repetições. Se um dia for de descanso, o array de treinos pode ser vazio.
      3.  O plano deve ser realista, saudável e sustentável.
      4.  Assegure-se de que a resposta siga estritamente o schema JSON fornecido.
      5. Os dias da semana devem ser retornados em ordem, de Segunda-feira a Domingo.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
        temperature: 0.7,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedPlan = JSON.parse(jsonText) as { plan: WeeklyPlan['plan'] };
    
    // Basic validation
    if (parsedPlan && Array.isArray(parsedPlan.plan) && parsedPlan.plan.length > 0) {
        return parsedPlan;
    }
    
    return null;

  } catch (error) {
    console.error("Error generating plan with Gemini:", error);
    return null;
  }
};
