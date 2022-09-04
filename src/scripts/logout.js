class Event{
    static AddEvent(){
        let LogoutBtn = document.querySelector(".logoutBtn")
        LogoutBtn.addEventListener("click", ()=>{
            localStorage.clear()
            window.location.assign("../pages/Homepage.html");
        })
    }
}

Event.AddEvent()