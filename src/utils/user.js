import bcrypt from "bcryptjs"
import config from "./config"
import jwt from "jsonwebtoken"

export class User {
    username;
    email;
    id;
    password;
    salt;

    constructor({username,id,email,password}){
        this.username = username;
        this.email = email;
        this.id = id;
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
        }).then(async response => {
            const data = await response.json()
            const token = this.generateJwt(data.id)
            return({
                token,
                id:data.id,
                email:this.email,
                username:this.username,
                password:this.password
            })
        })
    }

    generateJwt = (id) => {
        return jwt.sign({
            id
        },config.jwtSecret)
    }
    static #loadAll = () => {
        return fetch("http://localhost:4001/users",{
            method:"GET"
        }).then(async response => {
            const data = await response.json()
            return data
        })
    }
    static verify = async(arg) => {
        try{
            const decoded = jwt.verify(arg,config.jwtSecret)
            if(!decoded.id){
                throw new Error("id does not exist")
            }
            const allUser = await this.#loadAll()
            if(allUser){
                const foundUser = allUser.find(item => item.id === decoded.id)
                if(foundUser){
                    const {salt,password,...user} = foundUser
                    return user
                }else{
                    return false
                }
            }else {
                return false
            }
        }catch(err){
            console.log("something went wrong",{err})
            throw err
        }
    }

    static login = (email,password) => {
        return this.#loadAll().then(response => {
            const foundUser = response.find((item) => item.email === email)
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