var api = "http://localhost:63885/api/values";

var app = angular.module('app', [])

    .controller('appCtrl', ["$scope", "$http", "theWayService", function ($scope, $http, theWayService) {
        $scope.onclick = function () {
            var website = $scope.website;
            var word = $scope.word;
            var number = $scope.number;

            $http({
                method: "GET",
                url: api + "/" + website + "/" + word + "/" + number
            }).then(function mySuccess(response) {
                $scope.answer = response.data;
            }, function myError(response) {
                $scope.answer = response.data;
            }
                )
        };
    }
    ])

    .controller('tableCtrl', ["$scope", "$http", "theWayService", function ($scope, $http, theWayService) {
        $scope.onclick = function () {

            var website = $scope.website;
            var word = $scope.word;
            var number = $scope.number;

            var postsList = [];

            var posts = {
                website: $scope.website,
                word: $scope.word,
                number: $scope.number
            };

            theWayService.getWordCount(website, word, number).then(function (result) {
                console.log(result.data);
            });

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

