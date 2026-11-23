import { useEffect, useState } from 'react'

export default function UserLoader() {
  // ======================
  // ESTADOS
  // ======================
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [contador, setContador] = useState(0)

  /* ======================
     EFFECT: MOUNT
     ====================== */
  useEffect(() => {
    console.log('[useEffect] componente montado')

    // Simula chamada de API
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        const data = await res.json()
        setUsuarios(data)
      } catch {
        setErro('Erro ao carregar usuários')
      } finally {
        setLoading(false)
      }
    }, 2000)

    // Cleanup (unmount)
    return () => {
      console.log('[cleanup] componente desmontado')
      clearTimeout(timer)
    }
  }, [])

  /* ======================
     EFFECT: UPDATE
     ====================== */
  useEffect(() => {
    if (contador > 0) {
      console.log('Contador atualizado:', contador)
    }
  }, [contador])

  return (
    <section style={{ padding: '20px' }}>
      <h2>Usuários</h2>

      {/* Loading */}
      {loading && <p>Carregando dados...</p>}

      {/* Erro */}
      {!loading && erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* Lista */}
      {!loading && !erro && (
        <ul>
          {usuarios.map(u => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}

      {/* Controle de estado */}
      <hr />
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </section>
  )
}