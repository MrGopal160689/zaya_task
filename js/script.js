var lesson_added = [];

function getDropDownList(parent,property){
	var arr = [];
	for(var i = 0 ; i<lesson.length; i++){
		var val = lesson[i][property];
		if(arr.indexOf(val)==-1){ // checks if value already in array?
			arr.push(val);
		}
	}
	for(var c=0; c<arr.length; c++){
		var opt = document.createElement('option'),
		txt = document.createTextNode(arr[c]);

		opt.setAttribute('value', arr[c]);
		opt.appendChild(txt);
		parent.appendChild(opt);
	}
}
function renderLesson(parent){
	for(var i = 0; i<lesson.length; i++){
		var clone_lesson = document.importNode(document.getElementById('template_lesson').content, true),
		ul_d = clone_lesson.querySelector('.lesson-metadata');

		// set values
		clone_lesson.querySelector('input[name=id]').setAttribute('value',lesson[i]['id']);
		clone_lesson.querySelector('input[name=subject]').setAttribute('value',lesson[i]['subject']);
		clone_lesson.querySelector('input[name=grade]').setAttribute('value',lesson[i]['grade']);
		clone_lesson.querySelector('.lesson-title').textContent = lesson[i]['title'];
		clone_lesson.querySelector('.lesson-brief').textContent = lesson[i]['subject']+" | Grade -"+lesson[i]['grade'];

		//show videos, docs and questions, if not zero
		if(lesson[i]['noOfVideos'] != '0'){
			var li_v = document.createElement('li');
			li_v.classList.add('lesson-video');
			li_v.textContent = lesson[i]['noOfVideos'];
			ul_d.appendChild(li_v);
		}
		if(lesson[i]['noOfDocuments'] != '0'){
			var li_d = document.createElement('li');
			li_d.classList.add('lesson-document');
			li_d.textContent = lesson[i]['noOfDocuments'];
			ul_d.appendChild(li_d);
		}
		if(lesson[i]['noOfQuestions'] != '0'){
			var li_q = document.createElement('li');
			li_q.classList.add('lesson-question');
			li_q.textContent = lesson[i]['noOfQuestions'];
			ul_d.appendChild(li_q);
		}
		//complete the append of tr to tbody
		parent.appendChild(clone_lesson);
	}
}
var filter = function(){
		var subject = document.getElementById('select_lesson').value,
		grade = document.getElementById('select_grade').value,
		lesson_list = document.querySelectorAll('.lesson');

		if(subject!='null' && grade!='null'){ // check if both are selected
			for(var i=0;i<lesson_list.length;i++){
				if(subject==lesson_list[i].querySelector('input[name=subject]').value && grade==lesson_list[i].querySelector('input[name=grade]').value){
					lesson_list[i].classList.remove('hidden');
				}
				else{
					lesson_list[i].classList.add('hidden');	
				}
			}
		}
		else if(subject!='null' || grade!='null'){ // check if any of them are selected
			for(var i=0;i<lesson_list.length;i++){
				if(subject==lesson_list[i].querySelector('input[name=subject]').value || grade==lesson_list[i].querySelector('input[name=grade]').value){
					lesson_list[i].classList.remove('hidden');
				}
				else{
					lesson_list[i].classList.add('hidden');	
				}
			}
		}
		else{
			// if no value selected, then don't filter
		}
		
	}
function deleteArrElem(arr,value){
	arr.splice(arr.indexOf(value),1);
}
var deleteSelectedTopic = function(){
	var checked = document.querySelectorAll('input[name=check_lesson]:checked');
	for(var i=0;i<checked.length;i++){
		var list = checked[i].parentNode.nextElementSibling.querySelectorAll('.added-lessons');
		if(list.length == 0){
			//remove lesson element
			var li = checked[i].parentNode, ol = li.nextElementSibling;
			li.remove();
			ol.remove();
		}
		else{
			alert('Cannot delete topic with lessons !!');
		}
	}

}
var deleteLesson = function(event){
	if(event.target.classList.contains('delete_lesson_btn')){
		var id = event.target.parentNode.querySelector('input[name=id]').getAttribute('value');
		deleteArrElem(lesson_added,id);
		event.target.parentNode.remove();
	}
}
function addNewTopic(target){
	var template_topic = document.getElementById('template_topic'),
	clone_topic = document.importNode(template_topic.content, true);
	target.appendChild(clone_topic);
}
function getSubject(id){
	for(var i=0;i<lesson.length;i++){
		if(lesson[i]['id']==id){
			return lesson[i]['subject'];
		}
	}
}
function fillContainer(target, id){
	if(lesson_added.indexOf(id)==-1){ // check if lesson already added ?
		var li_l = document.importNode(document.getElementById('template_added_lesson').content, true),
		sub = document.createTextNode(getSubject(id));
		// set values
		li_l.querySelector('input[name=id]').setAttribute('value',id);
		li_l.firstElementChild.insertBefore(sub,li_l.querySelector('delete_lesson_btn'));
		//append lesson
		target.parentNode.insertBefore(li_l,target);
		
		if(target.parentNode.children.length - 2 == 1){
			target.textContent = "Drag to add more";
			target.classList.remove('hi-drop-box');
			target.classList.add('hi-add-more');
			target.parentNode.lastElementChild.classList.remove('hidden');
		}
		lesson_added.push(id);
	}
	else{
		// show error
		alert(getSubject(id)+" already exists!!");
	}
}
var dragstart = function(event){
		var ref = event.target;
		if(ref.classList.contains('lesson')){
			var ref_id = ref.querySelector('input[name=id]').value;
			event.dataTransfer.setData('text/plain',ref_id);
		}
	}
var drop = function(event){
		event.preventDefault();
		var tar = event.target;
		if(tar.classList.contains('drop-box')){
			var id = event.dataTransfer.getData('text/plain');
			fillContainer(tar,id);
		}
	}

window.onload = function(){
	addNewTopic(document.getElementById('topic_list'));
	renderLesson(document.getElementById('lesson_list').firstElementChild);
	getDropDownList(document.getElementById('select_lesson'), 'subject');
	getDropDownList(document.getElementById('select_grade'), 'grade');
	document.getElementById('search_lesson_btn').addEventListener('click', filter);
	document.addEventListener('dragstart', dragstart);
	document.addEventListener('dragover',function(event){
		event.preventDefault();
	});
	document.addEventListener('drop', drop);
	document.addEventListener('click', deleteLesson);
	document.getElementById('add_topic_btn').addEventListener('click', function(){
		addNewTopic(document.getElementById('topic_list'));
	});
	document.getElementById('delete_topic_btn').addEventListener('click', deleteSelectedTopic);
};