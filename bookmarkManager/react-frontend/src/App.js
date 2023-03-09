import { useState, useEffect } from 'react';
import Main from './Components/main';
import Nav from './Components/nav';
import CategoryForm from './Components/categoryform';
import AddBookmark from './Components/addbookmark';
import EditBookmark from './Components/editbookmark';
import AddCategoryForm from './Components/addcategoryform';

function App() {
  const [view, setView] = useState('main');
  const [bookmarks, setBookmarks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBookmark, setSelectedBookmark] = useState('');

  const props = {
    setView,
    bookmarks,
    categories,
    setCategories,
    selectedBookmark,
    setSelectedBookmark,
  };

  useEffect(() => {
    async function getBookmarks() {
      const response = await fetch('http://localhost:8000/api/bookmark/');
      const data = await response.json();
      setBookmarks(data);
    }
    getBookmarks();
  }, [setView, []]);

  useEffect(() => {
    async function getCatgories() {
      const response = await fetch('http://localhost:8000/api/category/');
      const data = await response.json();
      setCategories(data);
    }
    getCatgories();
  }, []);

  return (
    <div className='App'>
      <Nav />
      {view === 'main' && <Main {...props} />}
      {view === 'categoryform' && <CategoryForm {...props} />}
      {view === 'addbookmark' && <AddBookmark {...props} />}
      {view === 'editbookmark' && <EditBookmark {...props} />}
      {view === 'addcategoryform' && <AddCategoryForm {...props} />}
    </div>
  );
}

export default App;
