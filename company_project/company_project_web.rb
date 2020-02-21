 require 'sinatra'
 require 'json'

set :bind, '127.0.0.1'
set :port, 5000

before do
    content_type 'application/json'
    headers 'Access-Control-Allow-Origin' => '*'
    headers 'Access-Control-Allow-Headers' => 'Authorization,Accepts,Content-Type,X-CSRF-Token,X-Requested-With'
    headers 'Access-Control-Allow-Methods' => 'HEAD,GET,POST,PUT,DELETE,OPTIONS'
end

set :protection, false


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
  
  has n, :owners, :constraint => :destroy
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
  company.owners.to_json
end

delete ('/companies/:id') do
  Company.get(params[:id]).destroy.to_json
  redirect('/companies')
end
