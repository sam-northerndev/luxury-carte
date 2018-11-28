let addBasket = (event) => {
    //get the parent of row of the clicked button
    let parent = event.closest("tr");
    //Get the food item name
    let item = parent.firstElementChild.innerHTML;
    console.log(item)
    //Send the item to the server to be stored in the session
    let xhr = new XMLHttpRequest();
    //open the request object
    xhr.open('GET', '/addToBasket', true);
    //on sucess log that the item has been added
    xhr.onload = () => {
        console.log("Item added succesfully")
    };
    xhr.send(item);
}
