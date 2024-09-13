import { useParams, useNavigate } from 'react-router-dom'
import { Block } from '../services/async-storage.service'
import { ChangeEvent, useEffect, useState } from 'react'
import { blockService } from '../services/block.service'
import Button from '@mui/material/Button'
import {
  socket,
  SOCKET_EVENT_CODE_EDIT,
  SOCKET_EVENT_MENTOR_JOIN,
  SOCKET_EVENT_MENTOR_LEFT,
  SOCKET_EVENT_STUDENT_JOIN,
  SOCKET_EVENT_STUDENT_LEFT,
} from '../services/socket.service'
import { SyntaxHighlighterCmp } from './SyntaxHighlighterCmp'
import { utilService } from '../services/util.service'
import smileyImg from '../assets/img/smiley-face.jpg'

export const BlockDetails = () => {
  const navigate = useNavigate()
  const { codeBlockId } = useParams<{ codeBlockId: string }>()
  const [isMentor, setIsMentor] = useState<boolean | undefined>()
  const [block, setBlock] = useState<Block>(blockService.emptyBlock)
  const [codeTest, setCodeTest] = useState<boolean>(false)

  useEffect(() => {
    socket?.on('increase-watchers', (v) => updateWatchers(v + 1))
    socket?.on('decrease-watchers', (v) => updateWatchers(v - 1))
    socket?.on('mentor-join', (v) => updateWatchers(v + 1))
    socket?.on('mentor-left', mentorLeft)
    socket?.on('code-changed', updateCode)

    return () => {
      socket?.off('increase-watchers')
      socket?.off('decrease-watchers')
      socket?.off('mentor-join')
      socket?.off('mentor-left')
      socket?.off('code-changed')
    }
  }, [block])

  useEffect(() => {
    if (codeBlockId && !block._id) {
      loadBlock(codeBlockId)
    }
  }, [codeBlockId])

  const loadBlock = async (id: string): Promise<void> => {
    try {
      console.log('Loading block..')
      const selectedBlock = await blockService.getById(id)
      if (!selectedBlock.visitorCounter) {
        setIsMentor(true)
        selectedBlock.value = selectedBlock.initialTemplate
        socket?.emit(SOCKET_EVENT_MENTOR_JOIN, {
          msg: 'mentor connected to block',
          data: selectedBlock.visitorCounter,
        })
      } else {
        socket?.emit(SOCKET_EVENT_STUDENT_JOIN, {
          msg: 'student connected to block',
          data: selectedBlock.visitorCounter,
        })
      }
      selectedBlock.visitorCounter++
      setBlock(selectedBlock)

      await blockService.save(selectedBlock)
    } catch (err) {
      console.error('Failed to load block:', err)
    }
  }

  const updateWatchers = (value: number) => {
    setBlock((prevBlock) => {
      const updatedBlock: Block = { ...prevBlock, visitorCounter: value }
      blockService.save(updatedBlock)
      return updatedBlock
    })
  }

  const updateCode = (value: string) => {
    setBlock((prevBlock) => ({ ...prevBlock, value }))
  }

  const mentorLeft = async () => {
    console.log('Mentor left, resetting block')
    const updatedBlock = {
      ...block,
      visitorCounter: 0,
      value: block.initialTemplate,
    }
    setBlock(updatedBlock)
    try {
      await blockService.save(updatedBlock)
    } catch (err) {
      console.error('Failed to save block after mentor left:', err)
    }
    navigate('/codeBlock')
  }

  const onLeaveBlock = async () => {
    if (isMentor) {
      socket?.emit(SOCKET_EVENT_MENTOR_LEFT, {
        msg: `mentor left the block`,
      })
    } else {
      socket?.emit(SOCKET_EVENT_STUDENT_LEFT, {
        msg: `student left the block`,
        data: block.visitorCounter,
      })
      navigate('/codeBlock')
    }
  }

  const handleCodeChange = async (e: ChangeEvent<HTMLDivElement>) => {
    e.preventDefault()
    const { innerText } = e.target
    setBlock((prevBlock) => ({ ...prevBlock, value: innerText }))
    try {
      await blockService.save({ ...block, value: innerText })
      socket?.emit(SOCKET_EVENT_CODE_EDIT, {
        msg: 'code has changed',
        data: innerText,
      })
    } catch (err) {
      console.error('Failed to save block:', err)
    }
  }

  const handleTestBlock = (txt: string) => {
    if (
      utilService.processString(txt) ===
      utilService.processString(block.solution)
    ) {
      setCodeTest(true)
      setTimeout(() => setCodeTest(false), 5000)
    }
  }

  return (
    <>
      {codeTest && (
        <img className="smiley-emoji" src={smileyImg} alt="Smiley face" />
      )}
      <Button
        onClick={onLeaveBlock}
        size="small"
        style={{ marginTop: '8px', backgroundColor: 'black', width: '50px' }}
        variant="contained"
      >
        Back
      </Button>
      <h1>Role: {isMentor ? 'Mentor' : 'Student'}</h1>
      <h4>Watching: {block.visitorCounter}</h4>
      <h2 style={{ textDecoration: 'underline' }}>{block.title}</h2>
      <div className="code-container">
        <SyntaxHighlighterCmp
          handleCodeChange={utilService.debounce(handleCodeChange, 500)}
          isMentor={isMentor ?? false}
          txt={block.value ?? block.initialTemplate}
        />
        <Button
          onClick={() => handleTestBlock(block.value)}
          size="small"
          style={{ marginTop: '8px', backgroundColor: 'black', width: '50px' }}
          variant="contained"
        >
          Test
        </Button>
      </div>
    </>
  )
}
