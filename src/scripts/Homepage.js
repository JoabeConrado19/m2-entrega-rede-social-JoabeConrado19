import { Requests } from '../scripts/models/api.js'

class Renderizar extends Requests{
    static Title = document.querySelector(".input-title")
    static Description = document.querySelector(".input-description")
    static submitBtn = document.querySelector(".input-submit")
    static Redirecionando() {
        this.submitBtn.addEventListener("click", this.CriarPost)
        if (localStorage.getItem("@kenzieRede:token") != this.token || localStorage.getItem("@kenzieRede:token") == undefined) {
            localStorage.clear();
            window.location.assign("/index.html");
        }
}
    static CriarPost(){
        this.Title = document.querySelector(".input-title")
        this.Description = document.querySelector(".input-description")
        this.submitBtn = document.querySelector(".input-submit")
        let body = {
            "title": this.Title.value,
            "description": this.Description.value
        }
        Requests.CriarPost(body)
        
    }
}
Renderizar.Redirecionando()
Requests.ObterPosts()
Requests.UserUI()
Requests.AleatoryUser()