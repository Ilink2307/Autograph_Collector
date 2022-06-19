let personalStatisticsButtonIsPressed = false;

async function showPersonalStatistics(elementId) {
    if(personalStatisticsButtonIsPressed === true) {
        personalStatisticsButtonIsPressed = false;
    } else {
        console.log("se face get la statistici")
        let url = 'http://localhost:8081/user-statistics';
        await getUserStatisticsCall(url);
        personalStatisticsButtonIsPressed = true;
    }

    document.getElementById(elementId).classList.toggle("show");
}

async function getUserStatisticsCall(url) {
    try {
        //probabil trimitem in body emailul userului sau ceva identificator
        //momentan se face la user 1
        let responseBody = await sendPersonalStatisticsRequest(url)
        document.getElementById("usersNumberOfAutographs").innerHTML = responseBody.numberOfAutographs;
        document.getElementById("usersMostValuableAutographsAuthor").innerHTML = responseBody.mostValuableAutographsAuthorsName;
        document.getElementById("usersMostValuableAutographsValue").innerHTML = responseBody.mostValuableAutographsPoints;
        document.getElementById("usersMostTotalValue").innerHTML = responseBody.totalValueOfAutographs;
        document.getElementById("usersMostFrequentAuthor").innerHTML = responseBody.mostFrequentAuthor.authorName;
        document.getElementById("usersMostFrequentAuthorCount").innerHTML = responseBody.mostFrequentAuthor.number;
        document.getElementById("firstAuthor").innerHTML = responseBody.topThreeMostValuableAutographsData.firstAuthor;
        document.getElementById("secondAuthor").innerHTML = responseBody.topThreeMostValuableAutographsData.secondAuthor;
        document.getElementById("thirdAuthor").innerHTML = responseBody.topThreeMostValuableAutographsData.thirdAuthor;

    } catch (error) {
        console.error(error)
    }

}

async function sendPersonalStatisticsRequest(url) {
    let responseBody;
    await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    }).then(response=>response.json())
        .then(data=>{responseBody = data;})
        .catch(err => console.error(err));
    return responseBody;
}

function showGlobalStatistics(elementId) {
    document.getElementById(elementId).classList.toggle("show");
}
