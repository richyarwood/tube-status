import './style.scss'
import './app.js'

const lastUpdated = document.querySelector('.updated')
const tubeLines = document.querySelector('.tube-lines')

function loadTubeLines(){
  fetch('https://api.tfl.gov.uk/line/mode/tube/status')
    .then(res => res.json())
    .then(data => {
      tubeLines.innerHTML = ''
      data.forEach(line => {
        tubeLines.innerHTML +=
        `<div>
          <h2 class=${line.name}>${line.name}</h2>
          <p>${line.lineStatuses[0].statusSeverityDescription}</p>
          <hr>
        </div>`
      })
    })
  // Sets the time on refresh and updates the time updated
  const time = new Date()
  lastUpdated.innerText = `Last updated: ${time.getHours()}:${time.getMinutes()<10 ? '0'+time.getMinutes() : time.getMinutes()}`
}

setInterval(loadTubeLines, 300000)
loadTubeLines()
