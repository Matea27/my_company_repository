# Sinatra RESTful API

Sintara is a DSL for quickly creating web applications in Ruby with minimal effort and its perfect to build RESTful APIs.

## Used resources
To make the service available we will use Bundler, Sinatra and DataMapper. We will use Bundler to manage our dependencies by installing the exact gems and versions that we need. DataMapper will be used as our database and we will build RESTful resources around DataMapper models. The project uses Atom as a text editor.

## Getting started
We create a folder company_project on our computer where are all company_project source code will be placed.
```bash
mkdir company_project
```

### Installation
In order to use Bundler for our dependencies, we first have to open a terminal window and run the following command.
```bash
gem install bundler
```

### Specifying your dependencies in a Gemfile

Create a Gemfile in the root of your project directory and add all your application´s dependency to a file. At the top of the Gemfile, add a line for the Rubygems source that contains the gems listed in the Gemfile.

```bash
source 'https://rubygems.org'

gem 'rerun', '~> 0.13.0'
gem 'sinatra', '~> 2.0', '>= 2.0.8.1'
gem "json", "1.8.6"
gem 'dm-serializer', '~> 1.2', '>= 1.2.2'
gem 'sinatra-contrib', '~> 2.0', '>= 2.0.8.1'
gem 'rake'
gem 'data_mapper', '~> 1.2'
gem 'dm-core', '~> 1.2', '>= 1.2.1'
gem 'do_sqlite3', '~> 0.10.17'
gem 'dm-sqlite-adapter'
gem 'dm-timestamps', '~> 1.2'
gem 'dm-validations', '~> 1.2'
gem 'dm-aggregates', '~> 1.2'
gem 'dm-migrations', '~> 1.2'
```

### Install all of the required gems from the Gemfile
```bash
bundle install
```
After the bundle is installed, Gemfile.lock will be created in our current directory. This will allow deployment of our application to a new machine. If the user just runs $bundle install to install dependencies, bundler will put the necessary version(s) your app requires.

## Building the logic of our service
We create the file called company_project_web.rb in our project directory. In the file we first require necessary gems, set up our database and build Company and Owner object models. Furthermore, we have also set up the TCP port number 5000 and binded it with the hostname for the 127.0.0.1 IP address.
```bash
require 'sinatra'
require 'json'

set :bind, '127.0.0.1'
set :port, 5000

require 'data_mapper'

DataMapper.setup(:default,'sqlite:company.db')

class Company
  include DataMapper::Resource

  property :id, Serial
  property :name, Text, required: true
  property :address, Text, required: true
  property :city, Text, required: true
  property :country, Text, required: true
  property :email, Text, required: true
  property :phone_number, Integer, required: true

  has n, :owners
end

class Owner
  include DataMapper::Resource

  property :id, Serial
  property :name, Text, required: true
  property :surname, Text, required: true
  property :company_id, Integer, required: true

  belongs_to :company
end

 DataMapper.finalize()
 DataMapper.auto_upgrade!()

```
After all models and plugins have been loaded, we finalize Datamapper for the current repository.

## Routes
In Sinatra, a route is an HTTP method paired with a URL-matching pattern. Routes are matched in the order they are defined. Routes match the web request sent by a client to the code in our application that tells the app what data to send back to the client. Each route is associated with a block:


```bash
get ('/companies') do
  companies = Company.all
  companies.to_json
end

get ('/owners') do
  owners = Owner.all
  owners.to_json
end

post ('/companies') do
  begin
   params.merge! JSON.parse(request.env["rack.input"].read)
  rescue JSON::ParserError
   logger.error "Cannot parse request body."
  end
  new_company=Company.new
  new_company.name=params[:name]
  new_company.address=params[:address]
  new_company.city=params[:city]
  new_company.country=params[:country]
  new_company.email=params[:email]
  new_company.phone_number=params[:phone_number]
  new_company.save.to_json
  redirect('/companies')
end

post('/owners') do
  begin
   params.merge! JSON.parse(request.env["rack.input"].read)
 rescue JSON::ParserError
   logger.error "Cannot parse request body."
 end
  new_owner= Owner.new
  new_owner.name=params[:name]
  new_owner.surname=params[:surname]
  new_owner.company_id=params[:company_id]
  new_owner.save.to_json
  redirect('/companies')
end

get ('/companies/:id') do
  company= Company.get(params[:id])
  company.to_json
end

put ('/companies/:id') do
  begin
   params.merge! JSON.parse(request.env["rack.input"].read)
  rescue JSON::ParserError
   logger.error "Cannot parse request body."
  end
  company= Company.get(params[:id])
  company.name=params[:name]
  company.address=params[:address]
  company.city=params[:city]
  company.country=params[:country]
  company.email=params[:email]
  company.phone_number=params[:phone_number]
  company.save.to_json
  redirect('/companies')
end

get ('/owners/:id') do
  owner= Owner.get(params[:id])
  owner.to_json

end
put ('/owners/:id') do
  begin
   params.merge! JSON.parse(request.env["rack.input"].read)
  rescue JSON::ParserError
   logger.error "Cannot parse request body."
  end
  owner= Owner.get(params[:id])
  owner.name=params[:name]
  owner.surname=params[:surname]
  owner.save.to_json
  redirect('/companies')
end

get ('/owners_companies/:id') do
  company= Company.get(params[:id])
  owners = Owner.new
  owner_company= company.owners
  owner_company.to_json
end

delete ('/companies/:id') do
  Company.get(params[:id]).destroy.to_json
  redirect('/companies')
end

```
| HTTP VERB   |      ROUTE      |  USED FOR |
|----------|:-------------:|------:|
| GET |  '/companies'  | get all the companies  |
| GET |  '/owners'     |   get all owners |
| POST | '/companies'  |   creates new company |
| POST   |  '/owners'  | creates new owner  |
| GET   |  '/companies/:id '  | gets the company based on ID in the URL |
| PUT   | '/companies/:id'  | updates the company based on ID  |
| GET   | '/owners/:id'   | gets the owner based on ID in the URL  |
| PUT   |  '/owners/:id'  |  updates the owner based on ID |
| GET   | '/owners_companies/:id'    | gets the owner(s) of the company based on company_id |
| DELETE   |  '/companies/:id'  | deletes the company based on ID |

### CORS-Origin Resource sharing with Angularjs and Sinatra
Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. Our Angularjs executes a cross-origin HTTP request when it requests a resource that has a different port from its own. Therefore, in our project we will include the CORS mechanism that supports secure cross-origin requests and data transfers between browsers and servers.
In order to enable CORS on the client side, we open ```app.js ``` file in Angularjs and  tell the $http module that we are going to send requests to another domain. Also, the header used by the browser/server to identify our call as XmlHTTPRequest will be removed.

```bash
app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['Authorization,Accepts,Content-Type,X-CSRF-Token,X-Requested-With'];
});
```

To enable CORS on the server side, we will specify in the```company_project_web.rb ``` file the avaliable HTTP methods and the allowed origins(in our case, any origin *).

```bash
before do
    content_type 'application/json'
    headers 'Access-Control-Allow-Origin' => '*'
    headers 'Access-Control-Allow-Headers' => 'Authorization,Accepts,Content-Type,X-CSRF-Token,X-Requested-With'
    headers 'Access-Control-Allow-Methods' => 'HEAD,GET,POST,PUT,DELETE,OPTIONS'
end
```
Then, we add a new routes on our server, that is part of the Cross-Origin Resource Sharing specification.
```bash
options '/companies' do
    200
end
options '/companies/:id' do
    200
end

options '/owners_companies/:id' do
    200
end

options '/owners' do
    200
end
options '/owners/:id' do
    200
end

```
When sending a request in Angularjs to another domain, a call with the HTTP method OPTIONS will be invoked. The response from this call will resolve if CORS is available or not. The following response must have the allowed origins and the available HTTP methods.

Lastly, in order to handle the params that are sent with the post and put method in Angularjs, we are going to detect the params in Sinatra in both post and put method by adding the following code:

```bash
begin
 params.merge! JSON.parse(request.env["rack.input"].read)
rescue JSON::ParserError
 logger.error "Cannot parse request body."
end
```
As a result, server will successfully send back the data to Angularjs.

## Running the company_project
In order to run the sinatra program, we first have to open a command promt and navigate to our project folder. By default, both Terminal and Window’s Command Prompt will open in your default user directory. In order to change the directory, we first type the command ```cd\ ``` and then we navigate to that folder e.g. ```cd users\matea\company_project ```
After you are switched into the correct direcotry, run the following command  in the command promt:
```bundle exec rerun ruby company_project_web.rb ```.
With the running in Terminal, you can visit e.g. http://localhost:5000/companies to see all the companies.

The Bundler command ```bundle exec ``` executes a script in the context of the current bundle and it makes all gems specified in the Gemfile avaliable to require in our Ruby program.

# CONSIDERATIONS


##### How can you implement versioning of all the data?
 In REST API versioning is of crucial importance, as API can make internal changes in the system without affecting Clients. Versioning strategy allows clients to use the existing REST API and update their applications to the newer version of API whenever they feel to be ready.
One way to version a REST API is to include the version number in the URL path. Versioning through URL uses URI routing to point to a specific version of the API.
###### Implementation

We will use ``` sinatra-contrib ``` gem to use namespaces. Namespaces will let us add prefixes in our URLs, such as /v1/companies or /v2/companies.

```bash
gem install sinatra-contrib
```
After installation, in our ```company_project_web.rb``` file, we will add  the namespace feature to capture our versions within different blocks. An example of usage is shown below;
```bash
namespace '/v1' do
get ('/companies/:id') do
  company= Company.get(params[:id])
  company.to_json
  end
end

namespace '/v2' do
get ('/companies/:id') do
  company= Company.get(params[:id])
  owners = Owner.new
  company.owners.to_json
  end
end
```
Now we can start our server by running ```bundle exec rerun company_project_web.rb``` and access either /v1/companies/:id or /v1/companies/:id in our browser, depending which version we prefer to use.

## License
[MIT](https://choosealicense.com/licenses/mit/)
