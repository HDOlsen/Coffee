
// http://dc-coffeerun.herokuapp.com/api/coffeeorders/

$(document).ready(function(){

//Declarations

    let searchBox = $("#searchBox")
    let btnAdd = $("#btnAdd")
    let coffeeList = $("#coffeeList")
    let coffee = []
    let users = [] 
    var searchList = $("#searchList")
    let btnFind = $("#btnFind")
    let message = $("#message")
    let btnEnter = $("#btnEnter")
    let emailBox = $("#emailBox")
    let coffeeBox = $("#coffeeBox")
    let deleteList = $("#deleteList")
    let btnDelete = $("#btnDelete")
    let deleteBox = $("#deleteBox")
        
//Click to find order

    btnFind.click(function(){

        function findOrder(orderSearch) {
            console.log(orderSearch)
            fetch(`http://dc-coffeerun.herokuapp.com/api/coffeeorders/${orderSearch}`,{})
            .then(function(response) {
                
                response.json().then(function(order){
                    console.log(order)
                    let search = `<div>
                        <h4>${order.emailAddress}</h4>
                        <p>${order.coffee}</p>
                        </div>`
                    searchList[0].innerHTML += search
                })
             })
            }
                    findOrder(searchBox[0].value)
        })

//Click for all Orders

    console.log(btnFind)
    btnAdd.click(function(){

        fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/')
        .then(function(response){
            return response.json() })
        .then(function(myJson){
            console.log(myJson)
            var usersObj = myJson
            
            for(userEmail in usersObj){
                theUser = usersObj[userEmail]
                users.push(theUser)
                console.log(userEmail, theUser)
                console.log(users) //testing item

                var elementString = `<div >
                                        <h4>${theUser.emailAddress}</h4>
                                        <p>${theUser.coffee}</p>
                                        </div>`
                coffeeList[0].innerHTML += elementString
                console.log(coffeeList)
            }
        })
    })

//Click to create order

    btnEnter.click(function(){

        function createOrder(createEmail, createCoffee) {
            console.log(createEmail, createCoffee)
            let createdOrder = {
                emailAddress: createEmail,
                coffee: createCoffee
            }
            fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/',{
                 method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(createdOrder)
        })
            .then(function(response) {
                console.log(response)
                return response.json()
                .then(function(json){
                    console.log(json)
                    message[0].innerHTML += '<p>"Your order has been received!"</p>'
                })
            })
        }
            createOrder(emailBox[0].value, coffeeBox[0].value)
})})

//Click to delete order
    console.log(btnDelete)
    btnDelete.addEventListener("click", function(){
        console.log('Testing...')
       fetch(`http://dc-coffeerun.herokuapp.com/api/coffeeorders/${deleteBox.value}`,{
            method: 'DELETE'
            }).then(function(){
                deleteList.innerHTML += '<p>"Your order has been cancelled!"</p>'
            })
        })