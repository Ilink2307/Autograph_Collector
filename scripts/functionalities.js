function openDropdown(elementId) {
    alert("sa apasat pe buton");
    document.getElementById(elementId).classList.toggle("show");
}

window.onload = async function() {
    await refreshAutographs();
}

async function refreshAutographs() {
    let url = 'http://localhost:8081/main-get';
    let autographArray = await getRequestAutographArray(url);
    displayAutographs(autographArray);
}

async function getRequestAutographArray(url) {
    try {
        let responseBody

        await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain'
            }
        }).then(response=>response.json())
            .then(data=>{
                responseBody = data;
            })
            .catch(err => {console.error(err); alert(err)});
        return responseBody;

    } catch (error) {
        console.error(error);
        return "main api call failed";
    }
}

function displayAutographs(autographArray) {
    for(let i = 0; autographArray[i]; ++i) {
        let index = i+1;
        let newLi = document.createElement("li");
        newLi.setAttribute("class","autograph_element");

        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "autograph_dropdown");

        let autoButton = document.createElement("button");
        autoButton.setAttribute("class", "autograph_btn");
        let customDetailsID = "autographDetails" + index;
        let customFunctionCall = "openDropdown('" + customDetailsID + "')";
        autoButton.setAttribute("onClick", customFunctionCall);

        let innerText;
        if(index === 1){
            innerText = "Your first autograph";
        } else if(index === 2) {
            innerText = "Your second autograph";
        } else if(index === 3) {
            innerText = "Your second autograph";
        } else {
            innerText = "Your " + index + "th autograph"
        }

        autoButton.innerHTML = innerText;

        let secondDiv = document.createElement("div");
        secondDiv.setAttribute("id", customDetailsID);
        secondDiv.setAttribute("class", "autograph_dropdown_content");

        let thirdDiv = document.createElement("div");
        thirdDiv.setAttribute("class", "a");
        thirdDiv.setAttribute("style", "width: 45%; height: 100%");

        let fourthDiv = document.createElement("div");
        fourthDiv.setAttribute("class", "autographImage");

        let img = document.createElement("img");
        img.setAttribute("class", "myImg");
        img.setAttribute("alt", "Autograph image");
        img.setAttribute("src", autographArray[i].photo);

        fourthDiv.appendChild(img);
        thirdDiv.appendChild(fourthDiv);

        let fifthDiv = document.createElement("div");
        fifthDiv.setAttribute("class", "a");
        fifthDiv.setAttribute("style", "width:45%; height: 70%");

        let sixthDiv = document.createElement("div");
        sixthDiv.setAttribute("class", "text_style");

        let br = "<br>";
        sixthDiv.innerHTML = "Personality: " + autographArray[i].author + br
            + "Value: " + autographArray[i].pts + br
            + "Date: " + autographArray[i].date + br
            + "Placed on: " + autographArray[i].item + br
            + "Moment: " + autographArray[i].moment + br
            + "Mentions: " + autographArray[i].mentions + br
            + "Tags: " + autographArray[i].tags + br;

        fifthDiv.appendChild(sixthDiv);
        secondDiv.appendChild(thirdDiv);
        secondDiv.appendChild(fifthDiv);
        newDiv.appendChild(autoButton);
        newDiv.appendChild(secondDiv);
        newLi.appendChild(newDiv);

        document.getElementById("ul_center").appendChild(newLi);
    }
}

async function addNewAutographFromMain() {
    let object = getObjectFromInputForms();
    let url = 'http://localhost:8081/new-autograph';
    await newAutographApiCall(object, url);
}

async function newAutographApiCall(object, url) {
    try {
        const newAutograph = {
            idUser: object.idUser,
            photo: object.photo,
            autographDate: object.autographDate,
            author: object.author,
            autographItem: object.autographItem,
            tags: object.tags,
            mentions: object.mentions,
            moment: object.moment
        }

        let newAutographJSON = JSON.stringify(newAutograph);

        await sendNewAutographRequest(url, newAutographJSON);

    } catch (error) {
        console.error(error)
    }
}

async function sendNewAutographRequest(url, newAutographJSON) {
    let responseBody

    await fetch(url, {
        method: 'POST',
        body: newAutographJSON,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    }).then(response=>response.json())
        .then(data=>{
            responseBody = data;
        })
        .catch(err => console.error(err));
    return responseBody;
}

function getObjectFromInputForms() {
    let object;
    let idUser = 3;
    let photo = 'p1';
    let autographDate = '08-02-12';
    let author = 'Nicki Minaj';
    let autographItem = 'sapca';
    let tags = 'cool, new, cute';
    let mentions = 'nice day';
    let moment = 'last summer';

    /*let photo = document.getElementById("autographPhoto").something to get pic
    autographDate = document.getElementById("autographDate").smth to get date
    author;
    if(!document.getElementById("autographAuthorCustom")) {
        author = document.getElementById("autographAuthorSelect").
    }*/

    object = {
        idUser,
        photo,
        autographDate,
        author,
        autographItem,
        tags,
        mentions,
        moment
    }
    return object;
}

///////////////////////////////////////////////////////// trebuie facut curat mai jos arata groaznic

function searchBarFunction(){

}

function addCustomBar(){

}

var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}



////////////////////////////////Start tag Checkbox
var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
////////////////////////////////End tag Checkbox