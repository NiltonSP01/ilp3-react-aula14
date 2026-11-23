import { useEffect, useState } from 'react'

export default function TempoAtivo() {
  const [tempo, setTempo] = useState(0)

  useEffect(() => {
    // Incrementa o tempo a cada segundo
    const id = setInterval(() => setTempo(t => t + 1), 1000)

    // Cleanup: limpa o intervalo quando o componente desmonta
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{ padding: '20px' }}>
      <h2>Desafio — Cronômetro</h2>
      <p>Tempo ativo: {tempo}s</p>
    </section>
  )
}