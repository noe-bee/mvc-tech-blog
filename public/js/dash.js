//create new post logic
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const content = document.querySelector('#project-desc').value.trim();

  //code to create a new post
  if (name && content) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dash');
    } else {
      alert('Failed to create post');
    }
  }
};

//delete a post when you click the 'delete' button
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dash');
    } else {
      alert('Failed to delete post');
    }
  }
};

// code to update a post
// if (title && description) {
//   const response = await fetch(`/api/projects`, {
//     method: 'PUT',
//     body: JSON.stringify({ newTitle, newDescritpion }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.ok) {
//     document.location.replace('/dash');
//   } else {
//     alert('Failed to update post');
//   }
// };


document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

