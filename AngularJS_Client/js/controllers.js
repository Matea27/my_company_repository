angular.module('companyApp.controllers', []).controller('CompanyListController', function($scope,$resource, $state, $window, Company) {
  $scope.companies = Company.Company.query(); //fetch all companies


  var delCompany = $resource('http://localhost:5000/companies/:id', {id: '@id'});
    $scope.deleteCompany = function(id) {
        delCompany.remove({id: id}, function() {
          $window.location.href = ''; //redirect to home
        });
    };
}).controller('CompanyViewController', function($scope,$state,$resource, $stateParams, Company) {
  $scope.company = Company.Company.get({ id: $stateParams.id }); // get a company

}).controller("OwnerViewController", function($scope,$resource, $stateParams, Company){
   $scope.owner_company= Company.Owner_Company.get({ id: $stateParams.id });


}).controller('CompanyNewController', function($scope, $state, $stateParams, Company) {
  $scope.company = new Company.Company();
  $scope.addCompany = function() {
    $scope.company.$save(function() {
      $state.go('companies');
    });
  };
}).controller('CompanyUpdateController', function($scope, $state, $stateParams, Company) {
  $scope.updateCompany = function() {
    $scope.company.$update(function() {
      $state.go('companies');
    });
  };
  $scope.loadCompany = function() {
    $scope.company = Company.Company.get({ id: $stateParams.id });

  };
  $scope.loadCompany();

}).controller('AddOwnerController', function($scope,$state,$stateParams,Company){
  $scope.addOwner=function(){
    $scope.owner.$save(function(){
      $state.go('companies');
    });
  };
  $scope.loadOwner = function() {
    $scope.owner = Company.Owner.get({ id: $stateParams.id });
  };
  $scope.loadOwner();
});
