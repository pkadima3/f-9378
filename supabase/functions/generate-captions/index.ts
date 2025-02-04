import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const { platform, niche, goal, tone } = await req.json();
    console.log('Received request with:', { platform, niche, goal, tone });

    const prompt = `
Role: You are the world's top content creator and digital marketing expert with over 20 years of hands-on experience.

Task: Create 3 unique and engaging social media captions for ${platform}, considering:
- Niche: ${niche}
- Goal: ${goal}
- Tone: ${tone}

Requirements:
1. Each caption should start with a title in this format: **Title Here**
2. Make captions engaging and authentic
3. Include relevant hashtags
4. Keep the length appropriate for ${platform}
5. Format each caption with a clear title and body

Example format:
**Title of Caption**
Main caption text here with emojis and #hashtags

Please provide 3 different captions, each with a unique angle or approach.`;

    console.log('Sending request to OpenAI with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional social media content creator.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const result = await response.json();
    console.log('OpenAI response received:', result);

    if (!result.choices || !result.choices[0]?.message?.content) {
      console.error('Invalid response from OpenAI:', result);
      throw new Error('Failed to generate captions');
    }

    const generatedText = result.choices[0].message.content;
    const captions = generatedText
      .split('\n\n')
      .filter(caption => caption.trim().length > 0);

    console.log('Generated captions:', captions);

    return new Response(
      JSON.stringify({ captions }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in generate-captions function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});