import { useParams } from 'react-router-dom'
import { Block } from '../services/async-storage.service'
import { useEffect, useState } from 'react'
import { blockService } from '../services/block.service'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export const BlockDetails = () => {
  const { blockId } = useParams()
  const [block, setBlock] = useState<Block>({
    _id: '',
    initialTemplate: '',
    isVisited: false,
    title: '',
  })
  const [isMentor, setIsMentor] = useState<boolean>()

  useEffect(() => {
    blockId && loadBlock(blockId)
  }, [blockId])

  const loadBlock = async (blockId: string): Promise<void> => {
    try {
      let selectedBlock = await blockService.getById(blockId)
      const isMentor = !selectedBlock.isVisited

      if (isMentor) {
        selectedBlock = { ...selectedBlock, isVisited: true }
        await blockService.save(selectedBlock)
      }

      setIsMentor(isMentor)
      setBlock(selectedBlock)
    } catch (err) {
      console.error('Failed to load block:', err)
    }
  }

  const onLeaveBlock = () => {
    if (isMentor) {
      blockService.save({ ...block, isVisited: false })
      //TODO : redirect all users to path '/'
    }
  }

  return (
    <>
      <Button
        onClick={onLeaveBlock}
        size="small"
        style={{ marginTop: '8px ', backgroundColor: 'black', width: '50px' }}
        variant="contained"
        component={Link}
        to={`/`}
      >
        {' '}
        Back
      </Button>{' '}
      <h1>{isMentor ? 'mentor' : 'student'}</h1>
      <h2 style={{ textDecoration: 'underline' }}>{block?.title}</h2>
      <div className="code-container">
        <textarea
          readOnly={isMentor}
          defaultValue={block?.initialTemplate}
          //   value={block?.value ?? block?.initialTemplate}
        />
      </div>
      <Button
        size="small"
        style={{ margin: '8px 0', backgroundColor: 'black', width: '50px' }}
        variant="contained"
        // onClick={handleSave}
      >
        Save
      </Button>
    </>
  )
}
