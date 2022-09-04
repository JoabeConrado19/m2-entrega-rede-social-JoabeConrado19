import { Requests } from '../scripts/models/api.js'
class Login{
    static Nome = ""
    static Email = ""
    
    static BtnEventAdd(){
        let EmailInput = document.querySelector(".email-input-login")
        let SenhaInput = document.querySelector(".senha-input-login")
        let LoginBtn = document.querySelector(".login-btn")
        LoginBtn.addEventListener("click", ()=>{
            this.Email = EmailInput.value
            this.Senha = SenhaInput.value
            this.BodyCreate()
        })

    }
    static BodyCreate(){
        let bodyLogin = {
            "email": `${this.Email}`,
            "password": `${this.Senha}`,
        }
        Requests.Login(bodyLogin)
        
    }
   
}
Login.BtnEventAdd()