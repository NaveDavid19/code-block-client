import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import './assets/style/main.scss'
import { LobbyPage } from './pages/LobbyPage'
import { BlockDetails } from './cmps/BlockDetails'

export function App() {
  return (
    <Router>
      <section className="main-layout">
        {/* <AppHeader/> */}
        <main className="main-layout full">
          <Routes>
            <Route element={<LobbyPage />} path="/" />
            <Route element={<BlockDetails />} path="/block/:blockId" />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
