import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

interface SyntaxHighlighterCmpProps {
  handleCodeChange: (e: React.ChangeEvent<HTMLDivElement>) => void
  isMentor: boolean
  txt: string
}

export const SyntaxHighlighterCmp: React.FC<SyntaxHighlighterCmpProps> = ({
  handleCodeChange,
  isMentor,
  txt,
}) => {
  const highlightedCode = hljs
    .highlight(txt, { language: 'javascript' })
    .value.replace(/\n/g, '<br>')

  return (
    <div
      className="code-block"
      onInput={handleCodeChange}
      contentEditable={!isMentor}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  )
}
