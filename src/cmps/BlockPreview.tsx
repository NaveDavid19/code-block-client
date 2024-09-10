import { Block } from '../services/async-storage.service'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

type BlockPreviewProps = {
  block: Block
}

export const BlockPreview = ({ block }: BlockPreviewProps) => {
  return (
    <li className="block-preview">
      <h1>{block.title}</h1>
      <Button
        size="small"
        style={{
          marginTop: '5px',
          backgroundColor: 'black',
        }}
        variant="contained"
        component={Link}
        to={`/block/${block._id}`}
      >
        {' '}
        View
      </Button>{' '}
    </li>
  )
}
