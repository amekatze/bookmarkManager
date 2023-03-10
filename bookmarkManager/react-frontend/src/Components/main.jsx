import { useState, useEffect } from 'react';
import '../styles/main.css';

function Main(props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const bookmarks = props.bookmarks;
  const setBookmarks = props.setBookmarks;
  const categories = props.categories;
  const setCategories = props.setCategories;

  useEffect(() => {
    if (selectedCategory !== '') {
      const filteredData = bookmarks.filter(
        (bookmark) => bookmark.category === parseInt(selectedCategory)
      );
      setFilteredBookmarks(filteredData);
    } else {
      setFilteredBookmarks(bookmarks);
    }
  }, [bookmarks, selectedCategory]);

  return (
    <div className='main-container'>
      <div className='sidebar'>
        <h4>Categories</h4>
        <p
          onClick={() => {
            props.setView('addcategoryform');
          }}
        >
          Add Categories
        </p>
        <p
          onClick={() => {
            props.setView('categoryform');
          }}
        >
          Edit Categories
        </p>
        <hr />
        <p
          onClick={() => {
            setSelectedCategory('');
          }}
        >
          All
        </p>
        {categories.map((category) => {
          return (
            <p
              key={category.id}
              id={category.id}
              onClick={(e) => {
                setSelectedCategory(e.target.id);
              }}
            >
              {category.name}
            </p>
          );
        })}
      </div>

      <div className='bookmark-container'>
        <button
          className='addbookmark'
          onClick={() => {
            props.setView('addbookmark');
          }}
        >
          Add Bookmark
        </button>
        {filteredBookmarks.map((bookmark) => {
          return (
            <div className='bookmark-card' key={bookmark.id}>
              <a href={bookmark.url} target='_blank'>
                {bookmark.name}
              </a>
              <br />
              <p>Description: {bookmark.description}</p>
              <small>Category: {bookmark.category_name}</small>
              <div className='edit'>
                <button
                  id={bookmark.id}
                  onClick={(e) => {
                    props.setView('editbookmark');
                    console.log(e.target.id);
                    props.setSelectedBookmark(e.target.id);
                  }}
                >
                  Edit
                </button>
                <button
                  id={bookmark.id}
                  onClick={() => {
                    fetch(`http://localhost:8000/api/bookmark/${bookmark.id}`, {
                      method: 'DELETE',
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        // Update the list of bookmarks in the parent component
                        setBookmarks(data.bookmarks);
                      })
                      .catch((error) => console.error(error));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
