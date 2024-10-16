import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const documents = {
  crowley: 'Crowley MOU 1 may 2024',
  express: 'Express Class Salient Points 2022',
  drycargo: 'MEBA 86-96 Dry Cargo Agreement'
};

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key is not set' }, { status: 500 });
  }

  try {
    const { messages, linkedDocuments }: { messages: any[], linkedDocuments: (keyof typeof documents)[] } = await req.json();

    let context = '';
    for (const docId of linkedDocuments) {
      if (documents[docId]) {
        const documentPath = path.join(process.cwd(), 'data', documents[docId]);
        try {
          const documentContent = await fs.readFile(documentPath, 'utf-8');
          context += `Content from ${documents[docId]}:\n${documentContent}\n\n`;
        } catch (fileError) {
          console.error(`Error reading file ${documentPath}:`, fileError);
          context += `Content from ${documents[docId]}: [Error reading file]\n\n`;
        }
      }
    }

    const systemMessage = {
      role: 'system',
      content: `You are MEBAssistant, an AI specialized in MEBA (Marine Engineers' Beneficial Association) agreements and policies. 
      Format your responses using HTML tags for better readability. Use <h3> for subheadings, <p> for paragraphs, <ul> or <ol> for lists, and <strong> for emphasis. 
      When referencing specific sections of documents, use <cite> tags.
      
      Here's the context from the linked documents:
      ${context}
      
      Use this information to inform your responses about MEBA agreements and policies.`
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('OpenAI API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `An error occurred during your request: ${errorMessage}` }, { status: 500 });
  }
}