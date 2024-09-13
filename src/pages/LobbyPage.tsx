import { useEffect, useState } from 'react'
import { blockService } from '../services/block.service'
import { Block } from '../services/async-storage.service'
import { BlockList } from '../cmps/BlockList'

export const LobbyPage = () => {
  const [blocks, setBlocks] = useState<Block[]>([])

  useEffect(() => {
    try {
      loadBlocks()
    } catch (err) {
      console.log('Cannot load blocks', err)
    }
  }, [])

  const loadBlocks = async () => {
    const blocks = await blockService.query()
    setBlocks(blocks)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Choose code block</h1>
      <BlockList {...{ blocks }} />
    </div>
  )
}
