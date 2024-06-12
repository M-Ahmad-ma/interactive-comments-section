
 let data = {
    "currentUser" : {
      "image": { 
       " png" : "./images/avatars/image-juliusomo.png",
       " webp" : "./images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },

   "comments" : [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at letious breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "./images/avatars/image-amyrobson.png",
            "webp": "./images/avatars/image-amyrobson.webp"
          },
          "username" : "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content" : "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "./images/avatars/image-maxblagun.png",
            "webp": "./images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies" : [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt" : "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "./images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,    
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
}
 




let commentsSection = document.getElementById("commentsSection");

let inputField = document.getElementById("input-field");

let newCommentArray = [];

let repliesReplyArray = [];

let activeInputField = null;






window.addEventListener('DOMContentLoaded', function() {
const storedComments = localStorage.getItem("newCommentArray");
if (storedComments) {
    // Parse the stored comments from JSON
    newCommentArray = JSON.parse(storedComments);
    
    // Render the stored comments
    newCommentArray.forEach(comment => {
        renderSingleComment(comment);
    });
    
}


  renderComments(data)
createInputField();
});

function createInputField() {
let createInputDiv = document.createElement('div');
createInputDiv.classList.add("input-div");

// render image
let userImage = document.createElement('img');
userImage.src = data.currentUser.image[" png"];
createInputDiv.append(userImage);

// create input
let input = document.createElement('textarea');
input.classList.add("input-field");
createInputDiv.append(input);

// inputBtn 
let inputBtn = document.createElement('button');
inputBtn.classList.add("input-btn");
inputBtn.textContent = "SEND";
createInputDiv.append(inputBtn);

inputBtn.addEventListener('click', function() {
    let commenttext = input.value;
    if (commenttext.trim() !== '') {
        input.focus();
        
        let newComment = {
            content: commenttext,
            commentImg: data.currentUser.image[" png"],
            replies: [],
            user: data.currentUser
        };
        
        input.value = '';
        
        // Push the new comment to the array
        newCommentArray.push(newComment);
        
        // Save the updated array to local storage with the correct key
        localStorage.setItem("newCommentArray", JSON.stringify(newCommentArray));
        
        // Render the new comment
        renderSingleComment(newComment);
         
      }
});

inputField.append(createInputDiv);
}



function renderSingleComment(comment, commentDiv) {
let createDiv = document.createElement('div')
createDiv.classList.add("new-comment-div")

let userWapper = document.createElement('div')
userWapper.classList.add("user-wapper")
createDiv.append(userWapper)

let userDiv = document.createElement('div')
userDiv.classList.add("user-div")
userWapper.append(userDiv)

let createUserImage = document.createElement('img')
createUserImage.src = data.currentUser.image[" png"]
userDiv.append(createUserImage)

let username = document.createElement('h3')
username.textContent = data.currentUser.username
userDiv.append(username)

let currentUserBtnDiv = document.createElement('div')
currentUserBtnDiv.classList.add("current-user-btn-div")
userWapper.append(currentUserBtnDiv)

let currentUserDeleteBtn = document.createElement('button')
currentUserDeleteBtn.innerHTML = '<img src="images/icon-delete.svg"> Delete'
currentUserDeleteBtn.classList.add("user-delete-btn")
currentUserBtnDiv.append(currentUserDeleteBtn)


  currentUserDeleteBtn.addEventListener('click', function() {

    commentReplyDeleteModel()

   
  })
  
function commentReplyDeleteModel() {
  let model_overlay = document.createElement('div')
  model_overlay.classList.add("modal-overlay")


  let replyModel = document.createElement('div')
  replyModel.classList.add("reply-model")

  let replyModelH2 = document.createElement('h2')
  replyModelH2.textContent = "Delete Comment"
  replyModel.append(replyModelH2)

  let replyModelp = document.createElement('p')
  replyModelp.textContent = "Are you sure you want to delete this comment? This will remove the comment and cannot be undone."
  replyModel.append(replyModelp)

  let replyModelBtns = document.createElement('div')
  replyModelBtns.classList.add("reply-model-btns")
  replyModel.append(replyModelBtns)
  
  let replyModelDelete = document.createElement('button')
  replyModelDelete.innerHTML = 'Delete'
  replyModelBtns.append(replyModelDelete)

  replyModelDelete.addEventListener('click', function(target) {
    if(target = replyModel) {
      replyModel.remove()
      model_overlay.remove()
    }

    let commentIndex = newCommentArray.findIndex(c => c.id === comment.id);
  
    if(commentIndex !== -1) {
      newCommentArray.splice(commentIndex, 1);
      
      
      if (commentDiv && commentDiv.parentNode) {
        commentDiv.parentNode.removeChild(commentDiv);
      }

      localStorage.setItem("newCommentArray", JSON.stringify(newCommentArray));

      commentsSection.innerHTML = ""
      renderComments(data)
    }
    document.body.style.overflow = ""
  })

  let replyModelCancel = document.createElement('button')
  replyModelCancel.innerHTML = 'cancel'
  replyModelBtns.append(replyModelCancel)

  replyModelCancel.addEventListener('click', function() {
    replyModel.remove()
    model_overlay.remove()
    document.body.style.overflow = ''  
  })

  commentsSection.append(replyModel)
  document.body.append(model_overlay)

  document.body.style.overflow = 'hidden'

}

let currentUserEditBtn = document.createElement('button')
currentUserEditBtn.innerHTML = '<img src="images/icon-edit.svg"> Edit'
currentUserEditBtn.classList.add("user-edit-btn")
currentUserBtnDiv.append(currentUserEditBtn)


let createUserContent = document.createElement('p')
createUserContent.textContent = comment.content
createDiv.append(createUserContent)


currentUserEditBtn.addEventListener('click', function() {
  toggleEditInputField();
  editComment()
});


let editDiv = document.createElement('div');
editDiv.classList.add("edit-div")
createDiv.append(editDiv);

let editField = document.createElement('textarea');
editField.classList.add("edit-field")
editField.style.display = 'none';
editDiv.append(editField);

let updatebtn = document.createElement('button');
updatebtn.classList.add("update-btn")
updatebtn.textContent = 'Update';
updatebtn.style.display = 'none';
editDiv.append(updatebtn);

function editComment() {
  editField.value = createUserContent.textContent;
  editField.style.display = 'block';
  updatebtn.style.display = 'block';

  
}

function toggleEditInputField() {
  if (editField.style.display === 'none') {
      editComment();
      createUserContent.style.display = 'none';
  } else {
      editField.style.display = 'none';
      updatebtn.style.display = 'none';
      createUserContent.style.display = 'block';
  }
}

updatebtn.addEventListener('click', function() {
  createUserContent.textContent = editField.value;
  editField.style.display = 'none';
  updatebtn.style.display = 'none';
  createUserContent.style.display = 'block';

  // Update the comment in the newCommentArray and save it to localStorage
  let commentIndex = newCommentArray.findIndex(c => c.id === comment.id);
  if (commentIndex !== -1) {
      newCommentArray[commentIndex].content = editField.value;
      localStorage.setItem("newCommentArray", JSON.stringify(newCommentArray));
  }
});
commentsSection.append(createDiv)
}

let storeRepliesDiv = document.createElement('div')
commentsSection.append(storeRepliesDiv)





// Function to render comments and replies


// Function to render comments and replies
function renderComments(data) {
  data.comments.forEach(function(comment) {
      let commentDiv = document.createElement("div"); 
      commentDiv.classList.add("comment");

      // wrapper 
      let wrapper = document.createElement('div')
      wrapper.classList.add("wrapper")
      commentDiv.append(wrapper)

      // wrapper div
      let wrapperDiv = document.createElement('div')
      wrapperDiv.classList.add("wrapper-div")
      wrapper.append(wrapperDiv)

      // Render images 
      let imageAuthor = document.createElement('img')
      imageAuthor.classList.add('img')
      imageAuthor.src = comment.user.image.png 
      wrapperDiv.append(imageAuthor)

      // Render comment author
      let commentAuthor = document.createElement("p");
      commentAuthor.classList.add("author")
      commentAuthor.textContent =  comment.user.username + " | " + comment.createdAt;
      wrapperDiv.appendChild(commentAuthor);

      // wrapper content
      // button div
      let replayDiv = document.createElement('div')
      replayDiv.classList.add("reply-div")
      wrapper.append(replayDiv)

      // replay btn
      let replyBtn =  document.createElement('button')
      replyBtn.classList.add("reply-btn")
      replyBtn.innerHTML = '<img src="images/icon-reply.svg"> Reply'
      replayDiv.append(replyBtn) 


      // Render comment
      let commentContent = document.createElement("p");
      commentContent.classList.add("comment-content")
      commentContent.textContent =  comment.content;
      commentDiv.appendChild(commentContent);

      commentsSection.appendChild(commentDiv);



      // Comment replies section
      let repliesDiv = document.createElement("div");
      repliesDiv.classList.add("comment-replies");
      commentDiv.appendChild(repliesDiv);

      // reply input div
      let createReplyInputDiv = document.createElement('div')
      createReplyInputDiv.classList.add("reply-input-div")
      commentsSection.append(createReplyInputDiv)


      let storeRepliesDiv = document.createElement('div')
      commentsSection.appendChild(storeRepliesDiv) 



      // reply input field
      function replyInputField() {
          let replyInput = document.createElement('div')
          replyInput.classList.add("reply-input")

          // render image
          let userImage = document.createElement('img')
          userImage.src = data.currentUser.image[" png"]
          replyInput.append(userImage) 

          // create input
          let replyinput = document.createElement('textarea')
          replyinput.classList.add("reply-input-field")
          replyInput.append(replyinput) 

          // inputBtn 
          let inputBtn = document.createElement('button')
          inputBtn.classList.add("reply-input-btn")
          inputBtn.textContent = "REPLY"
          replyInput.append(inputBtn)

          inputBtn.addEventListener('click', function() {
              let commentReplies = replyinput.value
              if(commentReplies.trim() !== '') {
                  replyInput.focus()
                  // commentReply(comment, commentReplies);
                  replyinput.value = ''; // Clear the input field after adding reply
                  commReply(storeRepliesDiv, commentReplies)
                  // commentReply(comment, commentReplies);
                  

              }
          })
          activeInputField = replyInput
          createReplyInputDiv.append(replyInput) 
        }
        function commReply(storeRepliesDiv, replyText) {
          let comReply = document.createElement('div');
          comReply.classList.add("comment-reply");
  
          let comDivWrapper = document.createElement("div");
          comDivWrapper.classList.add("comment-reply-wrapper");
          comReply.append(comDivWrapper);
  
          let comImgDiv = document.createElement('div');
          comImgDiv.classList.add("comment-div-wrapper");
          comDivWrapper.append(comImgDiv);
  
          let comReplyImg = document.createElement('img');
          comReplyImg.classList.add("comment-reply-image");
          comReplyImg.src = 'images/avatars/image-juliusomo.png';
          comImgDiv.append(comReplyImg);
  
          let comButtonWrapper = document.createElement('div');
          comButtonWrapper.classList.add("comment-btn-wrapper");
          comDivWrapper.append(comButtonWrapper);
  
          let comDeleteBtn = document.createElement('button');
          comDeleteBtn.innerHTML = '<img src="images/icon-delete.svg"> Delete';
          comButtonWrapper.append(comDeleteBtn);
  
          comDeleteBtn.addEventListener('click', () => {
              comDeleteModel();
          });
  
          function comDeleteModel() {
              let overlay = document.createElement('div');
              overlay.classList.add("modal-overlay");
  
              let comment_Model = document.createElement('div');
              comment_Model.classList.add("comment-replies-delete-model");
  
              let comment_Model_P = document.createElement('p');
              comment_Model_P.textContent = "Are you sure you want to delete this comment? This will remove the comment and cannot be undone.";
              comment_Model.append(comment_Model_P);
  
              let comment_Model_Button_div = document.createElement('div');
              comment_Model.append(comment_Model_Button_div);
  
              let comment_Model_Delete_btn = document.createElement('button');
              comment_Model_Delete_btn.innerHTML = 'Delete';
              comment_Model_Button_div.append(comment_Model_Delete_btn);
  
              comment_Model_Delete_btn.addEventListener('click', () => {
                  overlay.remove();
                  comment_Model.remove();
                  comReply.remove();
                  document.body.style.overflow = "";
              });
  
              let comment_Model_Cancel_btn = document.createElement('button');
              comment_Model_Cancel_btn.innerHTML = 'Cancel';
              comment_Model_Button_div.append(comment_Model_Cancel_btn);
  
              comment_Model_Cancel_btn.addEventListener('click', () => {
                  overlay.remove();
                  comment_Model.remove();
                  document.body.style.overflow = "";
              });
  
              document.body.append(overlay);
              document.body.append(comment_Model);
              document.body.style.overflow = "hidden";
          }
  
          let comEditBtn = document.createElement('button');
          comEditBtn.innerHTML = '<img src="images/icon-edit.svg"> Edit';
          comButtonWrapper.append(comEditBtn);
  
          let comReplyContent = document.createElement('p');
          comReplyContent.textContent = replyText;
          comReply.append(comReplyContent);
  
          let editDiv = document.createElement('div');
          editDiv.classList.add("edit-div");
          comReply.append(editDiv);
  
          let com_editField = document.createElement('textarea');
          com_editField.classList.add("edit-field");
          com_editField.style.display = "none"
          editDiv.append(com_editField);
  
          let com_updateBtn = document.createElement('button');
          com_updateBtn.classList.add("update-btn");
          com_updateBtn.textContent = 'Update';
          com_updateBtn.style.display = "none"
          editDiv.append(com_updateBtn);
  
          comEditBtn.addEventListener('click', () => {
              com_editField.value = comReplyContent.textContent;
              com_editField.style.display = 'block';
              com_updateBtn.style.display = 'block';
              comReplyContent.style.display = 'none';
          });
  
          com_updateBtn.addEventListener('click', function() {
              comReplyContent.textContent = com_editField.value;
              com_editField.style.display = 'none';
              com_updateBtn.style.display = 'none';
              comReplyContent.style.display = 'block';
          });
  
          storeRepliesDiv.append(comReply);
      }
      // Keep track of whether the input field is currently visible
      let isInputFieldVisible = false;

      // Function to toggle the visibility of the input field
      function toggleInputField() {
          if (isInputFieldVisible) {
              createReplyInputDiv.style.display = "none";
              isInputFieldVisible = false;
          } else {
              createReplyInputDiv.style.display = "block";
              isInputFieldVisible = true;
          }
      }

      function handleReplyBtnClick() {
          // Hide the active input field if it exists
          if (activeInputField) {
              activeInputField.style.display = "none";
          }

          toggleInputField()
          // Create and show the reply input field
          replyInputField();
      }

 

    
      replyBtn.addEventListener('click',  handleReplyBtnClick);
      
      if (comment.replies.length > 0) {
        let repliesDiv = document.createElement("div");
        repliesDiv.classList.add("replies");
    
        let replyIndex = 0;
    
        comment.replies.forEach(function(reply) {
            let replyDiv = document.createElement("div");
            replyDiv.classList.add("reply");
    
            // Wrapper
            let Wrapper = document.createElement('div');
            Wrapper.classList.add("replies-wrapper");
            replyDiv.append(Wrapper);
    
            // Reply wrapper
            let replyWrapper = document.createElement('div');
            replyWrapper.classList.add("reply-wrapper");
            Wrapper.append(replyWrapper);
    
            // Render image
            let createimg = document.createElement('img');
            createimg.classList.add("reply-img");
            createimg.src = reply.user.image.png;
            replyWrapper.append(createimg);
    
            // Render reply author
            let replyAuthor = document.createElement("p");
            replyAuthor.textContent = reply.user.username + " | " + reply.createdAt;
            replyWrapper.appendChild(replyAuthor);
    
            // If it's the first reply, add edit and delete buttons
            if (replyIndex === 1) {
                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<img src="images/icon-delete.svg"> Delete';
                deleteButton.classList.add("delete-btn");
                Wrapper.appendChild(deleteButton);
    
                deleteButton.addEventListener('click', function() {
                    deleteComment(reply);
                });
    
                function deleteComment(reply) {

                  let modaloverlay = document.createElement('div')
                  modaloverlay.classList.add("modal-overlay")
                    
                    let model = document.createElement('div');
                    model.classList.add("model");
    
                    let modelH2 = document.createElement('h2');
                    modelH2.textContent = "Delete comment";
                    model.append(modelH2);
    
                    let modelP = document.createElement('p');
                    modelP.textContent = "Are you sure you want to delete this comment? This will remove the comment and cannot be undone.";
                    model.append(modelP);
    
                    let modelBtnDiv = document.createElement('div');
                    modelBtnDiv.classList.add("model-btn");
                    model.append(modelBtnDiv);
    
                    let modelCancel = document.createElement('button');
                    modelCancel.classList.add("cancel-btn");
                    modelCancel.textContent = "No, cancel";
                    modelBtnDiv.append(modelCancel);
    
                    let modelDelete = document.createElement('button');
                    modelDelete.classList.add("btn-delete");
                    modelDelete.textContent = "Yes, Delete";
                    modelBtnDiv.append(modelDelete);
    
                    commentsSection.append(model);
                     document.body.append(modaloverlay)
                    document.body.style.overflow = 'hidden';
    
                    // Close the model when clicking outside of it
                    model.addEventListener('click', function(event) {
                        if (event.target === model) {
                            model.remove();
                            modaloverlay.remove()
                            document.body.style.overflow = ''; // Enable scrolling on the body
                        }
                    });
    
                    // Event listener for the "No, cancel" button
                    modelCancel.addEventListener('click', function() {
                        model.remove();
                        modaloverlay.remove()
                        document.body.style.overflow = ''; // Enable scrolling on the body
                    });
    
                    function deleteReply() {
                        // Find the index of the reply in the replies array
                        const replyIndex = data.comments[1].replies.findIndex(r => r.id === reply.id);
    
                        // If the reply is found
                        if (replyIndex !== -1) {
                            // Remove the reply from the replies array
                            data.comments[1].replies.splice(replyIndex, 1);
    
                            // Re-render the comments section
                            commentsSection.innerHTML = "";
                            renderComments(data);
                        }
                    }
    
                    // Event listener for the "Yes, Delete" button
                    modelDelete.addEventListener('click', function() {
                        // Perform delete operation here
                        deleteReply();
                        // Once the delete operation is completed, remove the model
                        model.remove();
                        modaloverlay.remove()
                        document.body.style.overflow = ''; // Enable scrolling on the body
                    });
                }
    
                let editButton = document.createElement('button');
                editButton.innerHTML = '<img src="images/icon-edit.svg"> Edit';
                editButton.classList.add("edit-btn");
                Wrapper.appendChild(editButton);
    
                editButton.addEventListener('click', () => {
                    // Edit functionality here
                  
                    
                    edit_Reply()
                    toggleEditField()

                    
                    
                  replyContent.textContent = ""
                });

                

                  let edit_Field = document.createElement('textarea');
                  edit_Field.classList.add("edit-field")
                  edit_Field.style.display = 'none';
                  replyDiv.append(edit_Field);
                  let update_btn = document.createElement('button');
                  update_btn.classList.add("update-btn")
                  update_btn.textContent = 'Update';
                  update_btn.style.display = 'none';
                  replyDiv.append(update_btn);

                function edit_Reply() {
                  edit_Field.value = replyContent.textContent;
                  edit_Field.style.display = 'block';
                   update_btn.style.display = 'block';
                   
  
                }

                function toggleEditField() {
                  if(edit_Field.style.display == "block") {
                   
                    edit_Field.style.display = "block"
                    update_btn.style.display = "block"
                    replyContent.textContent = edit_Field.textContent


                  }
                  else {
                    edit_Reply()
                    replyContent.textContent = ""

                  }
                }

        

               update_btn.addEventListener('click', function() {
               replyContent.textContent = edit_Field.value;
               edit_Field.style.display = 'none';
               update_btn.style.display = 'none';
              replyContent.style.display = 'block';
  
          })
        }    
             else {
                let replyButton = document.createElement('button');
                replyButton.innerHTML = '<img src="images/icon-reply.svg"> Reply';
                replyButton.classList.add("reply-btn");
                Wrapper.appendChild(replyButton);
    
                // Event listener for the replies button
                replyButton.addEventListener('click', function() {
                    if (activeInputField) {
                        activeInputField.style.display = 'none';
                    }
                    // Toggle the visibility of the input field
                    toggleInputField();
                    repliesInputField();
                });
            }
    
            // Increment the reply index for the next iteration
            replyIndex++;
    
            // Reply button div
            let replyButtonDv = document.createElement('div');
            replyButtonDv.classList.add("replies-button");
            Wrapper.append(replyButtonDv);
    
            // Render reply content
            let replyContent = document.createElement("p");
            replyContent.textContent = reply.content;
            replyDiv.appendChild(replyContent);
    
            repliesDiv.appendChild(replyDiv);
    
            let storeRepliesReply = document.createElement('div');
            storeRepliesReply.classList.add("store-reply");
            repliesDiv.append(storeRepliesReply);
    
            let repliesInputFieldDiv = document.createElement('div');
            repliesInputFieldDiv.classList.add("replies-input-div");
            repliesDiv.append(repliesInputFieldDiv);
    
            commentsSection.appendChild(repliesDiv);
    
            let isInputFieldVisible = false;
    
            function toggleInputField() {
                if (isInputFieldVisible) {
                    repliesInputFieldDiv.style.display = "none";
                    isInputFieldVisible = false;
                } else {
                    repliesInputFieldDiv.style.display = "block";
                    isInputFieldVisible = true;
                }
            }

            
    
            // Replies input field
            function repliesInputField() {
                let repliesInputField = document.createElement("div");
                repliesInputField.classList.add("replies-input-field");
    
                // Render replies image
                let createRepliesImage = document.createElement('img');
                createRepliesImage.src = data.currentUser.image[" png"];
                repliesInputField.append(createRepliesImage);
    
                // Replies input field
                let repliesInput = document.createElement('textarea');
                repliesInput.classList.add("replies-input");
                repliesInputField.appendChild(repliesInput);
    
                // Replies button
                let repliesInputBtn = document.createElement('button');
                repliesInputBtn.classList.add("replies-input-btn");
                repliesInputBtn.textContent = "REPLY";
                repliesInputField.append(repliesInputBtn);
                    
                
                repliesInputBtn.addEventListener('click', function() {
                    let repliesInputValue = repliesInput.value;
                    if (repliesInputValue.trim() !== '') {
                        let repliesReplyObj = {
                            id: comment.replies.length + 1, // Generate a new ID
                            content: repliesInputValue,
                            createdAt: new Date().toLocaleString(),
                            score: 0,
                            user: {
                                image: data.currentUser.image,
                                username: data.currentUser.username
                            }
                        };
    
                        repliesReplyArray.push(repliesReplyObj);
                        localStorage.setItem("repliesReplyArray", JSON.stringify(repliesReplyObj));
    
                        repliesReplyFunction(storeRepliesReply, repliesInputValue);
                    }

                    repliesInput.value = "";

                });
                
            function repliesReplyFunction(storeRepliesReply, repliesInputValue) {
              let repliesReply = document.createElement('div');
              repliesReply.classList.add("replies-reply");
    
              let repliesReplyWrapper = document.createElement('div');
              repliesReplyWrapper.classList.add("replies-reply-wrapper");
              repliesReply.append(repliesReplyWrapper);
    
              let repliesImage = document.createElement('div');
              repliesImage.classList.add("image-div")
              repliesReplyWrapper.append(repliesImage);
    
              let repliesReplyImg = document.createElement('img');
              repliesReplyImg.src = "images/avatars/image-juliusomo.png";
              repliesImage.append(repliesReplyImg);

              let repliesReplyAurther = document.createElement('p')
              repliesReplyAurther.textContent = "juliusomo"
              repliesImage.append(repliesReplyAurther)
    
              let repliesReplyBtnDiv = document.createElement('div');
              repliesReplyBtnDiv.classList.add("replies-button-div");
              repliesReplyWrapper.append(repliesReplyBtnDiv);
    
              let repliesReplyDeleteBtn = document.createElement('button');
              repliesReplyDeleteBtn.classList.add("replies-delete-button");
              repliesReplyDeleteBtn.innerHTML = '<img src="images/icon-delete.svg"> Delete';
              repliesReplyBtnDiv.append(repliesReplyDeleteBtn);

              repliesReplyDeleteBtn.addEventListener('click', () => {
                repliesDeleteModel()
              })
              function repliesDeleteModel() {
                // Create the modal container
                let repliesDeleteModel = document.createElement('div');
                repliesDeleteModel.classList.add('replies-model');
                
                // Create the overlay element
                let overlay = document.createElement('div');
                overlay.classList.add('modal-overlay');
            
                // Create the modal content
                let modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');
                modalContent.innerHTML = `
                    <h1>Delete comment</h1>
                    <p>Are you sure you want to delete this comment? This will remove the comment and cannot be undone.</p>
                    <div class="model-btns">
                        <button id="deleteBtn" class="button delete-btn-D">Delete</button>
                        <button id="cancelBtn" class="button cancel-btn">Cancel</button>
                    </div>
                `;
            
                 // Append the modal content to the modal container
                document.body.appendChild(overlay);
                repliesDeleteModel.appendChild(modalContent);
            
                // Add event listeners for the delete and cancel buttons
                repliesDeleteModel.querySelector('#deleteBtn').addEventListener('click', () => {
                    repliesDeleteModel.remove();
                    repliesReply.remove();
                    overlay.remove()
                    document.body.style.overflow = '';
                });
            
                repliesDeleteModel.querySelector('#cancelBtn').addEventListener('click', () => {
                    repliesDeleteModel.remove();
                    overlay.remove()
                    document.body.style.overflow = '';
                });
            
                // Append the modal container to the comments section
                commentsSection.append(repliesDeleteModel);
                document.body.style.overflow = 'hidden';
            }
            
    
              let repliesReplyEditBtn = document.createElement("button");
              repliesReplyEditBtn.innerHTML = '<img src="images/icon-edit.svg"> Edit';
              repliesReplyEditBtn.classList.add("replies-edit-button");
              repliesReplyBtnDiv.append(repliesReplyEditBtn);

              repliesReplyEditBtn.addEventListener('click', () => {
                edit__Reply()
                toggle_EditField()
              })

              
              let edit__Field = document.createElement('textarea');
              edit__Field.classList.add("edit-field")
              edit__Field.style.display = 'none';
              repliesReply.append(edit__Field);

              let update__btn = document.createElement('button');
              update__btn.classList.add("update-btn")
              update__btn.textContent = 'Update';
              update__btn.style.display = 'none';
              repliesReply.append(update__btn);

            function edit__Reply() {
              edit__Field.value = repliesReplyContent.textContent;
              edit__Field.style.display = 'block';
               update__btn.style.display = 'block';
               

            }

            function toggle_EditField() {
              if(edit__Field.style.display == "block") {
               
                edit__Field.style.display = "block"
                update__btn.style.display = "block"
                repliesReplyContent.textContent = edit__Field.textContent


              }
              else {
                edit__Reply()
                repliesReplyContent.textContent = ""

              }
            }

    

           update__btn.addEventListener('click', function() {
           repliesReplyContent.textContent = edit__Field.value;
           edit__Field.style.display = 'none';
           update__btn.style.display = 'none';
          repliesReplyContent.style.display = 'block';

      })
    
              let repliesReplyContent = document.createElement('p');
              repliesReplyContent.innerHTML = repliesInputValue;
              repliesReply.append(repliesReplyContent);
    
              storeRepliesReply.append(repliesReply);
          }
                  
              
                repliesInputFieldDiv.append(repliesInputField);
    
                activeInputField = repliesInputField;
            }
              
        });
           
       
        
    }
  })
}