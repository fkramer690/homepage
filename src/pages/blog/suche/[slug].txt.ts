// Plain text of each article for the passages of the blog full-text search (src/lib/blog-search-files.ts).
import { textPaths, textResponse } from '../../../lib/blog-search-files';

export const getStaticPaths = () => textPaths('de');
export const GET = ({ props }: { props: { text: string } }) => textResponse(props.text);
