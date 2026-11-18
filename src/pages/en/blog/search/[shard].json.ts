// Word index of the blog full-text search, one file per first letter (src/lib/blog-search-files.ts).
import { shardPaths, shardResponse } from '../../../../lib/blog-search-files';

export const getStaticPaths = () => shardPaths('en');
export const GET = ({ props }: { props: { words: Record<string, number[]> } }) => shardResponse(props.words);
