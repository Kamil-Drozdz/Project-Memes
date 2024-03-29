import { Dispatch, FormEvent, SetStateAction } from 'react';
import CommentList from './CommentsLists';
import { CommentType } from './CommentsContainer';
import { BeatLoader } from 'react-spinners';

interface CommentsProps {
  handleComment: (event: FormEvent<Element>) => void;
  errorMessage: boolean;
  authMessage: boolean;
  comments: CommentType[];
  comment: string;
  loading: boolean;
  setComment: Dispatch<SetStateAction<string>>;
  texts: {
    addComment: string;
    errorMessageComment: string;
    userMessageComment: string;
    comments: string;
    loadingComments: string;
    undefinedDateText: string;
    addFirstComment: string;
  };
}
const Comments: React.FC<CommentsProps> = ({ texts, loading, handleComment, errorMessage, authMessage, comments, comment, setComment }) => {
  return (
    <div className="flex flex-col">
      <form onSubmit={handleComment}>
        <textarea maxLength={200} className=" h-8 w-full resize-none rounded-lg bg-gray-500 text-white scrollbar-none md:h-16 " value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className="rounded border-b-4 border-orange-800 bg-orange-600 px-2 text-black shadow-lg hover:border-orange-500 hover:bg-orange-400 md:px-2 md:font-bold" type="submit">
          {texts.addComment}
        </button>
      </form>
      {errorMessage && !authMessage && <p className="text-red-500">{texts.errorMessageComment}</p>}
      {authMessage && <p className="text-red-500">{texts.userMessageComment}</p>}
      {loading ? (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <BeatLoader color="#f97316" />
          <p className="text-white">{texts.loadingComments}</p>
        </div>
      ) : (
        <CommentList comments={comments} texts={texts} />
      )}
    </div>
  );
};

export default Comments;
