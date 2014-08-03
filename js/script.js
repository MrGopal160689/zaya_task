// angular implementation
var zaya_app = angular.module('zaya',[]);
zaya_app.controller('mainController',function($scope){
	$scope.lessonlist = [
	{id : 1, title : "Lorem Ipsum", subject : "Math", grade : 1, noOfVideos : 1, noOfDocuments : 1, noOfQuestions : 2, postDate: '23 Jan 2013', imgFileName: '1', imgType: 'jpg'},
	{id : 2, title : "Advanced Lorem Ipsum", subject : "Math", grade : 2, noOfVideos : 1, noOfDocuments : 0, noOfQuestions : 1, postDate: '23 Jan 2013', imgFileName: '2', imgType: 'jpg'},
	{id : 3, title : "Lorem Ipsum", subject : "English", grade : 1, noOfVideos : 0, noOfDocuments : 1, noOfQuestions : 1, postDate: '23 Jan 2013', imgFileName: '3', imgType: 'jpg'},
	{id : 4, title : "Lorem Ipsum", subject : "Science", grade : 1, noOfVideos : 1, noOfDocuments : 1, noOfQuestions : 2, postDate: '23 Jan 2013', imgFileName: 'default', imgType: 'jpg'},
	{id : 5, title : "Lorem Ipsum", subject : "Computers", grade : 2, noOfVideos : 1, noOfDocuments : 1, noOfQuestions : 1, postDate: '23 Jan 2013', imgFileName: '1', imgType: 'jpg'},
	{id : 6, title : "Lorem Ipsum", subject : "Biology", grade : 3, noOfVideos : 9, noOfDocuments : 22, noOfQuestions : 0, postDate: '23 Jan 2013', imgFileName: '3', imgType: 'jpg'},
	{id : 7, title : "Lorem Ipsum", subject : "Java", grade : 2, noOfVideos : 203, noOfDocuments : 0, noOfQuestions : 1, postDate: '23 Jan 2013', imgFileName: '2', imgType: 'jpg'}
	];
	$scope.course = {};
	$scope.lesson_added = [];
	document.addEventListener('dragstart', function(event){
		var ref = event.target;
		if(ref.classList.contains('lesson')){
			var ref_id = ref.querySelector('input[name=id]').value;
			event.dataTransfer.setData('text/plain',ref_id);
		}
	});
	document.addEventListener('dragover',function(event){
		event.preventDefault();
	});
	
});
zaya_app.controller('lessonController',function($scope){
	$scope.subject = null;
	$scope.grade = null;
	$scope.getUniqueArr = function(property){
		var arr = [];
		for(var i = 0 ; i<$scope.lessonlist.length; i++){
			var val = $scope.lessonlist[i][property];
			if(arr.indexOf(val)==-1){
				arr.push(val);
			}
		}
		return arr;
	};
	$scope.subjectList = $scope.getUniqueArr('subject');
	$scope.gradeList = $scope.getUniqueArr('grade');

	$scope.filterLesson = function(row){
		if($scope.subject!== null && $scope.grade!== null){ 
			return $scope.subject==row.subject && $scope.grade==row.grade;
		}
		else if($scope.subject!== null || $scope.grade!== null){ 
			return $scope.subject==row.subject || $scope.grade==row.grade;
		}
		else{
			return true;
		}
	}
});

zaya_app.controller('courseController',function($scope){
	$scope.course.name = 'Type Course Name';
	$scope.course.topics = [];

	$scope.addTopic = function(){
		if(!$scope.findEmptyTopic()){
			var topic = {
				name:'',
				lessonList:[]
			}
			$scope.course.topics.push(topic);
		}
		else{
			alert('Cannot add more than one empty topic');
		}
	};
	$scope.deleteTopic = function(){
		var checked = document.querySelectorAll('input[name=check_lesson]:checked');
		for(var i=0;i<checked.length;i++){
			if($scope.course.topics[checked[i].value].lessonList.length==0){
				$scope.course.topics.splice((checked[i].value),1);
			}
			else{
				alert('Cannot delete topic with lessons !!');
			}
		}
	};
	$scope.addLesson = function(topicindex,lessonid,target){
		if($scope.lesson_added.indexOf(lessonid)==-1){
			$scope.course.topics[topicindex].lessonList.push($scope.getLessonObj(lessonid));
			$scope.lesson_added.push(lessonid);
			$scope.$apply();
			if(target.classList.contains('hi-drop-box')){
				target.classList.remove('hi-drop-box');
				target.classList.add('hi-add-more');
				target.textContent = 'Drag to add more lessons';
			}
		}
		else{
			alert($scope.getLessonObj(lessonid)['subject']+' already added');
		}
	};
	$scope.deleteLesson = function(topicindex,lessonid,event){
		var arr = $scope.course.topics[topicindex].lessonList;
		arr.splice(arr.indexOf($scope.getLessonObj(lessonid)),1);
		$scope.lesson_added.splice($scope.lesson_added.indexOf(lessonid.toString()),1);
		if(arr.length==0){
			// not a proper angular way of doing it
			var tar = event.target.parentNode.parentNode.parentNode.querySelector('.drop-box');
			tar.classList.remove('hi-add-more');
			tar.classList.add('hi-drop-box');
			tar.textContent = 'Drag and drop lessons';
		}
	};
	$scope.getLessonObj = function(lessonid){
		for(var i=0;i<$scope.lessonlist.length;i++){
			if($scope.lessonlist[i]['id']==lessonid){
				return $scope.lessonlist[i];
			}
		}
	};
	$scope.findEmptyTopic = function(){
		for(var c=0;c<$scope.course.topics.length;c++){
			if($scope.course.topics[c].lessonList.length == 0){
				return true;
			}
		}
		return false;
	}
	document.addEventListener('drop', function(event){
		event.preventDefault();
		if(event.target.classList.contains('drop-box')){
			var lessonid = event.dataTransfer.getData('text/plain');
			var topicindex = event.target.getAttribute('value');
			$scope.addLesson(topicindex,lessonid,event.target);
		}
	});
	$scope.addTopic();
});