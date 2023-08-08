import { useState } from 'react';
import { CommentWithId } from '../service/comments';
import { UpdateCommentComponent } from './UpdateComment';

export const Results = ({ data }: { data?: CommentWithId[] }) => {
  const [visibleUpdate, setVisibleUpdate] = useState<Record<string, boolean>>({});

  const handleClick = (id: string) => {
    setVisibleUpdate(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ul>
      <li>
        {data?.map((comment) => (
          <article
            key={comment.id}
            className={`${
              comment.preview === true ? 'bg-gray-400' : 'bg-white'
            } my-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100`}
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
              {comment.title}
            </h5>
            <p className='font-normal text-gray-700'>{comment.message}</p>
            <button
              className='mt-4 py-1 bg-black text-white rounded-lg px-3'
              onClick={() => handleClick(comment.id)}
            >
              Editar
            </button>
            {visibleUpdate[comment.id] && <UpdateCommentComponent commentId={comment.id} />}
          </article>
        ))}
      </li>
    </ul>
  );
};
