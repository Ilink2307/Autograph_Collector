async function showPersonalStatistics(elementId) {
    console.log("se face get la statistici")
    let url = 'http://localhost:8081/user-statistics';
    await getUserStatisticsCall(url);

    document.getElementById(elementId).classList.toggle("show");
}

async function getUserStatisticsCall(url) {
    try {
        //probabil trimitem in body emailul userului sau ceva identificator
        //momentan se face la user 1
        let responseBody = await sendPersonalStatisticsRequest(url)
        console.log("Responseul de la statistici este: " + responseBody);

        document.getElementById("numberOfAutographs").innerHTML = responseBody.numberOfAutographs;

    } catch (error) {
        console.error(error)
    }

}

async function sendPersonalStatisticsRequest(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    }).then((response) => {
        return response.json()
    }).then((res) => {
        if (res.status === 200) {
            console.log("gasite")
        }
    }).catch((error) => {
        console.log(error)
        return null;
    })

    return response;
}

function showGlobalStatistics(elementId) {
    document.getElementById(elementId).classList.toggle("show");
}
