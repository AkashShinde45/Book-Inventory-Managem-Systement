import '../App.css';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAppContext } from '../Context/context';

function Navbar() {
  const { addBook } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genres: "",
    ratings: "",
    description: "",
    image_url: "",  
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { ...bookData, id: Date.now() }; // Assign unique ID
    addBook(newBook); // Add to global state
    setShowForm(false); // Close modal
  };

  return (
    <>
      <div className="navbar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png"
          alt="logo"
          onClick={() => window.location.replace("/")}
        />
        <h1>Books</h1>

        <nav>
          <NavLink
            style={({ isActive }) => isActive ? { border: "2px solid #fff", backgroundColor: "#e1d1f976" } : null}
            to=""
            onClick={(e) => { e.preventDefault(); setShowForm(true); }}
          >
            Add Book
          </NavLink>

          <NavLink
            style={({ isActive }) => isActive ? { border: "2px solid #fff", backgroundColor: "#e1d1f976" } : null}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            style={({ isActive }) => isActive ? { border: "2px solid #fff", backgroundColor: "#e1d1f976" } : null}
            to="/favourite"
          >
            Favourite Books
          </NavLink>
        </nav>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input type="text" name="title" value={bookData.title} onChange={handleChange} required />

              <label>Author:</label>
              <input type="text" name="author" value={bookData.author} onChange={handleChange} required />

              <label>Genres:</label>
              <input type="text" name="genres" value={bookData.genres} onChange={handleChange} required />

              <label>Ratings:</label>
              <input type="number" name="ratings" value={bookData.ratings} onChange={handleChange} min="1" max="5" step="0.1" required />

              <label>Description:</label>
              <textarea name="description" value={bookData.description} onChange={handleChange} required></textarea>

              <label>Image URL:</label>
              <input type="text" name="image_url" value={bookData.image_url} onChange={handleChange} />

              <button type="submit">Add Book</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default Navbar;
