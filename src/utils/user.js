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
        if(id){
            this.password = password
        }else{
            this.password = this.#encryptPassword(password)
        }
    }

    #encryptPassword = (password) => {
        const encryptedPassword =  bcrypt.hashSync(password)
        return encryptedPassword
    }

    authenticate = (plainText) => {
        return bcrypt.compare(plainText,this.password)
    }

    save = () => {
         return fetch(`${process.env.REACT_APP_SERVER_URL}/users`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:this.username,
                email:this.email,
                password:this.password
            })
        }).then(async response => {Ppac
            const data = await response.json()
            const token = this.generateJwt(data.id)
            return({
                token,
                id:data.id,
                email:this.email,
                username:this.username
            })
        })
    }

    generateJwt = (id) => {
        return jwt.sign({
            id
        },config.jwtSecret)
    }
    static #loadAll = () => {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/users`,{
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
                    const {password,...user} = foundUser
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

    static login = ({email,password}) => {
        return this.#loadAll().then(async response => {
            const foundUser = response.find( (item) => item.email === email)
            if(foundUser?.id){
                const newUser = new User(foundUser)
                const passwordCheck = await newUser.authenticate(password)
                if(passwordCheck){
                    const token = newUser.generateJwt(newUser.id)
                    return({
                        token,
                        id:newUser.id,
                        username:newUser.username,
                        email:newUser.email
                    })
                }else{
                    throw new Error("Password do not match")
                }
            }else{
                 throw new Error("User does not exist")
            }
        })
    }
}