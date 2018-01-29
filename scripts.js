var api = "http://localhost:63885/api/values";

var app = angular.module('app', [])

    .controller('tableCtrl', ["$scope", "$http", "theWayService", function ($scope, $http, theWayService) {

        $scope.postsList = [];
        
            $scope.onclick = function () {

                var website = $scope.website;
                var word = $scope.word;
                var number = $scope.number;

                theWayService.getWordCount(website, word, number).then(function (result) {
                    console.log(result.data);
                    var data = {
                        url: result.data.Url,
                        word: result.data.Word,
                        count: result.data.Count
                    };
                
                    $scope.postsList.push(data);
                });
            }

            $scope.remove = function(post) {
                var index = $scope.postsList.indexOf(post);
                $scope.postsList.splice(index, 1);
            }
        }
        ])

        .service('theWayService', ["$http", "$q", function ($http, $q) {
            var self = this;

            self.getWordCount = function (website, word, number) {
                var deferred = $q.defer();
                $http.get(api + "/" + website + "/" + word + "/" + number)
                    .then(function (success) {
                        deferred.resolve(success);
                    }),
                    function (error) {
                        deferred.reject(error);
                    };
                return deferred.promise;
            }
        }
    ]);

