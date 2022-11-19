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
        plottingBar(data);
        plottingDeathsLine(data);
        plottingCasesLine(data);
        plottingTestsLine(data);
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
function plottingBar(data){
    var cases = {
        type: 'bar',
        x: getTimeinHours(data),
        y: getCases(data),
        name:'Cases',
        line:{
            color: 'rgb(255, 0, 0)',
            width: 2
        }
    };
    var deaths = {
        type: 'bar',
        x: getTimeinHours(data),
        y: getDeaths(data),
        name:'Deaths',
        line:{
            color: 'rgb(0, 255, 0)',
            width: 2
        }
    };
    var tests = {
        type: 'bar',
        x: getTimeinHours(data),
        y: getTests(data),
        name:'Tests',
        line:{
            color: 'rgb(0, 278, 255)',
            width: 2
        }
    };
    var layout = {
        xaxis: {range: [1, 12, 1],title: 'Time in hours'},
        yaxis: {title: 'Cases, deaths and tests'},
        title: "Covid 19 History"
    }
    var input = [cases, tests, deaths]
    Plotly.newPlot('barchart', input, layout);
    
}
function plottingDeathsLine(data){
    var deaths = {
        type: 'line',
        x: getTimeinHours(data),
        y: getDeaths(data),
        line:{
            color: 'rgb(0, 255, 0)',
            width: 2
        }
    };
   
    var layout = {
        xaxis: {title: 'Time in hours'},
        yaxis: {title: 'Number of Deaths'},
        title: "Deaths"
    }
    var input = [deaths];

    Plotly.newPlot('deaths', input, layout);
}
function plottingCasesLine(data){
    var cases = {
        type: 'line',
        x: getTimeinHours(data),
        y: getCases(data),
        line:{
            color: 'rgb(255, 0, 0)',
            width: 2
        }
    };
    
    var layout = {
        xaxis: {title: 'Time in hours'},
        yaxis: {title: 'Number of Cases'},
        title: "Cases"
    }
    var input = [cases]
    Plotly.newPlot('cases', input, layout);
}
function plottingTestsLine(data){
    
    var tests = {
        type: 'line',
        x: getTimeinHours(data),
        y: getTests(data),
        line:{
            color: 'rgb(0, 278, 255)',
            width: 2
        }
    };
    var layout = {
        xaxis: {title: 'Time in hours'},
        yaxis: {title: 'Number of Tests'},
        title: "Tests"
    }
    var input = [tests]
    Plotly.newPlot('tests', input, layout);
}