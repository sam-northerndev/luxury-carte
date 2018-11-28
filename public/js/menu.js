let addBasket = (event) => {
    //get the parent of row of the clicked button
    let parent = event.closest("tr");
    //Get the food item name
    let item = parent.firstElementChild.innerHTML;
    console.log(item)
    //Send the item to the server to be stored in the session
    let xhr = new XMLHttpRequest();
    //open the request object
    xhr.open('POST', '/addToBasket', true);
    // Set the request header
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Send the item to the server
    xhr.send("item="+ item);
}

let openBasket = (event) => {
    if($('#basket-dropdown').is(":hidden")) {
         //Request basket contents from the server
         
        //display hidden basket div
        $('#basket-dropdown').fadeIn();
    }
    else {
        $('#basket-dropdown').fadeOut();
        
    }

}