myApp.controller('CheckInsController', 
  function($scope, $routeParams, $firebase, $rootScope, $location, FIREBASE_URL, $firebaseSimpleLogin) {

  	$scope.whichmeeting = $routeParams.mId;
  	$scope.whichuser = $routeParams.uId;
    $scope.order="firstname";
    $scope.direction="";

  	var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');
  	var checkinsList = $firebase(ref).$asArray();
  	$scope.checkins = checkinsList;

  	$scope.addCheckin = function() {
  		var checkinsObj = $firebase(ref);

  		var myData = {
  			firstname: $scope.user.firstname,
  			lastname: $scope.user.lastname,
  			email: $scope.user.email,
  			date: Firebase.ServerValue.TIMESTAMP
  		};

  		checkinsObj.$push(myData).then(function() {
  			$location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
  		});
  	}

    $scope.deleteCheckin = function(id) {
      var record = $firebase(ref);
      record.$remove(id);
    }

    $scope.pickRandom = function() {
      var whichRecord = Math.round(Math.random() * checkinsList.length);
      $scope.recordId = checkinsList.$keyAt(whichRecord);
    }

    $scope.showLove = function(myItem) {
      myItem.show = !myItem.show;

      if(myItem.userState == 'expanded') {
        myItem.userState = '';
      } else {
        myItem.userState = 'expanded';
      }
    }

    $scope.giveLove = function(myItem, myGift) {
      var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + myItem.$id + '/awards');
      var checkinsObj = $firebase(refLove);

      var myData = {
        name: myGift,
        date: Firebase.ServerValue.TIMESTAMP
      };
      checkinsObj.$push(myData);
    }

    $scope.deleteLove = function(checkinId, award) {
    var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + checkinId + '/awards');
    var record = $firebase(refLove);
    record.$remove(award);
  }

});