angular.module('StackOverflow',['ui.bootstrap','ngSanitize'])
.controller('StackOverflowCtrl',['$scope','$http',function($scope,$http){
    $scope.count = 0;
     $http.get("Posts.xml",  
    {  
        transformResponse: function (cnv)  
        {  
            var x2js = new X2JS();  
            var aftCnv = x2js.xml_str2json(cnv);  
            return aftCnv;  
        }
    }).success(function (response)  
    { 

      $scope.postdetails = response.posts.row;
      for(var i=0;i<localStorage.length;i++)
      if (typeof(Storage) !== "undefined") {
        var valueUp = localStorage.getItem("up"+i);
        var valueDown = localStorage.getItem("down"+i);
        $scope.postdetails[i].upVote = parseInt(valueUp);
        $scope.postdetails[i].downVote = parseInt(valueDown?valueDown : 0);
      }
      begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    if($scope.postdetails){
    $scope.filteredpostDetails = $scope.postdetails.slice(begin, end);
  }
    });  


   $scope.filteredpostDetails = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 10
  ,$scope.maxSize = 5;
  
 $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    if($scope.postdetails){
    $scope.filteredpostDetails = $scope.postdetails.slice(begin, end);
  }
  });
 $scope.upVote = function(index){
  $scope.postdetails[index].upVote =  $scope.postdetails[index].upVote ? $scope.postdetails[index].upVote+1 :1;
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("up"+index,$scope.postdetails[index].upVote);
    // Retrieve
   }
 };

 $scope.downVote = function(index){
  $scope.postdetails[index].downVote =  $scope.postdetails[index].downVote ? $scope.postdetails[index].downVote-1 :-1;
   if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("down"+index,$scope.postdetails[index].downVote);
    // Retrieve
   }
 }
}]);