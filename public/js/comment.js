//reminder: need both divs
var commentDiv = document.getElementById('commentContainer');
var updateDiv = document.getElementById('updateContainer');

//FUNCTION will show the add comment and update container when you click the button
function renderCommentContainer(click) {
  if (commentDiv.classList.contains('hidden')) {
    commentDiv.classList.replace('hidden', 'visible');
    updateDiv.classList.replace('hidden', 'visible');
  }
}

//function will show the update post container when u click the button
// NOTE: future implementation; fix the joined containers
// function renderUpdateContainer(click) {
//   if (updateDiv.classList.contains('hidden')) {
//     updateDiv.classList.replace('hidden', 'visible');
//     // commentDiv.classList
//   }
// }

// LOGIC for creating a comment and rendering it to a post
const commentPostHandler = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector('#commentInput').value.trim();
  console.log(commentText);
  if (commentText) {
    const id = event.target.getAttribute('data-comment-btn');
   console.log(id);
    //using fetch, await the new comment text and 'POST' it into the existing project
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ commentText, id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //after adding the updated description, send to dash page again
    if (response.ok) {
      const parsedComment = await response.json()
      document.location.replace(`/comment/${parsedComment.id}`);
    } else {
      //   console.log(error);
      alert(response.statusText);
    }
  }
};

// EVENT LISTENTERS BELOW

// Event listener for when the user posts a comment
document
  .getElementById('commentContainer')
  .addEventListener('click', commentPostHandler);

//grabbing the 'comment' button on project
document
  .getElementById('clickComment')
  .addEventListener('click', renderCommentContainer);

// document
//   .getElementById('clickUpdate')
//   .addEventListener('click', renderUpdateContainer);
