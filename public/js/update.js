// logic for updating a post
const updatePostHandler = async (event) => {
  event.preventDefault();

  // const title = document.querySelector('#project-title').value.trim();
  const description = document.querySelector('#updateInput').value.trim();

  if (description) {
    const id = event.target.getAttribute('data-update-btn');

    //using fetch, await the new project description and 'PUT' or update it into the existing project
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //after adding the updated description, send to project page again
    if (response.ok) {
      document.location.replace(`/project/${id}`);
    } else {
      //   console.log(error);
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#updateContainer')
  .addEventListener('click', updatePostHandler);
