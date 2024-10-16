import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY); // Debugging statement

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const documents = {
  'crowley': 'Crowley Consolidated MOU 1 may 2024',
  'express': 'Express Class Salient Points 2022',
  'drycargo': 'MEBA 86-96 Dry Cargo Agreement'
};

export async function POST(req) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key is not set' }, { status: 500 });
  }

  try {
    const { messages, document } = await req.json();

    let context = '';
    if (document && documents[document]) {
      const documentPath = path.join(process.cwd(), 'data', documents[document]);
      context = await fs.readFile(documentPath, 'utf-8');
    }

    const systemMessage = {
      role: 'system',
      content: `You are a contract attorney specializing in union contracts and labor law. ${context ? `Here's some context from the ${documents[document]}: ${context}\n\n` : ''}Please analyze the union contract document. Specifically:

1. Explain what rights and obligations this clause creates for union members.
2. Identify any potential areas of ambiguity that could affect their benefits.
3. Cite the specific sections by their numbers or titles for easy reference.`
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: `An error occurred during your request: ${error.message}` }, { status: 500 });
  }
}