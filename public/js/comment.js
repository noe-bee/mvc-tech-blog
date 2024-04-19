//need both divs
var commentDiv = document.getElementById('commentContainer');
var updateDiv = document.getElementById('updateContainer');

//function will show the add comment and update container when you click the button
function renderCommentContainer(click) {
  if (commentDiv.classList.contains('hidden')) {
    commentDiv.classList.replace('hidden', 'visible');
    updateDiv.classList.replace('hidden', 'visible');
  }
}

//function will show the update post container when u click the button
// function renderUpdateContainer(click) {
//   if (updateDiv.classList.contains('hidden')) {
//     updateDiv.classList.replace('hidden', 'visible');
//     // commentDiv.classList
//   }
// }

// COMMENT FUNCTION BELOW

// // Sample array to store comments
// let comments = [];

// // Function to handle posting a comment
// function postComment(event) {
//   event.preventDefault();
//   // Get the user's input from a form input field
//   let commentInput = document.getElementById('commentInput').value;

//   // Create a new comment object
//   let newComment = {
//     user: 'Anonymous', // You can add a user field if needed
//     text: commentInput,
//     timestamp: new Date(),
//   };

//   // Add the new comment to the array
//   comments.push(newComment);

//   // Update the display to show the new comment
//   displayComments();
// }

// // Function to display comments
// function displayComments() {
//   // event.preventDefault()
//   // Get the element where comments will be displayed
//   let commentsContainer = document.getElementById('commentsContainer');
//   commentsContainer.innerHTML = ''; // Clear previous comments

//   // Loop through the comments array and display each comment
//   comments.forEach((comment) => {
//     let commentElement = document.createElement('div');
//     commentElement.innerHTML = `
//             <strong>${comment.user}</strong> - ${comment.text} - ${comment.timestamp}
//         `;
//     commentsContainer.appendChild(commentElement);
//   });
// }

// logic for creating a comment
const commentPostHandler = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector('#commentInput').value.trim();

  if (commentText) {
    const id = event.target.getAttribute('data-comment-btn');

    //using fetch, await the new comment text and 'POST' it into the existing project
    const response = await fetch(`/api/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify({ commentText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //after adding the updated description, send to dash page again
    if (response.ok) {
      document.location.replace(`/comment/${id}`);
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
