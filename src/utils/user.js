import bcrypt from "bcryptjs"

export class User {
    username;
    email;
    password;
    salt;

    constructor({username,email,password}){
        this.username = username;
        this.email = email;
        this.salt = this.makeSalt()
        this.password = this.encryptPassword(password,this.salt)
    }

    encryptPassword = (password,salt) => {
        return bcrypt.hashSync(password,salt)
    }

    authenticate = (plainText) => {
        return bcrypt.compareSync(this.password,plainText)
    }

    makeSalt = () => {
        return bcrypt.genSaltSync(10)
      }

    save = () => {
        return fetch("http://localhost:4001/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:this.username,
                salt:this.salt,
                email:this.email,
                password:this.password
            })
        })
    }

    loadAll = () => {
        fetch("http://localhost:4001/users",{
            method:"GET"
        }).then(async response => {
            const data = await response.json()
            return data
        })
    }

    static login = (email,password) => {
        return fetch("http://localhost:4001/users",{
            method:"GET"
        }).then(async (response) => {
            const data = await response.json()
            const foundUser = data.users.find((item) => item.email = email)
            if(foundUser){
                const newUser = new User(foundUser)
                if(newUser.authenticate(password)){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        })
    }
}