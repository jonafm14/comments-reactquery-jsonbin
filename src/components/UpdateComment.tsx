import { FormInput, FormTextArea } from "./Form";
import { updateComment } from "../service/comments";

interface UpdateCommentProps {
    commentId: string;
  }

export const UpdateCommentComponent = ({ commentId }: UpdateCommentProps) => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario
    const data = new FormData(event.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    const updatedComment = {
      title,
      message,
    };

    try {
      await updateComment(updatedComment, commentId);
      console.log('Comment updated successfully');
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  }
  
    return(
        <div className="py-2">
            <form className="block max-w-xl px-4 m-auto" onSubmit={handleSubmit}>
            <FormInput />
            <FormTextArea />
            <button
              type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
            >
              Confirmar edicion
            </button>
            </form>
        </div>
    )
}