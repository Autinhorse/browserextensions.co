import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

/**
 * Renders Markdown (with GitHub-flavored extensions) as semantic HTML.
 * Styling is applied via the `.blog-content` scope in globals.css, so this
 * stays a plain server component with no per-element overrides.
 *
 * `rehype-raw` enables inline HTML in the Markdown source - used mainly to size
 * images, e.g. `<img src="/x.png" alt="..." width="400" />`. Content is authored
 * in-repo and therefore trusted; do not render untrusted Markdown through this.
 */
export function Markdown({content}: {content: string}) {
  return (
    <div className="blog-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
