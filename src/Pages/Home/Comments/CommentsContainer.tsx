import { useAuth } from '../../../hooks/useAuth';
import Cookies from 'js-cookie';
import { useState, useEffect, FormEvent } from 'react';
import { withLanguage } from '../../../HOC/withLanguage';
import Comments from './Comments';
import 'moment/dist/locale/pl';
import { useLanguage } from '../../../hooks/useLanguage';
import moment from 'moment';

interface CommentsProps {
  texts: { comments: string; addComment: string; loadingComments: string; addFirstComment: string; errorMessageComment: string; userMessageComment: string; undefinedDateText: string };
  id: number;
}

export interface CommentType {
  user?: { displayName: string };
  createdTimestamp?: string;
  text: string;
}

const CommentsContainer: React.FC<CommentsProps> = ({ texts, id }) => {
  const { auth } = useAuth();
  const { language } = useLanguage();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [authMessage, setAuthMessage] = useState(false);
  const token = Cookies.get('token');
  moment.locale(`${language}`);

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

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

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}memes/memes/${id}/comments?page=1&limit=10`);
      const data = await response.json();
      setComments(data._embedded?.items);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };
  return <Comments {...{ texts, handleComment, loading, errorMessage, authMessage, comments, comment, setComment }} />;
};

export default withLanguage(CommentsContainer);
