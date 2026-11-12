// Card drawings of the English blog overview after the first page (src/lib/card-svg.ts).
import { getPosts } from '../../../lib/blog';
import { deferredDrawings } from '../../../lib/card-svg';

export async function GET() {
  return new Response(JSON.stringify(deferredDrawings(await getPosts('en'), 'en')), { headers: { 'Content-Type': 'application/json' } });
}
