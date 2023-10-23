from util.database import Account,Token,Posts
from util.authToken import hashAuthToken
from flask import make_response


def didCurrentUserLike(post: Posts,token: Token, id: int, auth_token:str):
    if auth_token == None:
        return False
    
    
    document = token.getToken(hashAuthToken(auth_token))
    if document is None:
        return False

    username = document['_id']

    documentPost = post.getPost(int(id))
    
    if(username in documentPost['liked_by']):
        return True
    else:
        return False


def likeResp(post: Posts, token: Token, id: int, auth_token: str):
    document = token.getToken(hashAuthToken(auth_token))
    
    if document is None:
        return make_response("user not logged in", 403)

    username = document['_id']

    

    post.likePost(id,username)

    return make_response("success", 200)