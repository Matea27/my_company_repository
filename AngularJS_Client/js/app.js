
var app = angular.module('companyApp', ['ui.router', 'ngResource', 'companyApp.controllers', 'companyApp.services']);

app.config(function($stateProvider) {
  $stateProvider.state('companies', { // show the list of alll companies
    url: '/companies',
    templateUrl: 'view/companies.html',
    controller: 'CompanyListController'
  }).state('viewCompany', { //view the details about the company
    url: '/companies/:id',
    templateUrl: 'view/viewCompany.html',
    controller: 'CompanyViewController'
  }).state('viewOwners', {
    url: '/owners_companies/:id',
    templateUrl: 'view/viewOwners.html',
    controller: 'OwnerViewController'
  }).state('newCompany', { //add new company
    url: '/companies',
    templateUrl: 'view/addCompany.html',
    controller: 'CompanyNewController'
  }).state('updateCompany', { //updating a company
    url: '/companies/:id',
    templateUrl: 'view/updateCompany.html',
    controller: 'CompanyUpdateController'
  }).state('addOwner', {
    url: '/owners',
    templateUrl: 'view/addOwner.html',
    controller: 'AddOwnerController'
  });
}).run(function($state) {
  $state.go('companies'); //make a transition to companies
});

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['Authorization,Accepts,Content-Type,X-CSRF-Token,X-Requested-With'];
});
app.config(['$qProvider', function ($qProvider) { //handdle the erros: “Possibly unhandled rejection” error [duplicate] . Temporarily
    $qProvider.errorOnUnhandledRejections(false);
}]);
