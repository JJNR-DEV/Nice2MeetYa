'use strict'

function createContact(e){
	// If browser supports local storage
	if(typeof(Storage) !== "undefined"){
		
		const contactName = document.getElementById('contact-name').value
		const contactCompany = document.getElementById('company-name').value
		const contactEmail = document.getElementById('email-address').value

		// Setting up contact object with sentEmail in 0 meaning no email has been sent yet
		const fullContact = {
			"Name": contactName,
			"Email": contactEmail,
			"company": contactCompany,
			"sentEmail": 0
		}

		var existingEntries = JSON.parse(localStorage.getItem("allContacts"))
		
		// Create empty array if no entries have been added yet
	    if(existingEntries == null){
	    	existingEntries = []
	    }

		// Setting the new contact
	    localStorage.setItem("Latest Company", JSON.stringify(fullContact))
	    existingEntries.push(fullContact)

		// Set array with all contact as JSON string to add to local storage
	    localStorage.setItem("allContacts", JSON.stringify(existingEntries))

		// Confimation of action icon
		document.getElementById('confirmation').innerHTML = '<i class="fas fa-check-circle" id="done" style="font-size: 48px;"></i>'

		// Re-direct to main page after the 3 seconds of animation
		setTimeout(function(){
			window.location.href = 'nice-to-meetya.html'
		}, 3000)
	} 
	else {
		document.getElementById('confirmation').innerHTML = 'The current browser you are using does not support Local Storage. To be able to use this, please open this app in a browser that does support Local Storage.'
	}

}

function displayContacts(){
	if(localStorage.getItem("allContacts") !== null){
		let fullList = JSON.parse(localStorage.getItem("allContacts"))

		// Go through all contacts and populate them, considering if an email has been sent already, an icon will be displayed accordingly
		for(var i in fullList){
			let values = ''
			if(fullList[i].sentEmail === 0){
				values = "<div class='contact'><i class='far fa-envelope' onclick='sendEmail(this)'></i>&nbsp&nbsp&nbsp&nbsp&nbsp" +  fullList[i].Name + " from " + fullList[i].company + " " + fullList[i].Email
			}
			else{
				values = "<div class='contact'><i class='fas fa-check'></i>&nbsp&nbsp&nbsp&nbsp&nbsp" + fullList[i].Name + " from " + fullList[i].company + " " + fullList[i].Email
			}

			const contacts = document.getElementById("contact-list").innerHTML
			document.getElementById("contact-list").innerHTML = contacts + values
		}
	}
}

// Only call this function in the main page to avoid an error in console
if(window.location.href.includes('nice-to-meetya.html')){
	displayContacts()
}

function sendEmail(e){

	// If there are email logos, then an email is yet to be send
	if(e){
		let name
		let email
		// Text content
		let context = e.parentElement.innerText		
		let data = context.slice(5)
		var words = data.split(' ');

		// Name is the first part of the content
		name = words[0]
		// Email is the last part of the content
		email = words[words.length - 1]

		// Variable used for changing the content in display only
		// Company is prior to the last element of the content
		let company = ''
		// To determine where the 'from' word is so you can collect the whole company name
		let fromIndex = 0

		for(var i = 0; i < words.length; i++){
			if(fromIndex > 0 && i > fromIndex && i <= words.length -2){
				company === '' ? company = words[i] : company = company + ' ' + words[i]
			}

			if(words[i] === 'from'){
				fromIndex = i
			}
		}

		// Change the body of the email as you see fit
		// '\r\n' - this is a paragraph
		let emailCorp = "Hi " + name + ", " + '\r\n' + '\r\n' + "My name is Jose Rodrigues, we spoke during the X event and it was a pleasure to meet you, I hope to hear from you soon! Meanwhile if you need any other information from me, here is a link to my website: www.jjnrodrigues.com, but please don't hesitate to send me an email." + '\r\n' + '\r\n' + "All the best!"
		emailCorp = encodeURIComponent(emailCorp)

		// Open the email window on your platform
		window.open('mailto:' + email + '?subject=X event&body=' + emailCorp)

		// SVG icon of check to confirm that email has been sent
		const svg = '<svg class="svg-inline--fa fa-check fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>'
		// Change the icon
		e.innerHTML = svg
							
		let existingEntries = JSON.parse(localStorage.getItem("allContacts"))
		let index
		// Find the contact you just sent an email from your Local Storage details so you can mark it as done
		for(var i in existingEntries){
			console.log(existingEntries[i].Email)
			if(existingEntries[i].Email === email){
				index =	i
			}
		}
	
		// Change the value of sentEmail to 1 representing that an email has been sent
		existingEntries[index].sentEmail = 1	
		// push the new info to your Local Storage
		localStorage.setItem("allContacts", JSON.stringify(existingEntries));				
	}
}
