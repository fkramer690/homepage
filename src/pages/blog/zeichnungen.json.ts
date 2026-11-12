// Card drawings of the German blog overview after the first page (src/lib/card-svg.ts).
import { getPosts } from '../../lib/blog';
import { deferredDrawings } from '../../lib/card-svg';

export async function GET() {
  return new Response(JSON.stringify(deferredDrawings(await getPosts('de'), 'de')), { headers: { 'Content-Type': 'application/json' } });
}
