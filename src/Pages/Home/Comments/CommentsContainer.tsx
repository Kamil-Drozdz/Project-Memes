import { useAuth } from '../../../hooks/useAuth';
import Cookies from 'js-cookie';
import { useState, useEffect, FormEvent } from 'react';
import { withLanguage } from '../../../HOC/withLanguage';
import Comments from './Comments';

interface CommentsProps {
  texts: { comments: string; addComment: string; errorMessageComment: string; userMessageComment: string };
  id: number;
}

export interface CommentType {
  user?: { displayName: string };
  createdTimestamp?: string;
  text: string;
}

interface AuthProps {
  auth: {
    userNick: string;
  };
}

const CommentsContainer: React.FC<CommentsProps> = ({ texts, id }) => {
  const { auth } = useAuth() as AuthProps;
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [authMessage, setAuthMessage] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    fetchComments();
  }, []);

  const handleComment = (event: FormEvent) => {
    event.preventDefault();
    if (!comment.length) {
      setErrorMessage(true);
      return;
    }
    if (!auth.userNick) {
      setAuthMessage(true);
      return;
    }
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id: id, text: comment })
    })
      .then((res) => res.json())
      .then((res) => {
        //adding the current comment locally to array
        setComments([...comments, res]);
      });
    setErrorMessage(false);
    setComment('');
  };

  const fetchComments = () => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${id}/comments?page=1&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data._embedded.items);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };
  return <Comments texts={texts} handleComment={handleComment} errorMessage={errorMessage} authMessage={authMessage} comments={comments} comment={comment} setComment={setComment} />;
};

export default withLanguage(CommentsContainer);
