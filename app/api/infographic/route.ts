import { NextResponse } from 'next/server';
import { generateInfographic } from '@/services/ai';
import { MAX_TEXT_LENGTH } from '@/lib/constants/infographic';
import { TextInputForm } from '@/lib/types/infographic';

// POST /api/infographic - Create a new infographic generation task
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.content) {
      return NextResponse.json(
        { error: 'Missing text content' },
        { status: 400 }
      );
    }

    // Validate text length
    if (body.content.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `Text content exceeds ${MAX_TEXT_LENGTH} character limit` },
        { status: 400 }
      );
    }

    // Prepare input data
    const input: TextInputForm = {
      content: body.content,
      mode: body.mode || 'summary',
      size: body.size || '750'
    };

    // Call infographic generation service (automatically selects real or mock service based on environment variables)
    const generationId = await generateInfographic(input);

    // Return result
    return NextResponse.json({
      id: generationId,
      status: 'processing'
    });
  } catch (error) {
    console.error('Infographic generation failed:', error);

    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}