import { NextResponse } from 'next/server';
import { checkGenerationStatus } from '@/services/ai';

// GET /api/infographic/:id/status - Get the status of a generation task
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing generation task ID' },
        { status: 400 }
      );
    }

    // Check generation status
    const status = await checkGenerationStatus(id);

    // If status is failed, log more details for debugging
    if (status.status === 'failed' && status.error) {
      console.warn(`Generation task ${id} failed with error: ${status.error}`);
    }

    return NextResponse.json(status);
  } catch (error) {
    console.error('Failed to get generation status:', error);

    // Return a more detailed error message
    return NextResponse.json(
      {
        error: 'Error processing request',
        details: error instanceof Error ? error.message : 'Unknown error',
        status: 'failed',
        progress: 0
      },
      { status: 500 }
    );
  }
}