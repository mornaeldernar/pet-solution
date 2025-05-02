import React, { useState, useEffect } from 'react';
import './CommentsSection.css';

interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  rating: number;
}

interface CommentsData {
  comments: Comment[];
}

// Datos iniciales mientras se resuelve el problema del servidor
const initialComments: Comment[] = [
  {
    id: '1',
    author: 'María González',
    date: '2024-03-15',
    content: 'Excelente producto, muy suave y efectivo para limpiar a mi perro.',
    rating: 5
  },
  {
    id: '2',
    author: 'Carlos Rodríguez',
    date: '2024-03-10',
    content: 'Las toallitas son muy prácticas y tienen un aroma agradable.',
    rating: 4
  },
  {
    id: '3',
    author: 'Ana Martínez',
    date: '2024-03-05',
    content: 'Mi perro las tolera muy bien, son suaves y no irritan su piel.',
    rating: 5
  }
];

export const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  /*const [newComment, setNewComment] = useState({
    author: '',
    content: '',
    rating: 5
  });*/
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/comments');
      
      if (!response.ok) {
        console.warn('No se pudo conectar con el servidor, usando datos iniciales');
        return;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('La respuesta no es JSON válido, usando datos iniciales');
        return;
      }

      const data: CommentsData = await response.json();
      if (data.comments && data.comments.length > 0) {
        setComments(data.comments);
      }
      //setError(null);
    } catch (err) {
      console.warn('Error al cargar comentarios:', err);
      // No mostramos error al usuario, usamos los datos iniciales
    } finally {
      setLoading(false);
    }
  };

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el comentario: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('La respuesta no es JSON válido');
      }

      const addedComment = await response.json();
      setComments(prevComments => [addedComment, ...prevComments]);
      setNewComment({ author: '', content: '', rating: 5 });
      setCurrentPage(1);
    } catch (err) {
      // Si hay error al enviar, agregamos el comentario localmente
      const localComment: Comment = {
        id: Date.now().toString(),
        author: newComment.author,
        date: new Date().toISOString(),
        content: newComment.content,
        rating: newComment.rating
      };
      setComments(prevComments => [localComment, ...prevComments]);
      setNewComment({ author: '', content: '', rating: 5 });
      setCurrentPage(1);
      console.warn('Error al enviar comentario:', err);
    }
  };
*//*
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };
*/

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIndex, startIndex + commentsPerPage);

  const averageRating = comments.length > 0 
    ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length 
    : 0;

  if (loading) return <div className="loading">Cargando comentarios...</div>;

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h2>Comentarios</h2>
        <div className="rating-summary">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(averageRating) ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </div>
          <span className="rating-value">{averageRating.toFixed(1)}</span>
          <span className="reviews-count">({comments.length} reseñas)</span>
        </div>
      </div>
{/*
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="author">Nombre:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={newComment.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Comentario:</label>
          <textarea
            id="content"
            name="content"
            value={newComment.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Calificación:</label>
          <select
            id="rating"
            name="rating"
            value={newComment.rating}
            onChange={handleInputChange}
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} estrellas</option>
            ))}
          </select>
        </div>
        <button type="submit">Enviar Comentario</button>
      </form>
*/}
      <div className="comments-list">
        {currentComments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="author">{comment.author}</span>
              <span className="date">{new Date(comment.date).toLocaleDateString()}</span>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < comment.rating ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="content">{comment.content}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};