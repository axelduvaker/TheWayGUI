var api = "http://localhost:63885/api/values";

var app = angular.module('app', [])

    .controller('tableCtrl', ["$scope", "$http", "theWayService", "$interval", function ($scope, $http, theWayService, $interval) {

        $scope.postsList = [];
        var promise;

        
            $scope.onclick = function () {
                var bData;
                var website = $scope.website;
                var word = $scope.word;
                var number = $scope.number;

                theWayService.getWordCount(website, word, number).then(function (result) {
                    console.log(result.data);
                    var data = {
                        url: result.data.Url,
                        word: result.data.Word,
                        count: result.data.Count,
                        status: result.status,
                        statusText: result.statusText
                    };

                    if (result.data.Word == "null") {
                        $scope.answer = result.data;
                    } 
                    else
                    {
                        $scope.postsList.push(data);
                    }
                });
                promise = $interval($scope.onclick, 10000);
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

