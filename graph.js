const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fcb468bc74msh2bb690a5d87a957p1b39a4jsn41a7bcb8ae79',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

fetch('https://covid-193.p.rapidapi.com/history?country=usa&day=2020-06-02', options)
	.then(response => response.json())
	.then((data) => {
        data = data.response
        // getPlottingData(data);
        plotting(data);
        // console.log("Tests", getTests(data))
        // console.log("Deaths", getDeaths(data))
        // console.log("Cases", getCases(data))
        // getTests(data)
    })
	.catch(err => console.error(err));

function getTimeinHours(data){   
    let hours = [];
    data.map((values) => {
        let stringTime = values.time
        //const time = new Date(stringTime).getUTCHours();
        const time = new Date(stringTime).toLocaleTimeString('en',
                { timeStyle: 'short', hour12: false, timeZone: 'UTC' });

        hours.push(time);
    }) ;

    return hours.sort();
}
function getCases(data){   
    let cases = [];
    data.map((values) => {
        cases.push(values.cases.total);
    });
    return cases;
}
function getDeaths(data){   
    let deaths = [];
    data.map((values) => {
        deaths.push(values.deaths.total);
    });
    return deaths;
}
function getTests(data){   
    let tests = [];
    data.map((values) => {
        tests.push(values.tests.total);
    });
    return tests;
}
function getMin(data){
    cases = Math.min(...getCases(data));
    deaths = Math.min(...getDeaths(data));
    tests = Math.min(...getTests(data));
    inputData = [cases, deaths, tests]
    return Math.min(...inputData);
}
function getMax(data){
    cases = Math.max(...getCases(data));
    deaths = Math.max(...getDeaths(data));
    tests = Math.max(...getTests(data));
    inputData = [cases, deaths, tests]
    return Math.max(...inputData);
}
function plotting(data){
    var cases = {
        type: 'line',
        x: getTimeinHours(data),
        y: getCases(data),
        // mode:'lines',
        name:'Cases',
        line:{
            color: 'rgb(255, 0, 0)',
            width: 2
        }
    };
    var deaths = {
        type: 'line',
        x: getTimeinHours(data),
        y: getDeaths(data),
        // mode:'lines',
        name:'Deaths',
        line:{
            color: 'rgb(0, 255, 0)',
            width: 2
        }
    };
    var tests = {
        type: 'line',
        x: getTimeinHours(data),
        y: getTests(data),
        // mode:'lines',
        name:'Tests',
        line:{
            color: 'rgb(0, 278, 255)',
            width: 2
        }
    };
    var layout = {
        xaxis: {range: [1, 12, 1],title: 'Time in hours'},
        yaxis: {title: 'Cases, deaths and tests'},
        title: "Covid 19 History", 
    }
    var input = [cases, tests, deaths]
    Plotly.newPlot('chart', input, layout);
}