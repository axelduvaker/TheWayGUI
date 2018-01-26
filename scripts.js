var api = "http://localhost:63885/api/values";

var app = angular.module('app', [])

    .controller('appCtrl', function($scope, $http) {
        $scope.onclick = function() {
            var website = $scope.website;
            var word = $scope.word;
            var number = $scope.number;
    
            $http({
                method : "GET",
                url : api + "/" + website + "/" + word + "/" + number
            }).then(function mySuccess(response) {
                $scope.answer = response.data;
            }, function myError(response) {
                $scope.answer = response.data;
            }
        )};
    })

    .controller('tableCtrl', function($scope, $http) {
        $scope.onclick = function() {
            
            var website = $scope.website;
            var word = $scope.word;
            var number = $scope.number;

            var postsList = [];

            var posts = {
                website: $scope.website,
                word: $scope.word,
                number: $scope.number
            };

            $http({
                method : "GET",
                url : api + "/" + website + "/" + word + "/" + number
            }).then(function mySuccess(response) {
                console.log(response.data);
                $scope.postsList.push(response.data); 
            }, function myError(response) {
                $scope.answer = response.data;
            })

            }
        }
    )

