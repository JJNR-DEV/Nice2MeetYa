'use stricts'

$("#create-contact").click(function() {
	var $this = $(this),
	    href = $this.attr("href");

	$(document.body).load(href);

	location.href = "#" + href;
});

function createContact(e){
	if(typeof(Storage) !== "undefined"){
		
		const contactName = document.getElementById('contact-name').value
		const contactCompany = document.getElementById('company-name').value
		const contactEmail = document.getElementById('email-address').value

		const fullContact = {
			"Name": contactName,
			"Email": contactEmail,
			"company": contactCompany,
			"sentEmail": 0
		}

		var existingEntries = JSON.parse(localStorage.getItem("allContacts"))
	    
	    if(existingEntries == null){
	    	existingEntries = []
	    }

	    localStorage.setItem("Latest Company", JSON.stringify(fullContact))
	    // Save allEntries back to local storage
	    existingEntries.push(fullContact)

	    localStorage.setItem("allContacts", JSON.stringify(existingEntries))

		document.getElementById('confirmation').innerHTML = '<i class="fas fa-check-circle" id="done" style="font-size: 48px;"></i>'
	}

}

function displayContacts(){
	if(localStorage.getItem("allContacts") !== null){
		let fullList = JSON.parse(localStorage.getItem("allContacts"))

		for(var i in fullList){

			let values = ''
			if(fullList[i].sentEmail === 0){
				values = "<div class='contact'><i class='far fa-envelope' onclick='sendEmail(this)'></i>&nbsp&nbsp&nbsp&nbsp&nbsp" +  fullList[i].Name + " from " + fullList[i].company + " " + fullList[i].Email
			}
			else{
				values = "<div class='contact'><i class='fas fa-check'  onclick='sendEmail(this)'></i>&nbsp&nbsp&nbsp&nbsp&nbsp" + fullList[i].Name + " from " + fullList[i].company + " " + fullList[i].Email
			}

			const contacts = document.getElementById("contact-list").innerHTML

			document.getElementById("contact-list").innerHTML = contacts + values
		}
	}
}

displayContacts()

function sendEmail(e){

	//if there are email logos
	if(e){
		let name = new Array
		let email = new Array
		let context = e.parentElement.innerText			
		let data = context.slice(5)
		var words = data.split(' ');

		name = words[0]

		email = words[words.length - 1]

		let surname = words[1] === 'from'
		let company = words.length - 2
		let emailCorp = "Hi " + name + ", My name is Jose Rodrigues, we spoke during the Silicon Milkroundabout event and it was a pleasure to meet you, I hope to hear from you soon! Meanwhile if you need any other information from me, here is a link to my website: www.jjnrodrigues.com, but please don't hesitate to send me an email. All the best!"
		
		window.open('mailto:' + email + '?subject=Silicon Milkroundabout&body=' + emailCorp)
	
		const svg = '<svg class="svg-inline--fa fa-check fa-w-16" onclick="sendEmail()" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>'

		if(!surname){
			e.innerHTML = svg + "<!-- <i class='fas fa-check' onclick='sendEmail()'></i> -->&nbsp&nbsp&nbsp&nbsp&nbsp" + words[0] + " " + words[1] + " from " + words[company] + " " + email
			console.log(e)
		}
		else{
			e.innerHTML = svg + "<!-- <i class='fas fa-check' onclick='sendEmail()'></i> -->&nbsp&nbsp&nbsp&nbsp&nbsp" + words[0] + " from " + words[company] + " " + email
			console.log(e)
		}
							
		let existingEntries = JSON.parse(localStorage.getItem("allContacts"))
		console.log(words[company])
		let index
		for(var i in existingEntries){
			console.log(existingEntries[i].company)
			if(existingEntries[i].company === words[company]){
				index =	i
			}
		}

		if(existingEntries == null){
			existingEntries = []
		}
	
		existingEntries[index].sentEmail = 1	


		localStorage.setItem("allContacts", JSON.stringify(existingEntries));			
		
	}
	
}
