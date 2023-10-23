function welcome_user() {
    request_username();
    updatePosts();
    setInterval(updatePosts, 2000);
}

function sendPost() {
    const title = document.getElementById("title_input").value
    const description = document.getElementById("description_input").value
    
    if(title == ""){
        alert("title required")
        return
    }

    if(description == ""){
        alert("description required")
        return
    }

    message = {"title": title, "description": description}
    console.log(message)
    
    const request = new XMLHttpRequest();
    console.log(request)
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.response);
        }
    }
    request.open("POST", "/post-message");
    request.setRequestHeader("Content-Type","application/json")
    request.send(JSON.stringify(message));

    document.getElementById("title_input").value = ""
    document.getElementById("description_input").value = ""
}

function request_username(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.response);
            payload = JSON.parse(this.response)
            console.log(payload.username)
            document.getElementById("paragraph").innerHTML = "<br/>Hello " + payload.username
            return 
        }
    }
    request.open("GET", "/username");
    request.send();
}

function updatePosts() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            clearPosts();
            const messages = JSON.parse(this.response);
            for (const message of messages) {
                addPostToChat(message);
            }
        }
    }
    request.open("GET", "/post-history");
    request.send();
}

function addPostToChat(messageJSON) {
    const chatMessages = document.getElementById("post-messages");
    chatMessages.innerHTML += chatPostHTML(messageJSON);
    chatMessages.scrollIntoView(false);
    chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight;
}

function chatPostHTML(messageJSON) {
    const username = messageJSON.username;
    const title = messageJSON.title
    const description = messageJSON.description;
    const likes = messageJSON.likes;
    const messageId = messageJSON._id;
    const currentUserLiked = messageJSON.didCurrentUserLike
    var button_text = " "
    if(currentUserLiked == true){
        button_text = "Unlike"
    }

    if(currentUserLiked == false){
        button_text = "Like"
    }

    let messageHTML = "<div class='post' id='message_" + messageId + "'>" +
    "<div class='post-header'>" +
        "<b class='username'>" + username + "</b>" +
    "</div>" +
    "<div class='post-content'>" +
        "<div class='post-title'>" + title + ": " + description + "</div>" +
    "</div>" +
    "<div class='post-actions'>" +
        "<button class='like-button' id ='like_button_" + messageId.toString() + "'onclick=\"likeMessage('" + messageId + "')\">"+button_text+"</button>" +
        "<span class='like-count'>" + likes + "</span>" +
    "</div>" +
"</div>";


    return messageHTML;
}

function clearPosts() {
    const chatMessages = document.getElementById("post-messages");
    chatMessages.innerHTML = "";
}

function likeMessage(messageId){
    const request = new XMLHttpRequest();

    request.open("POST", "/like");
    request.setRequestHeader("Content-Type","application/json")
    const message = {"post_id": messageId}
    console.log(message)
    request.send(JSON.stringify(message));
}