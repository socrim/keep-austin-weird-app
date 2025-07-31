import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if API key is available
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OPENAI_API_KEY is not set. Using fallback responses.');
}

const openai = apiKey ? new OpenAI({ apiKey }) : null;

// Array of fallback responses for variety
const fallbackResponses = [
  {
    bandName: "The Austin Weirdos",
    startupPitch: "We're building an AI that generates Austin-themed content. Because weird is the new normal.",
    tacoRecipe: "Breakfast taco with migas, queso, and a side of weirdness. Served with Austin attitude.",
    protestSign: "Keep Austin Weird, Keep Tacos Weirder!"
  },
  {
    bandName: "The Barton Creek Bats",
    startupPitch: "Revolutionizing the food truck industry with AI-powered taco recommendations. Because Austin knows tacos.",
    tacoRecipe: "Vegan breakfast taco with tofu scramble, black beans, and homemade salsa verde. Austin-approved!",
    protestSign: "Save Our Food Trucks! 🌮✊"
  },
  {
    bandName: "The South Congress Stumblers",
    startupPitch: "We're creating a social platform for Austin musicians to collaborate. Because the best bands are born in dive bars.",
    tacoRecipe: "Brisket taco with pickled onions and chipotle mayo. Smoked for 12 hours because patience is Austin.",
    protestSign: "Keep Austin Live Music Alive! 🎸"
  },
  {
    bandName: "The Zilker Park Dreamers",
    startupPitch: "Building the ultimate Austin event discovery app. From food trucks to live music, we've got you covered.",
    tacoRecipe: "Fusion taco with Korean BBQ beef, kimchi slaw, and gochujang sauce. Austin meets Seoul!",
    protestSign: "Protect Our Green Spaces! 🌳"
  },
  {
    bandName: "The East Side Artists",
    startupPitch: "We're democratizing art with AI-generated murals. Every wall in Austin deserves to be weird.",
    tacoRecipe: "Breakfast taco with chorizo, eggs, and queso fresco. Served with a side of creativity.",
    protestSign: "Art is Not a Crime! 🎨"
  },
  {
    bandName: "The Rainey Street Ramblers",
    startupPitch: "Creating the perfect Austin bar crawl app. Because the best stories happen between bars.",
    tacoRecipe: "Duck confit taco with cherry compote and brie. Fancy tacos for fancy Austinites.",
    protestSign: "Keep Austin Drinking Local! 🍺"
  },
  {
    bandName: "The UT Campus Crushers",
    startupPitch: "We're building the ultimate student life app for UT Austin. From study spots to late-night eats.",
    tacoRecipe: "Student budget taco with beans, rice, and whatever's in the fridge. College life, Austin style!",
    protestSign: "Education Not Debt! 📚"
  },
  {
    bandName: "The Lady Bird Lake Lovers",
    startupPitch: "Revolutionizing outdoor fitness with AI-powered running routes. Austin's trails, reimagined.",
    tacoRecipe: "Post-workout protein taco with grilled chicken, avocado, and quinoa. Fuel for your Austin adventures.",
    protestSign: "Save Our Trails! 🏃‍♀️"
  }
];

// Helper function to ensure content is a string
function ensureString(content: any): string {
  if (typeof content === 'string') {
    return content;
  }
  
  if (typeof content === 'object' && content !== null) {
    // Handle recipe objects with name, ingredients, instructions
    if (content.name && content.ingredients && content.instructions) {
      return `${content.name}: ${content.ingredients}. ${content.instructions}`;
    }
    
    // Handle any other object structure
    return JSON.stringify(content);
  }
  
  return String(content);
}

// Function to generate DALL-E image for protest sign
async function generateProtestSignImage(slogan: string): Promise<string | null> {
  if (!openai) return null;
  
  try {
    const prompt = `A compelling protest sign with the text "${slogan}". The sign should be hand-drawn style, bold and clear text, Austin-themed colors (orange, yellow, red), with a grassroots activist feel. The sign should look like it was made for a real Austin protest.`;
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
    });

    return response.data[0]?.url || null;
  } catch (error) {
    console.error('Error generating protest sign image:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // If no API key, return random fallback response
    if (!openai) {
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      const fallbackResponse = fallbackResponses[randomIndex];
      return NextResponse.json(fallbackResponse);
    }

    const prompt = `Generate 4 Austin-themed items in JSON format. Make them creative, weird, and authentically Austin:

1. A band name that's weird and Austin-themed (string only)
2. A startup pitch for a tech company that's quintessentially Austin (string only)
3. A creative taco recipe with Austin ingredients (string only, not an object)
4. A protest sign slogan that's Austin-weird (string only)

Return ONLY valid JSON with these exact keys: bandName, startupPitch, tacoRecipe, protestSign

IMPORTANT: All values must be strings, not objects. For the taco recipe, return a simple string description, not a structured object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI that generates creative, weird, and authentically Austin-themed content. Always respond with valid JSON only. All values must be strings, not objects."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.9,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Try to parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      // If JSON parsing fails, use random fallback response
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      parsedResponse = fallbackResponses[randomIndex];
    }

    // Ensure all required fields are present and are strings
    const protestSignText = ensureString(parsedResponse.protestSign || "Keep Austin Weird!");
    
    // Generate DALL-E image for the protest sign
    const protestSignImage = await generateProtestSignImage(protestSignText);

    const result = {
      bandName: ensureString(parsedResponse.bandName || "The Austin Weirdos"),
      startupPitch: ensureString(parsedResponse.startupPitch || "We're building an AI that generates Austin-themed content."),
      tacoRecipe: ensureString(parsedResponse.tacoRecipe || "Breakfast taco with migas and queso."),
      protestSign: protestSignText,
      protestSignImage: protestSignImage
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating content:', error);
    
    // Use random fallback response if everything fails
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    const fallbackResponse = fallbackResponses[randomIndex];

    return NextResponse.json(fallbackResponse);
  }
} 