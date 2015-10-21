var angApp = angular.module('addressBook',[]);

angApp.controller('AddressCtrl', function($scope, $http){

    $scope.newEmp = {};
    $scope.oldEmp = {};
    $scope.employees = [];
        
    function formReset(){
        $scope.addClicked = false;
        $scope.newEmp.firstName = "";
        $scope.newEmp.lastName = "";
        $scope.newEmp.email = "";
        $scope.newEmp.position = "";
        $scope.editClicked = false;
        $scope.oldEmp.firstName = "";
        $scope.oldEmp.lastName = "";
        $scope.oldEmp.email = "";
        $scope.oldEmp.position = "";
        $scope.oldEmp.id = 0;
    }
    
    formReset();
    
    //Get all Employee records
    $http.get("/allEmps")
        .success(function(data){
            $scope.employees = data;
        });
    $scope.edit = function(){
         $http.post("/editEmp", $scope.oldEmp)
            .success(function(data){
            $scope.employees = data;
            formReset();
        });
    };
    $scope.delete = function(id){
        $http.post("/delEmp", {"id" : id})
            .success(function(data){
            $scope.employees = data;
        });
    };
    $scope.add = function(id){
        $http.post("/addEmp", $scope.newEmp)
            .success(function(data){
            $scope.employees = data;
            formReset();
        });
    };
    $scope.addClick = function(){
        $scope.addClicked = true;
    };
    $scope.editClick = function(id){
        //Can be found in a better way but keeping it simple assuming the size of employees array is small
        for(var i=0; i<$scope.employees.length; i++){
            if ($scope.employees[i].id == id){
                $scope.oldEmp.id= id;
                $scope.oldEmp.firstName = $scope.employees[i].firstName;
                $scope.oldEmp.lastName = $scope.employees[i].lastName;
                $scope.oldEmp.email = $scope.employees[i].email;
                $scope.oldEmp.position = $scope.employees[i].position;
                $scope.editClicked = true;
                break;
            }
        }   
    };
});

angApp.directive('ngVisible', function () {
    return function (scope, element, attr) {
        scope.$watch(attr.ngVisible, function (visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
})