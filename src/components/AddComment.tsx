import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment, postComment } from "../service/comments"
import { FormInput, FormTextArea } from "./Form"

export const AddComment = () => {

      const queryClient = useQueryClient()
    
      const { mutate, isLoading: isLoadingMutation } = useMutation({
        mutationFn: postComment,
        onMutate: async (newComment) => {
          await queryClient.cancelQueries(['comments'])
          const previousComments = queryClient.getQueryData(['comments'])
    
          queryClient.setQueryData(['comments'], (oldData?: Comment[]): Comment[] => {
            const newCommentToAdd = structuredClone(newComment)
            newCommentToAdd.preview = true
    
            if (oldData == null) return [newCommentToAdd]
            return [...oldData, newCommentToAdd]
          })
    
          return { previousComments }
        },
        onError: (error, variables, context) => {
          console.error(error)
          if (context?.previousComments != null) {
            queryClient.setQueryData(['comments'], context.previousComments)
          }
        },
        onSettled: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['comments']
          })
        }
      })
    
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (isLoadingMutation) return
    
        event.preventDefault()
        // ---> ???
        const data = new FormData(event.currentTarget)
        const message = data.get('message')?.toString() ?? ''
        const title = data.get('title')?.toString() ?? ''
    
        if (title !== '' && message !== '') {
          mutate({ title, message })
        }
      }

      
    return (
        <div className='col-span-1 p-8 bg-black'>
        <form className={`${isLoadingMutation ? 'opacity-40' : ''} block max-w-xl px-4 m-auto`} onSubmit={handleSubmit}>

          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    )

}