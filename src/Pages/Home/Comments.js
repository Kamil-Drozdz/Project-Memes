import React, { useState, useEffect } from 'react';
import { withLanguage } from '../../components/HOC/withLanguage';
import { useAuth } from '../../hooks/useAuth';
import { FcReddit } from 'react-icons/fc';
import moment from 'moment';

const Comments = ({ texts }) => {
  const currentTime = moment(moment.now()).fromNow();
  const { auth } = useAuth();
  const [comments, setComments] = useState([]);
  const [timestamp, setTimestamp] = useState(currentTime);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [authMessage, setAuthMessage] = useState(false);

  const handleComment = (e) => {
    e.preventDefault();
    // fetch('/api/comments', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ comment })
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setComments([...comments, res.comment]);
    //   });
    if (!auth.userNick) {
      setAuthMessage(true);
      return;
    }
    if (comment.length === 0) {
      setErrorMessage(true);
      return;
    }
    setErrorMessage(false);
    setTimestamp(currentTime);
    setComments([...comments, { comment, timestamp }]);
    setComment('');
  };

  const CommentList = ({ comments }) => (
    <>
      {comments.length && (
        <p className="text-white">
          {comments.length} {texts.comments}
        </p>
      )}
      <ul className="mt-4 mb-6 max-h-[20vh] overflow-y-scroll scrollbar-thin overflow-x-hidden scrollbar-track-gray-400 scrollbar-thumb-orange-700">
        {comments.map((comment, index) => (
          <div key={index} className="my-2 mx-2 flex w-[90%] border-t-2 border-gray-700 pt-2 md:mx-8">
            <FcReddit size={32} className=" rounded-full" />
            <div className="w-full px-1 md:px-4">
              <div className="flex">
                <p className="text-xs text-white md:text-base md:font-bold">{auth.userNick}</p> <p className="ml-4 overflow-hidden whitespace-nowrap text-[8px] text-gray-500 md:text-xs">{comment.timestamp}</p>
              </div>
              <li className="w-full break-words rounded-lg p-2 text-xs text-white md:text-base">{comment.comment}</li>
            </div>
          </div>
        ))}
      </ul>
    </>
  );

  return (
    <div className="flex flex-col">
      <form onSubmit={handleComment}>
        <textarea maxLength="200" className=" h-8 w-full resize-none rounded-lg bg-gray-500 text-white md:h-20" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className="rounded border-b-4 border-orange-800 bg-orange-600 px-2 text-black shadow-lg hover:border-orange-500 hover:bg-orange-400 md:px-2 md:font-bold" type="submit">
          {texts.addComment}
        </button>
      </form>
      {errorMessage && !authMessage && <p className="text-red-500">{texts.errorMessageComment}</p>}
      {authMessage && <p className="text-red-500">{texts.userMessageComment}</p>}
      <CommentList comments={comments} />
    </div>
  );
};

export default withLanguage(Comments);
