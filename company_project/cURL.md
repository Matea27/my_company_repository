# cURL

Curl is a command line tool for transferring data specified with URL
syntax. Curl provides a generic, language-agnostic way to demonstrate HTTP requests and responses. Users can see the format of the request, including any headers and other parameters.

## HTTP Methods with curl
HTTP has been the most important and most frequently used protocol that curl supports. Every HTTP request contains a method. The most commonly used methods are GET, POST, PUT and DELETE.

## Getting started
In order to use HTTP methods from our sinatra application with curl, we first need to open a command promt, navigate to our company_project folder and run the following command:
``` bundle exec rerun ruby company_project_web.rb ```. Consequenlty, our sinatra application is running on localhost port 5000 and we can use the curl to excute sinatra routes.

## GET
GET method retrieves the data and its the default method when making HTTP calls with curl.
In our curl command we will use Verbose ( ``` -v ``` ), so we can  extract more information such as the resolved IP address, the port we are trying to connect to and the headers.
#### Get all companies
```bash
curl -v http://localhost:5000/companies
```
##### Get all owners
```bash
curl -v http://localhost:5000/owners
```
##### Get the company based on id
```bash
curl -v http://localhost:5000/companies/12
```
##### Get the owner based on id
```bash
curl -v http://localhost:5000/owners/13
```
##### Get the owner(s) of the company
By specifying the company id in the URL, curl will retrieve the beneficial owner(s) of the company:
```bash
curl -v http://localhost:5000/owners_companies/12
```
## POST
POST method allows us to send data to a receiving service. We use the data option ( ``` -d ```) to send the data.

###### cURL to POST a JSON data on Windows
```bash
curl -X POST -H "Content-Type:application/json" http://localhost:5000/companies -d "{\"name\":\"Maja\",\"address\":\"Viby\",\"city\":\"Aarhus\",\"country\":\"Denmark\",\"email\":\"maja\gmail.com\",\"phone_number\":9272}"
```
After the command is executed, the new company is created and sent to the server.
Additionaly, when we want to send a larger amount of data, it is better to use a data file.

###### Add beneficial owner(s) of the company
```bash
curl -X POST -H "Content-Type:application/json" http://localhost:5000/owners -d "{\"name\":\"Matea\",\"surname\":\"Hron\",\"company_id\":12}"
```
## PUT
PUT method is used when we want to update an existing data and send the new version to a receiving service.

```bash
curl -X PUT -H "Content-Type:application/json" http://localhost:5000/companies/12 -d "{\"name\":\"Grancio\",\"address\":\"Skejby\",\"city\":\"Aarhus\",\"country\":\"Denmark\",\"email\":\"grancio@gmail.com\",\"phone_number\":9272}"
```

## DELETE
DELETE method is used when we want to delete the specific data by specifying the id in the url.
```bash
curl -X DELETE  http://localhost:5000/companies/12
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
