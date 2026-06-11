import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders Markdown (with GitHub-flavored extensions) as semantic HTML.
 * Styling is applied via the `.blog-content` scope in globals.css, so this
 * stays a plain server component with no per-element overrides.
 */
export function Markdown({content}: {content: string}) {
  return (
    <div className="blog-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
