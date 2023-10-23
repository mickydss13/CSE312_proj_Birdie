from flask import make_response, send_from_directory

def htmlResponse(directory:str, filename:str,status: int):
    response = make_response(send_from_directory(directory,filename),200)
    response.status = status
    response.headers['X-Content-Type-Options'] = 'nosniff'
    return response

