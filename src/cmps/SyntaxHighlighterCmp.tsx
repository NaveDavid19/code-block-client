import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { useEffect, useState } from 'react'

interface SyntaxHighlighterCmpProps {
  handleCodeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isMentor: boolean
  txt: string
}

export const SyntaxHighlighterCmp: React.FC<SyntaxHighlighterCmpProps> = ({
  handleCodeChange,
  isMentor,
  txt,
}) => {
  const [newTxt, setNewTxt] = useState(txt)
  const highlightedCode = hljs
    .highlight(newTxt, { language: 'javascript' })
    .value.replace(/\n/g, '<br>')

  const handleUpdateCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTxt(e.target.value)
    handleCodeChange(e)
  }
  useEffect(() => {
    setNewTxt(txt)
  }, [txt])

  return (
    <div className="code-block-container">
      <div
        className="code-block"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <textarea
        onChange={handleUpdateCode}
        readOnly={isMentor}
        value={newTxt}
        className="text-area-block"
      ></textarea>
    </div>
  )
}
