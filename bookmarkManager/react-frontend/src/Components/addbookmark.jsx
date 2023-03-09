import { useState } from 'react';

function AddBookmark(props) {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    url: '',
    description: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/bookmark/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          category: '',
          name: '',
          url: '',
          description: '',
          notes: '',
        });
        props.setView('main');
      } else {
        console.error('Failed to add bookmark');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='addbookmark'>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select
          name='category'
          onChange={handleChange}
          value={formData.category}
        >
          <option value=''>Select a category</option>
          {props.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <label>Name</label>
        <input
          type='text'
          name='name'
          onChange={handleChange}
          value={formData.name}
        ></input>
        <label>Url</label>
        <input
          type='text'
          name='url'
          onChange={handleChange}
          value={formData.url}
        ></input>
        <label>Description</label>
        <input
          type='text'
          name='description'
          onChange={handleChange}
          value={formData.description}
        ></input>
        <label>Notes</label>
        <textarea
          name='notes'
          onChange={handleChange}
          value={formData.notes}
        ></textarea>
        <button type='submit'>Add bookmark</button>
      </form>
    </div>
  );
}

export default AddBookmark;
