import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import './QuestionListItem.css';

function QuestionListItem({ post }) {
  const postId = post?._id;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(post?.likes || 0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [expandedComments, setExpandedComments] = useState({}); // état pour suivre les commentaires étendus
  const title = post?.title ?? 'Titre inconnu';
  const content = post?.content ?? 'Contenu non disponible';
  const COMMENT_LIMIT = 10;

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      const response = await api.get(`/comments/post/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
    const userId = localStorage.getItem('userId') || 'anonyme';
    try {
      const response = await api.post('/comments', {
        content: newComment,
        postId: postId,
        authorId: userId,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    }
  };

  const handleLike = async () => {
    try {
      await api.post(`/posts/${postId}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleShare = () => {
    alert('Lien de partage copié!');
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  const toggleExpandedComment = (commentId) => {
    setExpandedComments((prevExpanded) => ({
      ...prevExpanded,
      [commentId]: !prevExpanded[commentId],
    }));
  };

  const displayedComments = showAllComments ? comments : comments.slice(-3);

  return (
    <div className="question-list-item">
      <div className="question-content">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div className="question-interactions">
        <span onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} className="icon" /> {likes} Likes
        </span>
        <span>
          <FontAwesomeIcon icon={faComment} className="icon" /> {comments.length} Commentaires
        </span>
        <span onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} className="icon" /> Partager
        </span>
      </div>

      <div className="comments-section">
        <h3>Commentaires</h3>

        {displayedComments.map((comment) => (
          <div key={comment._id} className="comment">
            {expandedComments[comment._id] || comment.content.length <= COMMENT_LIMIT ? (
              <p>{comment.content}</p>
            ) : (
              <>
                <p>{comment.content.slice(0, COMMENT_LIMIT)}...</p>
                <button onClick={() => toggleExpandedComment(comment._id)} className="show-more-btn">
                  Voir plus
                </button>
              </>
            )}
            <small>Posté le {new Date(comment.createdAt).toLocaleDateString()}</small>
          </div>
        ))}

        {comments.length > 3 && !showAllComments && (
          <button className="show-more-btn" onClick={toggleShowAllComments}>
            Voir plus
          </button>
        )}

        {showAllComments && comments.length > 3 && (
          <button className="show-less-btn" onClick={toggleShowAllComments}>
            Voir moins
          </button>
        )}

        <div className="comment-form">
          <input
            type="text"
            placeholder="Ajouter un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Envoyer</button>
        </div>
      </div>
    </div>
  );
}

export default QuestionListItem;
