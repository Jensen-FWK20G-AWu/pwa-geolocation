console.log('Geolocation demo');

const geoButton = document.querySelector('#geoButton')
const statusElement = document.querySelector('.status')

geoButton.addEventListener('click', () => {
	if( 'geolocation' in navigator ) {
		// console.log('We have location');
		statusElement.innerText = 'Fetching position...'
		navigator.geolocation.getCurrentPosition(
			onSuccess,
			error => {
				statusElement.innerHTML = 'Sorry! Something went wrong.'
					+'<br>' + error.message
			}
		)
	} else {
		console.log('No location');
		statusElement.innerText = "Sorry, I don't know how to do that."
	}
})

async function onSuccess(pos) {
	statusElement.innerText = 'Got position, looking for address...'
	console.log('Current position is:', pos);
	const address = await lookupPosition(pos.coords.latitude, pos.coords.longitude)
	if( address ) {
		showAddress(address)
	}
}
async function lookupPosition(lat, lon) {
	try {
		const response = await fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
		const data = await response.json()
		if( data.error ) {
			statusElement.innerHTML = "Couldn't get position<br>" + data.error.message
		return null
		}
		console.log(data);
		return data
	} catch(error) {
		statusElement.innerHTML = "Couldn't get position<br>" + error.message
		return null
	}
}

function showAddress(address) {
	statusElement.innerHTML = `${address.country} <br>${address.city} <br>${address.staddress}`
}