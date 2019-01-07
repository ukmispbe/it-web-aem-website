/*global angular: false */
angular.module('waters-solr-recovery-app', ['acsCoral', 'ACS.Commons.notifications'])
    .controller('MainCtrl', ['$scope', '$http', '$timeout', 'NotificationsService',
        function ($scope, $http, $timeout, NotificationsService) {
            $scope.app = {
                uri: ''
            };

            $scope.form = {
                contentRoot: '/content/waters',
                action: 'add',
                includeDescendants: 'false'
            };

            $scope.result = {};

            $scope.updateIndex = function () {
                var start = new Date().getTime();

                NotificationsService.running(true);

                $scope.result = {};

                $http({
                    method: 'GET',
                    url: $scope.app.uri + '.index.json?' + $('#solr-recovery-form').serialize()
                }).success(function (data) {
                    var time = new Date().getTime() - start;

                    data.time = time;
                    $scope.result = data || {};

                    NotificationsService.running(false);
                    NotificationsService.add('success', 'SUCCESS', 'Updated Solr index in ' + time + 'ms.');

                }).error(function () {
                    NotificationsService.running(false);
                    NotificationsService.add('error', 'ERROR', 'Unable to update Solr index.');
                });
            };
        }]);


