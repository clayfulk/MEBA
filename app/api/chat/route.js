import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  console.log('API route called');

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return NextResponse.json({ error: 'OpenAI API key is not set' }, { status: 500 });
  }

  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
    });

    console.log('OpenAI response:', response);

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'An error occurred during your request.', details: error.message }, { status: 500 });
  }
}