
export class Requests {
    static BaseUrl = "https://m2-rede-social.herokuapp.com/api"
    static token = localStorage.getItem("@kenzieRede:token")
    static UserId = localStorage.getItem("@kenzieRede:UserId")
    static PostsContainer = document.querySelector(".posts-container")
    static UserConteiner = document.querySelector(".user-info")
    static UserImg = document.querySelector(".img-container-create")
    static UserIdPost = 0
    static SeguirId = 0
    static AsideContainer = document.querySelector(".asideCards")
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.token}`
    }
    static Modal = document.querySelector(".modal-wrapper")
    static async Login(body) {
        let Modal = document.querySelector(".ativador")
        let ModalClose = document.querySelector(".modal-close")
        const userLogin = await fetch(`${this.BaseUrl}/users/login/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {

                if (res.token != undefined) {
                    localStorage.setItem("@kenzieRede:token", res.token)
                    localStorage.setItem("@kenzieRede:UserId", res.user_uuid)
                    window.location.assign("../src/pages/Homepage.html")
                }
                else {

                    ModalClose.addEventListener("click", () => { Modal.classList.remove("d-flex") })
                    Modal.classList.add("d-flex")
                }
            })
        return userLogin
    }
    static async criarUsuario(body) {
        const newUser = await fetch(`${this.BaseUrl}/users/`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.username == body.username) { window.location.assign("/index.html") }
                return res
            })
        return newUser
    }
    static async ObterPosts() {
        const newUser = await fetch(`https://m2-rede-social.herokuapp.com/api/posts/`, {
            method: 'GET',
            headers: this.headers,
        })
            .then(res => res.json())
            .then(res => {
                let postagens = res.results
                let likes = res.likes
                postagens.forEach(element => {
                    let likesQnt = element.likes.length
                    let author = element.author
                    let li = document.createElement("li")
                    let div = document.createElement("div")
                    div.classList.add("postHeader")
                    let div2 = document.createElement("div")
                    div2.classList.add("post-img-container")
                    let img1 = document.createElement("img")
                    img1.src = author.image
                    let div3 = document.createElement("div")
                    div3.classList.add("Post-user-info")
                    let h3 = document.createElement("h3")
                    h3.innerText = author.username
                    let p = document.createElement("p")
                    p.innerText = author.work_at
                    let div4 = document.createElement("div")
                    div4.classList.add("postBottom")
                    let h2 = document.createElement("h2")
                    h2.innerText = element.title
                    let p2 = document.createElement("p")
                    p2.innerText = element.description
                    let div5 = document.createElement("div")
                    div5.classList.add("postBtns")
                    let button = document.createElement("button")
                    button.addEventListener("click", () => {
                        this.Modal.innerHTML = ""
                        let div = document.createElement("div")
                        div.classList.add("modal")
                        let div2 = document.createElement("div")
                        div2.classList.add("modal-header")
                        let h3 = document.createElement("h3")
                        h3.classList.add("modal-title")
                        h3.innerText = element.title
                        let p = document.createElement('p')
                        p.innerText = element.description
                        let button = document.createElement("button")
                        button.addEventListener("click", () => { this.Modal.classList.toggle("d-flex") })
                        button.classList.add("modal-close")
                        button.innerText = "X"
                        let div3 = document.createElement("div")
                        div3.classList.add("modal-body")
                        div3.innerText = element.description
                        let divh = document.createElement("div")
                        divh.classList.add("postHeader-modal")
                        let div2h = document.createElement("div")
                        div2h.classList.add("post-img-container-modal")
                        let img1h = document.createElement("img")
                        img1h.classList.add("user-img")
                        img1h.src = author.image
                        let div3h = document.createElement("div")
                        div3h.classList.add("Post-user-info-modal")
                        let h3h = document.createElement("h3")
                        h3h.innerText = author.username
                        let ph = document.createElement("p")
                        ph.innerText = author.work_at
                        this.Modal.appendChild(div)
                        div.appendChild(div2)
                        div.appendChild(div3)
                        div3.appendChild(h3, p)
                        div2h.append(img1h, divh)
                        divh.append(h3h, ph)
                        div3h.append(button)
                        div2.append(div2h, div3h)
                        this.Modal.classList.toggle("d-flex")
                    })
                    button.innerText = "Abrir Post"
                    let img2 = document.createElement("img")
                    img2.src = "../assets/heartBlack.png"
                    img2.addEventListener("click", () => {
                        this.UserIdPost = element.uuid
                        if (img2.getAttribute('src') == "../assets/heartBlack.png") {
                            img2.src = "../assets/heartRed.png"
                            likesQnt += 1
                            p3.innerText = likesQnt
                        }
                        else {
                            img2.src = "../assets/heartBlack.png"
                            likesQnt -= 1
                            p3.innerText = likesQnt

                        }
                        this.LikeUnlike(this.UserIdPost)
                      
                    })
                    let p3 = document.createElement("p")
                    if (likesQnt != 0) {
                        p3.innerText = likesQnt;
                    }
                    else { p3.innerText = "0" }

                    this.PostsContainer.appendChild(li)
                    li.appendChild(div)
                    div.appendChild(div2)
                    div2.appendChild(img1)
                    div.appendChild(div3)
                    div3.appendChild(h3)
                    div3.appendChild(p)
                    li.appendChild(div4)
                    div4.appendChild(h2)
                    div4.appendChild(p2)
                    li.appendChild(div5)
                    div5.appendChild(button)
                    div5.appendChild(img2)
                    div5.appendChild(p3)
                });
                return res
            })
        return newUser
    }
    static async UserUI() {
        const newUser = await fetch(`${this.BaseUrl}/users/${this.UserId}/`, {
            method: 'GET',
            headers: this.headers,
        }).then(res => res.json())
            .then(res => {
     
                let User = res
                let img = document.createElement("img")
                img.src = res.image
                let div = document.createElement("div")
                div.classList.add("user-info-left")
                let h2 = document.createElement("h2")
                h2.innerText = res.username
                let p = document.createElement("p")
                p.innerText = res.work_at
                let span = document.createElement("span")
                span.innerText = `Seguidores: ${res.followers_amount}`

                this.UserConteiner.appendChild(div)
                div.appendChild(h2)
                div.appendChild(p)
                this.UserConteiner.appendChild(span)
                this.UserImg.appendChild(img)
            })

    }

    static async AleatoryUser() {
        const newUser = await fetch(`${this.BaseUrl}/users/`, {
            method: 'GET',
            headers: this.headers,
        }).then(res => res.json())
            .then(res => {
                let i = Math.floor(Math.random() * res.results.length);
                let array = [];
                array.push(res.results[i])
                i = Math.floor(Math.random() * res.results.length);
                array.push(res.results[i])
                i = Math.floor(Math.random() * res.results.length);
                array.push(res.results[i])
                array.forEach(element => {
                    let li = document.createElement("li")
                    let div = document.createElement("div")
                    div.classList.add("aside-right-content")
                    let img = document.createElement("img")
                    img.src = element.image
                    let div2 = document.createElement("div")
                    let h2 = document.createElement("h2")
                    h2.innerText = element.username
                    let p = document.createElement("p")
                    p.innerText = element.work_at
                    let button = document.createElement("button")
                    button.classList.add("SeguirDesativo")
                    button.innerText = "Seguir"
                    button.addEventListener("click", () => {
                        button.classList.toggle("SeguirAtivo")
                        if (button.innerText != "Seguindo") {
                            button.innerText = "Seguindo"
                            this.SeguirId = element.uuid
                        
                            this.Follow(this.SeguirId)
                        }
                        else if (button.innerText == "Seguindo") {
                            button.innerText = "Seguir"
                        }
                    })
                    this.AsideContainer.appendChild(li)
                    li.appendChild(div)
                    div.appendChild(img)
                    div.appendChild(div2)
                    div2.appendChild(h2)
                    div2.appendChild(p)
                    li.appendChild(button)

                });
            })

    }
    static async CriarPost(body) {
        const newUser = await fetch(`${this.BaseUrl}/posts/`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
             
                this.ObterPosts()


                return res
            })


        return newUser
    }

    static async LikeUnlike(id) {

        const newUser = await fetch(`${this.BaseUrl}/likes/`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ "post_uuid": id })
        })
            .then(res => res.json())
            .then(res => {


                
              
                id = res.uuid
           

                if (res.post_uuid == 'You already liked this post.') {
                    this.Unlike(id)

                }

                return res
            })

        return newUser
    }
    static async Unlike(id) {
        const newUser = await fetch(`${this.BaseUrl}/likes/${id}/`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => res.json())
            .then(res => {
       
                return res
            })
    }
    static async Follow(id) {
        const newUser = await fetch("https://m2-rede-social.herokuapp.com/api/users/follow/", {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ "following_users_uuid": id })
        })
            .then(res => res.json())
            .then(res => {
    
                return res
            })

    }

}

