$("form").submit((e) =>{
    e.preventDefault()
})
$("form").on("submit",()=>{
    if($("input")[0].value===$("input")[1].value){
        //console.log($("input"))
        var dataObject={}
        dataObject.username = $("input")[0].value
        dataObject.password= $("input")[1].value
        console.log("data object")
        $.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",dataObject,()=>{
            alert("Login Successful")
            location.replace("./index.html")
            localStorage.setItem("loginStatus",true)
        }).fail(()=>{
            alert("Api post failed...still redirecting to main page")
            location.replace("./index.html")
            localStorage.setItem("loginStatus",true)
        })
    }
    else{
        alert("Please enter  valid credentials")
    }
})