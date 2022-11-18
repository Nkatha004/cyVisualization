const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fcb468bc74msh2bb690a5d87a957p1b39a4jsn41a7bcb8ae79',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

fetch('https://covid-193.p.rapidapi.com/statistics', options)
    .then(response => response.json())
    .then((data) => {
        data = data.response;

        document.getElementById("table_body").innerHTML = addData(data);
    }).catch(err => console.error(err));

fetch('https://covid-193.p.rapidapi.com/countries', options)
    .then(response => response.json())
    .then((countries) => {
        countries = countries.response
        let names = ""

        countries.map((values) => {
            names += 
            `<option value = ${values}>`
        })
        document.getElementById("countries").innerHTML = names;
    })
    .catch(err => console.error(err));

function addData(data){
    let tableData = "";
    
    data.map((values) => {
        tableData += 
        `<tr>
            <td>${values.continent}</td>
            <td id = "country_name">${values.country}</td>
            <td>${values.population}</td>
            <td>${values.day}</td>
            <td><i>Total: </i>${values.cases.total}<br/><i>New: </i>${values.cases.new}<br/><i>Active: </i>${values.cases.active}<br/>
            <o>Critical: </o>${values.cases.critical}<br/><i>Recovered: </i>${values.cases.recovered}
            <br/><i>1M Pop: </i>${values.cases['1M_pop']}</td>
            <td><i>Total: </i>${values.deaths['total']}<br/><i>New: </i>${values.deaths['new']}<br/><i>1M pop: </i>${values.deaths['1M_pop']}</td>
            <td><i>Total: </i>${values.tests['total']}<br/><i>1M pop: </i>${values.tests['1M_pop']}</td>
            <td>${values.time}</td>
        </tr>`;
    });
    return tableData;
}

function filterRecords(){
    var country = document.getElementById("country").value;
    filteredData = []
    fetch('https://covid-193.p.rapidapi.com/statistics', options)
        .then(response => response.json())
        .then((data) => {
            data = data.response;
            
            if(country == ''){
                for(const key in data){
                    filteredData.push(data[key])
                }
            }
            for(const key in data){
                if(data[key].country == country){
                    filteredData.push(data[key])
                    
                }
            }
            document.getElementById("table_body").innerHTML = addData(filteredData)
        }).catch(err => console.error(err));
       
}