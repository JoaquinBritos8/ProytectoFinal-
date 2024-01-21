const mensajeError = document. getElementsByClassName("error")[0];


document.getElementById("register-form"). addEventListener("submit", async (e)=>{
    e.preventDefault();
    console.log(e.target.children.user.value)
    const res= await fetch("http://locashost:5500/api/register", {
       method:"POST",
       headers:{
        "Content-Type" : "application/json"
       },
       body: JSON.stringify({
         user: e.target.children.user.value,
         email: e.target.children.email.value,
         passwowrd: e.target.children.passwowrd.value
       })
    });
    if(!res.ok) return mensajeError.classList.toggle("escondido", false ); 
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})