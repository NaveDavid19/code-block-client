import naveImg from '../assets/img/nave.jpg'
export function About() {
  return (
    <section className="about-container">
      <h2>About </h2>
      <img src={naveImg} />
      <p>
        My name is Nave David. im 23 years old and I recently graduated a very
        intensive and dense course at the Coding Academy`s Bootcamp.
      </p>
      <p>
        Im looking forward to containuing to devleop my programming skills and
        knowledge
      </p>
      <h1>Visit my social media</h1>
      <a href="https://www.linkedin.com/in/nave-david-01527a2a6/">LinkedIn</a>
      <a href="https://github.com/NaveDavid19">GitHub</a>
    </section>
  )
}
