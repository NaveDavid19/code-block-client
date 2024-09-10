import { useEffect, useState } from 'react'
import { blockService } from '../services/block.service'
import { Block } from '../services/async-storage.service'
import { BlockList } from '../cmps/BlockList'

export const LobbyPage = () => {
  const [blocks, setBlocks] = useState<Block[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await blockService.getBlocks()
        setBlocks(res)
      } catch (err) {
        console.log('Cannot load blocks', err)
      }
    })()
  }, [])

  return (
    <div>
      <h1>Choose code block</h1>
      <BlockList {...{ blocks }} />
    </div>
  )
}
