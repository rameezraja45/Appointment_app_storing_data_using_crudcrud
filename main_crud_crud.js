function SaveToLocalStorage(event)
{
    event.preventDefault();
    const NAME=event.target.name.value;
    const EMAIL=event.target.email.value;


    const object={
        NAME,
        EMAIL,
    
    }

    axios.post("https://crudcrud.com/api/e49b3024ebfe482e82ca8a6118e71877/AppointmentData",object)
    .then((response)=>{
        ShownUserOnScreen(response.data)
        //console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    //localStorage.setItem(object.NAME,JSON.stringify(object));

    // ShownUserOnScreen(object)
    
}
function ShownUserOnScreen(user)
{
    const parentNode=document.getElementById('ListOfUser')  

    const childHTML=`<li> ${user.NAME} - ${user.EMAIL} </li>`
    //parentNode.innerHTML=childHTML;
    parentNode.innerHTML=parentNode.innerHTML+childHTML; 
}
