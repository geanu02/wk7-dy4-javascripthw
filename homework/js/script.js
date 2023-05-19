const searchForm = document.getElementById('searchForm')
const tableBody = document.getElementById('tableBody')
const txtYr = document.getElementById('txtYr')
const txtRound = document.getElementById('txtRound')
let tableLoaded = false

async function getF1Data(year, round) {
    const res = await fetch(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`, {method: "GET"})
    if (res.ok) {
        const data = await res.json()
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    }
}

function transformData(racers) {
    let arr = []
    for (let i = 0; i < 7; i++) {
        let ob = {}
        ob.position = racers[i].position
        ob.points = racers[i].points
        ob.firstName = racers[i].Driver.givenName
        ob.lastName = racers[i].Driver.familyName
        ob.nationality = racers[i].Driver.nationality
        ob.sponsor = racers[i].Constructors[0].name
        ob.sponsorUrl = racers[i].Constructors[0].url
        ob.driverUrl = racers[i].Driver.url
        arr.push(ob)
    }
    console.log(arr)
    return arr
}

function fillTable(showData) {
    for (const racer of showData) {
        let tr = document.createElement('tr')        
        let th = document.createElement('th')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        let a1 = document.createElement('a')
        let a2 = document.createElement('a')
        th.innerText = `${racer.position}`
        th.scope = `${"row"}`
        a1.innerText = `${racer.firstName} ${racer.lastName}`
        a1.href = `${racer.driverUrl}`
        a1.className = "entryLink"
        td2.append(a1)
        td3.innerText = `${racer.nationality}`
        a2.innerText = `${racer.sponsor}`
        a2.href = `${racer.sponsorUrl}`
        a2.className = "entryLink"
        td4.append(a2)
        td5.innerText = `${racer.points}`
        tr.append(th, td2, td3, td4, td5)
        tableBody.appendChild(tr)   
    }
}

searchForm.addEventListener('submit', async e => {
    e.preventDefault()
    if (tableLoaded) {
        tableBody.innerHTML = ''
        tableLoaded = false
    }
    const data = await getF1Data(txtYr.value, txtRound.value)
    fillTable(transformData(data))
    tableLoaded = true
})

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
        }, false)
    })
})()