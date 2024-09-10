import { Block } from '../services/async-storage.service'
import { BlockPreview } from './BlockPreview'

interface BlockListProps {
  blocks: Block[]
}
export const BlockList = ({ blocks }: BlockListProps) => {
  return (
    <ul className="block-list">
      {blocks?.map((block) => (
        <BlockPreview key={block._id} {...{ block }} />
      ))}
    </ul>
  )
}
