import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState('');

  // Fetch books from Spring Boot backend when the page loads
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Handle adding a new book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/books', {
        title,
        author,
        quantity: parseInt(quantity)
      });
      setTitle('');
      setAuthor('');
      setQuantity('');
      fetchBooks(); // Refresh the book list instantly
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 Library Management System</h1>

      {/* Form to Add Book */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', background: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Add New Book</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Book Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ marginRight: '10px', padding: '8px', width: '25%' }}
          />
          <input 
            type="text" 
            placeholder="Author" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
            style={{ marginRight: '10px', padding: '8px', width: '25%' }}
          />
          <input 
            type="number" 
            placeholder="Quantity" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
            style={{ marginRight: '10px', padding: '8px', width: '20%' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Book
        </button>
      </form>

      {/* Table to Display Books */}
      <h3>Book Inventory</h3>
      <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ background: '#ddd', textAlign: 'left' }}>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', color: '#777' }}>No books found in the database.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;