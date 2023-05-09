const key = "ya29.a0AWY7CkmHZL5F1fdNNkcOk_dIc9t2F1iuu4wKbVVsM8CW48jYiHV2a8UTuKbq50bpD9aHPQx4HbzSh90_sSdF2Kob8eJmmYcmU9NPkYtKpi6B_pL_Xu_3gevtMhyhWRnW-ppLStlxkMcUWHIhbxaW3XU8sORjDoNLaCgYKAUQSARMSFQG1tDrpRIKSZsaaHgpjzzkPdg_uKA0167"

const addCommentSubmit = document.getElementById('add-comment-submit')
const loginSubmit = document.getElementById('login-submit')
const submitNewPost = document.getElementById('submit-new-post')
const searchButton = document.getElementById('search-button')
const createAccountSubmit = document.getElementById('create-account-submit')
const logoutButton = document.getElementById('logout')

async function getCloudImage(){
    let request = await fetch("https://storage.googleapis.com/storage/v1/b/inventor-website-123321/o",{
        method:"GET",
        mode: "cors",
        headers:{
            "Authorization": "Bearer "+key
        }
    })
    let data = await request.json
    console.log(data)
    let image = document.getElementById("post-image")
    image.src = data.items[0].mediaLink
}
//getCloudImage()

async function postInvention(){
    try{
        let account = await fetch("/api/posts",{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                title: document.getElementById("new-title").value,
                description: document.getElementById("new-desc").value,
                tag_id: parseInt(document.getElementById("new-tag").value)
            })
        })
    }catch(err){
        // display error message
        console.log(err)
    }
}
async function postCloudImage(){
    const file = document.getElementById('new-image').files[0]
    //console.log(file)
    let blob = file.slice(0, file.size, file.type)
    //console.log(blob)
    newFile = new File([blob], file.name, {type:file.type})
    //console.log(newFile)

    let formData = new FormData()
    formData.append('imgfile', newFile)
    console.log(formData)
    try{
        let request = await fetch("/new-post",{
            method:"POST",
            mode: "cors",
            body:formData
        })
        .then(res=>res.text())
        .then(x=>console.log(x))
    }catch(err){

    }
    
}

async function createAccount(){
    try{
        let account = await fetch("/signup",{
            method:"POST",
            body:{
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }
        })
    }catch(err){
        // display error message
        console.log(err)
    }
    
}
async function signIn(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log("email: "+email)
    console.log("password: "+password)
    try{
        let account = await fetch("/api/users/login",{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: email,
                password: password
            })
        })//.catch(err=>console.log("Error message: "+err))
        if(account.ok){
            console.log("ok")
            document.location.replace("/dashboard")
        }
    }catch(err){
        // display error message
        
    }
    
}
async function submitComment(){
    try{
        let account = await fetch("/comments",{
            method:"POST",
            body:{
               category: document.getElementById("add-comment-tag").value,
               comment: document.getElementById("add-comment-submit").value
            }
        })
    }catch(err){
        // display error message
        
    }
}
async function searchPosts(){
    try{
        let account = await fetch("/api/post",{
            method:"GET",
            body:{
                name: document.getElementById("search-key").value,
                tag: document.getElementById("search-tag").value
            }
        })

    }catch(err){
        // display error message
        
    }
}
async function createAccount(){
    let email = document.getElementById('email').value
    console.log("email: "+email)
    let password = document.getElementById('password').value
    console.log("password: "+password)
    let confirmPassword = document.getElementById('confirm-password').value
    // checks if both passwords are correct
    if(password!=confirmPassword){
        return
    }
    try{
        let account = await fetch("/api/users/signup",{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                name: email,
                email: email,
                password: password
            })
        }).catch(err=>console.log(err))
        console.log("Account created.")
    }catch(err){
        // display error message
        console.log(err)
    }
}
async function logout(){
    try{
        let account = await fetch("/api/users/logout",{
            method:"POST",
        })
        
    }catch(err){
        // display error message
        console.log(err)
    }
}

if(addCommentSubmit){
    addCommentSubmit.onclick = submitComment
}
if(loginSubmit){
    loginSubmit.onclick = signIn
}
if(submitNewPost){
    submitNewPost.onclick = postInvention
}
if(searchButton){
    searchButton.onclick = searchPosts
}
if(createAccountSubmit){
    createAccountSubmit.onclick = createAccount
}
if(logoutButton){
    logoutButton.onclick = logout
}