function CategoryForm(props) {
  const categories = props.categories;

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='formcontrol'>
      <form>
        {categories.map((category) => {
          return (
            <div key={category.id}>
              <input value={category.name} onChange={() => {}} />
              <button id={category.id} onClick={handleDelete}>
                Delete
              </button>
            </div>
          );
        })}
      </form>
      <p onClick={() => props.setView('main')}>Go back</p>
    </div>
  );
}

export default CategoryForm;
