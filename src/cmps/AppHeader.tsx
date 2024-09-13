import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>Moveo-Task </h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/codeBlock">CodeBlocks</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </section>
    </header>
  )
}
