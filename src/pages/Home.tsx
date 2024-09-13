import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>welcome</h1>
      <Button
        size="small"
        style={{
          marginTop: '5px',
          backgroundColor: 'black',
        }}
        variant="contained"
        component={Link}
        to={`/codeBlock`}
      >
        View blocks
      </Button>
    </div>
  )
}

//
