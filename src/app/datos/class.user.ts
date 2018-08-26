export class User {
    name: string;
    email: string;
    password: string;
    token: string;
    _id: string;

    constructor(name, email, password, token, idc?) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.token = token;
        if(idc){
            this._id = idc;
        }
    }  
  }


  