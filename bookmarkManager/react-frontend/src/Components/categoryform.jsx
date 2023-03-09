import { useEffect } from 'react';

function CategoryForm(props) {
  let categories = props.categories;
  const setCategories = props.setCategories;

  const handleDelete = async (e) => {
    e.preventDefault();
    const categoryId = e.target.id;

    try {
      const response = await fetch(
        `http://localhost:8000/api/category/${categoryId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      console.log('Category deleted successfully');
      const updatedCategories = categories.filter(
        (category) => category.id != categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e, categoryId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          name: e.target.value,
        };
      } else {
        return category;
      }
    });
    setCategories(updatedCategories);
  };

  const handleSubmit = async (e, categoryId) => {
    e.preventDefault();

    const category = categories.find((category) => category.id === categoryId);
    try {
      const response = await fetch(
        `http://localhost:8000/api/category/${categoryId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(category),
        }
      );
      const data = await response.json();
      console.log('Category updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  return (
    <div className='editcategory'>
      <form>
        {categories.map((category) => {
          return (
            <div key={category.id}>
              <input
                value={category.name}
                onChange={(e) => handleChange(e, category.id)}
              />
              <button
                id={category.id}
                onClick={(e) => handleSubmit(e, category.id)}
              >
                Save
              </button>
              <button id={category.id} onClick={handleDelete}>
                Delete
              </button>
            </div>
          );
        })}
      </form>
      <button className='goback' onClick={() => props.setView('main')}>
        Go back
      </button>
    </div>
  );
}

export default CategoryForm;
