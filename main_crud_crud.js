window.addEventListener("DOMContentLoaded", () => {
    // const localStorageObj = localStorage;
    // const localstoragekeys  = Object.keys(localStorageObj)
  
    // for(var i =0; i< localstoragekeys.length; i++){
    //     const key = localstoragekeys[i]
    //     const userDetailsString = localStorageObj[key];
    
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     addUser(userDetailsObj)
    // }
    axios.get("https://crudcrud.com/api/03f0ad1bf0fb427aa76708d9b966f8e4/AppointmentData")
    .then((response)=>{
        for(var i=0 ; i<response.data.length ; i++){
            addUser(response.data[i])
        }
    })
  })
  //Post Request
  
  function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    let obj = {
        name,
        email,
      }
      axios.post("https://crudcrud.com/api/03f0ad1bf0fb427aa76708d9b966f8e4/AppointmentData",obj)
      .then((response)=>{
        addUser(response.data)
        //   console.log(response.data._id)
      })
      .catch((err)=>{
        const er = document.getElementById('error');
        er.innerHTML = 'Something Went Wrong';
          console.log(err);
      })
    //   localStorage.setItem(obj.email,JSON.stringify(obj));
    //   addUser(obj);
  }
  
  //DISPLAY USER TO SCREEN 
  
  function addUser(user){
    // if(localStorage.getItem(user.email)!== null){
    //     removeUser(user.email);
    // }
    
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name}- ${user.email}
    <button class="editbtn" onCLick=editUser('${user.name}','${user.email}','${user._id}')>Edit</button>
    <button class="deletebtn" onCLick=deleteUser('${user._id}')>X</button>
     
    </li>`;
    parentNode.innerHTML =  parentNode.innerHTML + childHTML;
  }
  
  ///DELETE USER FROM SERVER 
  
  function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/03f0ad1bf0fb427aa76708d9b966f8e4/AppointmentData/${userId}`)
    .then((response)=>{
    removeUser(userId)
    })
    .catch((err) => {
        console.log(err)
    })
  }
  
  //Deleting USER FROM SCREEN 
  
  function removeUser(userId){
    const parentNode = document.getElementById('listOfUsers');
    const deletingChildNode = document.getElementById(userId);
    if(deletingChildNode){
        parentNode.removeChild(deletingChildNode);
    }
  }  
  
  //EDIT USER 
  
  function editUser(name,emailId,userId){
    document.getElementById('username').value = name;
    document.getElementById('emailId').value = emailId;
    deleteUser(userId);
  }