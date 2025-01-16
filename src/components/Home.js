import '../App.css';
import { useAppContext } from '../Context/context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const { books,remove, favourite, addToFav, removeToFav, updateBook } = useAppContext();
  const navigate = useNavigate();
  const [editingBook, setEditingBook] = useState(null);

  const check = (id) => favourite.some((book) => book.id === id);

  
  const openEditModal = (book) => {
    setEditingBook(book);
  };

  const closeEditModal = () => {
    setEditingBook(null);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedBook = {
      ...editingBook,
      title: event.target.title.value,
      author: event.target.author.value,
      genres: event.target.genres.value,
      rating: event.target.rating.value,
      description: event.target.description.value,
    };

    updateBook(updatedBook);
    closeEditModal();
  };

  return (
    <div className='book-list'>
      {books.map((book,index) => (
        <div key={book.id} className='book'>
           <span style={{color:"black",cursor:"pointer",marginLeft:'360px',fontSize:"25px",backgroundColor:"white",width:"30px"}} onClick={()=>remove(index)}>x</span>
          <div><h3>{book.title}</h3></div>
          <div><img className='img' src={book.image_url} alt='#' /></div>
          <div><button onClick={() => navigate(`/books/${book.id}`)}>View Details</button></div>
          <div><button onClick={() => openEditModal(book)}>Edit</button></div>
          {check(book.id) ? (
            <div><button onClick={() => removeToFav(book.id)}>Remove from Favourite</button></div>
          ) : (
            <div><button onClick={() => addToFav(book)}>Add to Favourite</button></div>
          )}
        </div>
      ))}

      {/* Edit Modal */}
      {editingBook && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Book</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Title:</label>
              <input type="text" name="title" defaultValue={editingBook.title} required />

              <label>Author:</label>
              <input type="text" name="author" defaultValue={editingBook.author} required />

              <label>Genres:</label>
              <input type="text" name="genres" defaultValue={editingBook.genres} />

              <label>Ratings:</label>
              <input type="number" name="rating" step="0.1" defaultValue={editingBook.rating} />

              <label>Description:</label>
              <textarea name="description" defaultValue={editingBook.description}></textarea>

              <button type="submit">Save Changes</button>
              <button type="button" onClick={closeEditModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
