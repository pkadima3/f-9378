import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    const { platform, niche, goal, tone, imageMetadata } = await req.json();
    console.log('Received request with:', { platform, niche, goal, tone, imageMetadata });

    const prompt = `
Role: You are the world's top content creator and digital marketing expert with over 20 years of hands-on experience.
Goal: Create 3 highly engaging and detailed social media captions for the ${niche} industry, tailored to achieve the goal of ${goal} in the selected tone (${tone}). These captions must align with the ${platform}'s audience and include relevant ${JSON.stringify(imageMetadata)}.

Caption Guidelines:

Ensure captions are concise and meet ${platform}'s character limits (e.g., Instagram: 2200 characters, Twitter: 280 characters).
Incorporate hashtags that are highly relevant to the ${niche} industry to maximize visibility and engagement.
Include an optional, effective call-to-action to inspire engagement (e.g., "Comment below," "Tag a friend," "Share your thoughts," "Did you know?" "Fact," or "Insight").
Reflect current trends, use platform-specific language, and include emojis where appropriate to match audience expectations and boost relatability.

Format each caption exactly like this (with no variations):

**Title 1**
[Caption text 1]
[Hashtags 1]
[Call to action 1]

**Title 2**
[Caption text 2]
[Hashtags 2]
[Call to action 2]

**Title 3**
[Caption text 3]
[Hashtags 3]
[Call to action 3]

Important:
- Each caption must start with a title in bold (using ** **)
- Keep captions practical and innovative
- Ensure all captions reflect best practices for ${platform}
- Do not use separators like "---" between captions
- Do not number the captions`;

    console.log('Sending prompt to OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to generate captions');
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    const generatedText = data.choices[0].message.content;
    
    // Split by double newline and filter empty captions
    const captions = generatedText
      .split(/\n\n(?=\*\*)/g)
      .map(caption => caption.trim())
      .filter(caption => caption && caption !== '---');

    console.log('Generated captions:', captions);

    return new Response(JSON.stringify({ captions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-captions function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});