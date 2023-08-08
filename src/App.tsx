import './App.css'
import { Results } from './components/Results'
import { AddComment } from './components/AddComment'
import { useQuery } from '@tanstack/react-query'
import { CommentWithId, getComments } from './service/comments'

function App () {
  const { data, isLoading, error } = useQuery<CommentWithId[]>(
    ['comments'],
    getComments
  )

  return (
    <main className='grid h-screen grid-cols-2'>
      <div className='col-span-1 p-8 bg-white'>

        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />

      </div>
      <AddComment/>
    </main>
  )
}

export default App
