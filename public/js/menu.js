let addBasket = (event) => {
    //If open, close the basket
    $('#basket-dropdown').hide();
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

let removeBasket = (event) => {
    //Get the parent of clicked item 
    let parent = event.closest("tr");
    //get the food item name
    let item = parent.firstElementChild.innerHTML;
    //send the item to the server to remove from the basket
    let xhr = new XMLHttpRequest();
    //open the request
    xhr.open('POST', '/removeFromBasket', true);
    //set the request header
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //send item to server
    xhr.send("item="+ item);
    //remove the item from the table
    parent.remove();
}

let openBasket = () => {
    if($('#basket-dropdown').is(":hidden")) {
        //Request basket contents from the server
        let xhr = new XMLHttpRequest();
        // Set the request header
        let contents;  
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                contents = JSON.parse(xhr.responseText);
                 //Populate the basket div with up to 5 items
                let basket = $("#basket-contents");
                basket.html("");
                //Create the table in the div
                let len = 4;
                if (contents.length < len) {
                    len = contents.length;
                }
                for (let i = 0; i < len; i++) {
                    let row = document.createElement('tr');
                    let item = document.createElement('td');
                    let close = document.createElement('td');
                    let itemData = document.createTextNode(contents[i]);
                    let closeNode = document.createElement('i');
                    closeNode.setAttribute('class', 'material-icons remove');
                    let closeData = document.createTextNode("close");
                    
                    close.onclick = (event) => {
                        removeBasket(event.target);
                    };
                    closeNode.appendChild(closeData);
                    item.appendChild(itemData);
                    close.append(closeNode);
                    row.appendChild(item);
                    row.appendChild(close);
                    basket.append(row);
                }
            }
        }
        //Send to the server
        xhr.open("GET", '/requestBasket', true);
        xhr.send();

        //display hidden basket div
        $('#basket-dropdown').fadeIn();
    }
    else {
        $('#basket-dropdown').fadeOut();
        
    }

}