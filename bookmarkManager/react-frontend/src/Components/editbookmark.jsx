import React, { useState } from 'react';

function EditBookmark(props) {
  const bookmark = props.bookmarks.filter((bookmark) => {
    return bookmark.id === parseInt(props.selectedBookmark);
  })[0];

  const [formValues, setFormValues] = useState({
    category_name: bookmark.category_name,
    name: bookmark.name,
    url: bookmark.url,
    description: bookmark.description,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setFormValues({ ...formValues, category_name: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/api/bookmark/${bookmark.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as necessary
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={formValues.category_name} onChange={handleSelectChange}>
          {props.categories.map((category) => {
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
        <label>Name</label>
        <input
          type='text'
          name='name'
          value={formValues.name}
          onChange={handleInputChange}
        ></input>
        <label>Url</label>
        <input
          type='text'
          name='url'
          value={formValues.url}
          onChange={handleInputChange}
        ></input>
        <label>Description</label>
        <input
          type='text'
          name='description'
          value={formValues.description}
          onChange={handleInputChange}
        ></input>
        <button type='submit'>Save</button>
      </form>
      <p
        onClick={() => {
          props.setView('main');
        }}
      >
        Go back
      </p>
    </div>
  );
}

export default EditBookmark;
