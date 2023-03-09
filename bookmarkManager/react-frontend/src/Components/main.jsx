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
        <p>Categories</p>
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
        <p
          onClick={() => {
            props.setView('addbookmark');
          }}
        >
          Add Bookmark
        </p>
        {filteredBookmarks.map((bookmark) => {
          return (
            <p key={bookmark.id}>
              <a href={bookmark.url} target='_blank'>
                {bookmark.name}
              </a>
              <br />
              <small>Category: {bookmark.category_name}</small>
              <div>
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
              </div>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
