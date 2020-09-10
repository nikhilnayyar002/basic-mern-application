# MERN Example

<br>

**Live URL:** Not live now!

<br>

## Setup

* Define the mongodb database url in ``` src/config/config.json``` file:
    > **Note:**
    > A mongodb url is predefined in this example therefore you may specify your own if you want.

* npm install

## Running
* npm run dev

## Building
* npm run build
* npm run start

## Rest API Routes Example & Usage

```

	- register application

	POST http://localhost:3000/api/application/register
        Content-Type: multipart/form-data

            formData.append("name", "Nikhil Nayyar");
            formData.append("email", "nikhilnayyar005@gmail.com");
            formData.append("date", "2020-09-08T08:15:23.939Z");
            formData.append("country", "India");
            
            // HTML file input, chosen by user
            formData.append("resumeFile", fileInput.files[0]);



	- Apllication page

	GET http://localhost:3000/api/application/all



	- delete applciation

	POST http://localhost:3000/api/application/delete
        Content-Type: application/json

	{
        "name": "Nikhil Nayyar",
        "email":"nikhilnayyar005@gmail.com",
        "resume":"5f5787ad400fee25244eb8efPROJECT-SCHEDULE.docx",
        "date":"2020-09-08T09:02:43.152Z",
        "country":"India"
	}

```
