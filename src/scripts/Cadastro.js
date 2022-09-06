import { Requests } from '../scripts/models/api.js'
class Cadastro{
    static Nome = ""
    static Email = ""
    static Senha = ""
    static Trabalho = ""
    static ImgUrl = ""

    static EventAdd(){
        let NameInput = document.querySelector(".Cadastro-nome")
        let EmailInput = document.querySelector(".Cadastro-email")
        let SenhaInput = document.querySelector(".Cadastro-senha")
        let TrabalhoInput = document.querySelector(".Cadastro-trabalho")
        let ImgInput = document.querySelector(".Cadastro-img")
        let CadastroBtn = document.querySelector(".Cadastro-btn")
        CadastroBtn.addEventListener("click", ()=>{
            this.Nome = NameInput.value
            this.Email = EmailInput.value
            this.Senha = SenhaInput.value
            this.Trabalho = TrabalhoInput.value
            this.ImgUrl = ImgInput.value
            this.BodyCreate()
        })
    }
    static BodyCreate(){
        let bodyCadastro = {
            "username": this.Nome,
            "email": this.Email,
            "password": this.Senha,
            "work_at": this.Trabalho,
            "image": this.ImgUrl
        }
        console.log(bodyCadastro)
        Requests.criarUsuario(bodyCadastro)
    }
}

Cadastro.EventAdd()