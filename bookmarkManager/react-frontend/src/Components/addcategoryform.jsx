import { useState } from 'react';
import '../styles/main.css';

function AddCategoryForm(props) {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryData = {
      name: name,
    };

    const response = await fetch('http://localhost:8000/api/category/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      // handle error
      return;
    }

    setName('');
    props.setView('main');

    // get the updated categories from the server
    const categoriesResponse = await fetch(
      'http://localhost:8000/api/category/'
    );
    const categoriesData = await categoriesResponse.json();

    // update the categories state with the updated data
    props.setCategories(categoriesData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Category Name:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={handleNameChange}
          required
        />

        <button type='submit'>Add Category</button>
      </form>

      <button
        className='goback'
        onClick={() => {
          props.setView('main');
        }}
      >
        Go back
      </button>
    </div>
  );
}

export default AddCategoryForm;
