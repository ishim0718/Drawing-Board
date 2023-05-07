const key = "ya29.a0AWY7CkmHZL5F1fdNNkcOk_dIc9t2F1iuu4wKbVVsM8CW48jYiHV2a8UTuKbq50bpD9aHPQx4HbzSh90_sSdF2Kob8eJmmYcmU9NPkYtKpi6B_pL_Xu_3gevtMhyhWRnW-ppLStlxkMcUWHIhbxaW3XU8sORjDoNLaCgYKAUQSARMSFQG1tDrpRIKSZsaaHgpjzzkPdg_uKA0167"

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
getCloudImage()
async function postCloudImage(){
    let request = await fetch("https://storage.googleapis.com/storage/v1/b/inventor-website-123321/o",{
        method:"POST",
        mode: "cors",
        body:{},
        headers:{
            "Authorization": "Bearer "+key,
            "Content-Type": "image/jpg"
        },
        body:{
            
        }
    })
}
async function createAccount(){
    try{
        let account = await fetch("http://localhost:3001/signup",{
            method:"POST",
            body:{
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }
        })
    }catch(err){
        // display error message

    }
    
}
async function signIn(){
    try{
        let account = await fetch("http://localhost:3001/login",{
            method:"POST",
            body:{
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }
        })
    }catch(err){
        // display error message
        
    }
    
}
async function submitComment(){
    try{
        let account = await fetch("http://localhost:3001/api/comment",{
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