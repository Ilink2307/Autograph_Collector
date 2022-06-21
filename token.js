let globalToken = ' ';

export function updateToken(token){
    globalToken = token;
}

export function checkToken(){
    if(globalToken === ' '){
        return false;
    }
    else
        return true;
}
