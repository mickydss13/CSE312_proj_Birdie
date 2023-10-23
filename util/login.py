import bcrypt
from util.database import Account, Token
from util.response import htmlResponse
from util.authToken import createAuthToken
from util.globals import HTML_DIRECTORY




def login(account: Account,token: Token, username:str, password:str):
    userDocument = account.getAccount(username)
    
    if userDocument is None:
        return htmlResponse(HTML_DIRECTORY,'account_not_found.html',200)
    
    passwordCheck = bcrypt.checkpw(password.encode(),userDocument['password'])

    if passwordCheck == True:
        resp = htmlResponse(HTML_DIRECTORY,'login.html',200)
        resp.set_cookie('auth_token', createAuthToken(token,username),httponly = True,max_age=3600)
        return resp
    else:
        return htmlResponse(HTML_DIRECTORY, 'wrong_password.html',200)
