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
//getCloudImage()
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
document.getElementById('submit-new-post').onclick = postCloudImage
async function createAccount(){
    try{
        let account = await fetch("/signup",{
            method:"POST",
            body:{
                username: document.getElementById("username").value,
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