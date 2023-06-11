import moment from 'moment';
import { FcReddit } from 'react-icons/fc';
import { CommentType } from './CommentsContainer';

interface CommentListProps {
  comments: CommentType[];
  texts: {
    comments: string;
  };
}

const CommentList: React.FC<CommentListProps> = ({ comments, texts }) => (
  <>
    {!!comments.length && (
      <p className="text-white">
        {comments.length} {texts.comments}
      </p>
    )}
    <ul className="mt-4 mb-6 max-h-[30vh] overflow-y-scroll border-b-2 border-gray-700 scrollbar-thin overflow-x-hidden scrollbar-track-gray-400 scrollbar-thumb-orange-600">
      {comments.map((comment: CommentType, index: number) => (
        <div key={index} className="my-2 mx-2 flex w-[90%] border-t-2 border-gray-700 pt-2 md:mx-8">
          <FcReddit size={32} className=" rounded-full" />
          <div className="w-full px-1 md:px-4">
            <div className="flex items-center justify-start">
              <p className="text-xs text-white md:text-base md:font-bold">{comment?.user?.displayName}</p>
              <p className="ml-4 overflow-hidden whitespace-nowrap text-[8px] text-gray-500 md:text-xs">{comment?.createdTimestamp ? moment(comment.createdTimestamp).fromNow() : 'nie określona data dodania'}</p>
            </div>
            <li className=" w-full break-words p-2 text-xs text-white md:text-base">{comment?.text}</li>
          </div>
        </div>
      ))}
    </ul>
  </>
);
export default CommentList;
