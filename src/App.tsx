import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import './assets/style/main.scss'
import { LobbyPage } from './pages/LobbyPage'
import { BlockDetails } from './cmps/BlockDetails'
import { Home } from './pages/Home'
import { AppHeader } from './cmps/AppHeader'
import { About } from './pages/About'
export function App() {
  return (
    <Router>
      <section className="main-layout">
        <AppHeader />
        <main className="main-layout full">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<LobbyPage />} path="/codeBlock" />
            <Route element={<BlockDetails />} path="/codeBlock/:codeBlockId" />
            <Route element={<About />} path="/about" />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
