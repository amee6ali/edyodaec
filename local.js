if(localStorage.getItem("loginStatus")){
    var status = localStorage.getItem("loginStatus")
    if(!JSON.parse(status)){
        //local sorage 
        location.replace("./login.html")
        console.log("in if")
    }
}
else{
    location.replace("./login.html")
}

console.log(status)



$("#right-part > a").click(()=>{

    console.log("inside event")
    var status = localStorage.getItem("loginStatus") ? (localStorage.getItem("loginStatus")):0
    if(JSON.parse(status)){
        
        localStorage.setItem("loginStatus",false)
    }
})