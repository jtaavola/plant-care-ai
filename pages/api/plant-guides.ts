import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const GENERIC_ERROR = { error: "An error occurred calling OpenAI's API." };

const handler = async (req: NextRequest) => {
  try {
    const plantName = req.nextUrl.searchParams.get('plantName');

    const chatCompletionRes = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Generate a plant care guide for ${plantName}. Use markdown for the response and include emojis in the section headings.`,
            },
          ],
          max_tokens: 1000,
          temperature: 0,
        }),
      }
    );

    if (!chatCompletionRes.ok) {
      const errorBody = await chatCompletionRes.json();
      console.error(chatCompletionRes.status, errorBody);
      return NextResponse.json(GENERIC_ERROR, { status: 500 });
    }

    const chatCompletion = await chatCompletionRes.json();
    const plantGuide = chatCompletion.choices[0].message?.content;

    return NextResponse.json({ plantGuide: plantGuide });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
};

export default handler;
