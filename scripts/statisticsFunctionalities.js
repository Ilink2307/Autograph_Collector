let personalStatisticsButtonIsPressed = false;
let firstGlobalStatisticButtonIsPressed = false;

async function showPersonalStatistics(elementId) {
    if(personalStatisticsButtonIsPressed === true) {
        personalStatisticsButtonIsPressed = false;
    } else {
        let url = 'http://localhost:8081/user-statistics';
        await getUserStatisticsCall(url);
        personalStatisticsButtonIsPressed = true;
    }

    document.getElementById(elementId).classList.toggle("show");
}

async function showTopThreeUsersByValue(elementId) {
    if(firstGlobalStatisticButtonIsPressed === true) {
        firstGlobalStatisticButtonIsPressed = false;
    } else {
        let url = 'http://localhost:8081/global-statistics-1';
        await getFirstGlobalStatisticCall(url);
        firstGlobalStatisticButtonIsPressed = true;
    }

    document.getElementById(elementId).classList.toggle("show");
}

async function getFirstGlobalStatisticCall(url) {
    try {
        let responseBody = await sendFirstGeneralStatisticRequest(url);
        document.getElementById("firstGSUsername1").innerHTML = responseBody.firstUser.username;
        document.getElementById("firstGSUsername2").innerHTML = responseBody.secondUser.username;
        document.getElementById("firstGSUsername3").innerHTML = responseBody.thirdUser.username;

        document.getElementById("firstGSPoints1").innerHTML = responseBody.firstUser.pts;
        document.getElementById("firstGSPoints2").innerHTML = responseBody.secondUser.pts;
        document.getElementById("firstGSPoints3").innerHTML = responseBody.thirdUser.pts;
        console.log(responseBody)

    } catch (error) {
        console.error(error)
    }
}

async function sendFirstGeneralStatisticRequest(url) {
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

async function getUserStatisticsCall(url) {
    try {
        //vom lua id user din authentication header sau file dupa ce il facem
        //momentan se face la user 1

        let responseBody = await sendPersonalStatisticsRequest(url);
        console.log(responseBody)
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

async function getJson() {
    let url = 'http://localhost:8081/user-statistics';
    let div = document.getElementById("dynamicStats");
    let responseBody = await sendPersonalStatisticsRequest(url);

    let object;
    object = {
        numberOfAutographs: responseBody.numberOfAutographs,
        mostValuableAutographsAuthorsName: responseBody.mostValuableAutographsAuthorsName,
        mostValuableAutographsPoints: responseBody.mostValuableAutographsPoints,
        totalValueOfAutographs: responseBody.totalValueOfAutographs,
        mostFrequentAuthor: responseBody.mostFrequentAuthor.authorName,
        top1MostValuableAutographsAuthor: responseBody.topThreeMostValuableAutographsData.firstAuthor,
        top2MostValuableAutographsAuthor: responseBody.topThreeMostValuableAutographsData.secondAuthor,
        top3MostValuableAutographsAuthor:responseBody.topThreeMostValuableAutographsData.thirdAuthor
    }

    div.innerHTML = JSON.stringify(object);
}

async function getCsv() {
    let url = 'http://localhost:8081/user-statistics';
    let div = document.getElementById("dynamicStats");
    let responseBody = await sendPersonalStatisticsRequest(url);

    let csv = "numberOfAutographs,mostValuableAutographsAuthorsName,mostValuableAutographsPoints,totalValueOfAutographs,mostFrequentAuthor,top1MostValuableAutographsAuthor: responseBody.topThreeMostValuableAutographsData.firstAuthor,top2MostValuableAutographsAuthor,top3MostValuableAutographsAuthor<br>";
    csv += responseBody.numberOfAutographs +','+ responseBody.mostValuableAutographsAuthorsName +','+
        responseBody.mostValuableAutographsPoints +','+ responseBody.totalValueOfAutographs +','+
        responseBody.mostFrequentAuthor.authorName +','+ responseBody.topThreeMostValuableAutographsData.firstAuthor +','+
        responseBody.topThreeMostValuableAutographsData.secondAuthor +','+ responseBody.topThreeMostValuableAutographsData.thirdAuthor;
    div.innerHTML = csv;
}

