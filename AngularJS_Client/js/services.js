angular.module('companyApp.services', []).factory('Company', function($resource) {
  return {
    Company: $resource('http://localhost:5000/companies/:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  }),
  Owner: $resource('http://localhost:5000/owners/:id', { id: '@id' }, {
  update: {
    method: 'PUT'
  }
}),
  Owner_Company: $resource('http://localhost:5000/owners_companies/:id', { id: '@id' }, {
    get: {
      method: 'GET', isArray: true
}
})
};
});
