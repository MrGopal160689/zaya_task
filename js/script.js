function getDropDownList(parent,property){
	for(i = 0 ; i<lesson.length; i++){
		var val = lesson[i][property],
		opt = document.createElement('option'),
		txt = document.createTextNode(val);

		opt.setAttribute('value', val);
		opt.appendChild(txt);
		parent.appendChild(opt);
	}
}
function renderLesson(parent){
	// STRUCTURE TO BE CREATED
	// <tr class="lesson">
	// <input name="id" type="hidden" value="NO.">
	// <input name="subject" type="hidden" value="SUBJECT">
	// <input name="grade" type="hidden" value="NO.">
	// <td class="lesson-image"><div class="lesson-image-container"></div></td>
	// <td class="lesson-data">
	// 	<div class="pad-5">
	// 		<div class="lesson-title">lESSON TITLE</div>
	// 		<div class="lesson-brief"><span>SUBJECT</span> | GRADE - <span>NO.</span></div>
	// 	</div>
	// 	<ul class="lesson-metadata">
	// 		<li class="lesson-video">NO.</li>
	// 		<li class="lesson-document">NO.</li>
	// 		<li class="lesson-question">NO.</li>
	// 	</ul>
	// </td>
	for(i = 0; i<lesson.length; i++){
		// create new row
		var tr = document.createElement('tr');
		tr.classList.add('lesson');
		tr.setAttribute('draggable','true');

		// create image td
		var td_i = document.createElement('td'),
		div_i = document.createElement('div');
		td_i.classList.add('lesson-image','pad-5');
		div_i.classList.add('transition','lesson-image-container','b-r-5');
		
		//create data td
		var td_d = document.createElement('td'),
		id_input = document.createElement('input'),
		subject_input = document.createElement('input'),
		grade_input = document.createElement('input'),
		div_wrap = document.createElement('div'),
		div_title = document.createElement('div'),
		div_brief = document.createElement('div'),
		ul_d = document.createElement('ul'),
		title = document.createTextNode(lesson[i]['title']),
		brief = document.createTextNode(lesson[i]['subject']+" | Grade -"+lesson[i]['grade']),
		videos = document.createTextNode(lesson[i]['noOfVideos']),
		docs = document.createTextNode(lesson[i]['noOfDocuments']),
		questions = document.createTextNode(lesson[i]['noOfQuestions']);

		id_input.setAttribute('name','id');
		id_input.setAttribute('type','hidden');
		id_input.setAttribute('value',lesson[i]['id']);
		subject_input.setAttribute('name','subject');
		subject_input.setAttribute('type','hidden');
		subject_input.setAttribute('value',lesson[i]['subject']);
		grade_input.setAttribute('name','grade');
		grade_input.setAttribute('type','hidden');
		grade_input.setAttribute('value',lesson[i]['grade']);
		td_d.classList.add('lesson-data','pad-5');
		div_wrap.classList.add('wrap-lesson');
		div_title.classList.add('lesson-title');
		div_brief.classList.add('lesson-brief');
		ul_d.classList.add('lesson-metadata','m-0');

		//order matters
		div_title.appendChild(title);
		div_brief.appendChild(brief);
		div_wrap.appendChild(div_title);
		div_wrap.appendChild(div_brief);
		tr.appendChild(id_input);
		tr.appendChild(subject_input);
		tr.appendChild(grade_input);
		td_i.appendChild(div_i);
		tr.appendChild(td_i);
		td_d.appendChild(div_wrap);
		td_d.appendChild(ul_d);
		tr.appendChild(td_d);

		//create meta-data li, if not zero
		if(videos.nodeValue != '0'){
			var li_v = document.createElement('li');
			li_v.classList.add('lesson-video');
			li_v.appendChild(videos);
			ul_d.appendChild(li_v);
		}
		if(docs.nodeValue != '0'){
			var li_d = document.createElement('li');
			li_d.classList.add('lesson-document');
			li_d.appendChild(docs);
			ul_d.appendChild(li_d);
		}
		if(questions.nodeValue != '0'){
			var li_q = document.createElement('li');
			li_q.classList.add('lesson-question');
			li_q.appendChild(questions);
			ul_d.appendChild(li_q);
		}
		
		//complete the append of tr to tbody
		parent.appendChild(tr);
	}
}
var filter = function(){
		var subject = document.getElementById('select_lesson').value,
		grade = document.getElementById('select_grade').value,
		lesson_list = document.getElementsByClassName('lesson');

		if(subject!==grade){ // if no value selected, then don't filter
			for(i=0;i<lesson_list.length;i++){
				if(subject==lesson_list[i].children[1].value || grade==lesson_list[i].children[2].value){
					lesson_list[i].classList.remove('hidden');
				}
				else{
					lesson_list[i].classList.add('hidden');	
				}
			}
		}
	}
function addNewTopic(target){
	// STRUCTURE TO BE CREATED
	// <li><input type="text" placeholder="Topic name"></li>
	// <ol>
	// 	<li class="list-style-none drop-box">Add Lessons</li>
	// 	<li class="list-style-none hidden">
	// 		<label>Required Proficiency</label>
	// 		<select>
	// 			<option>Select</option>
	// 			<option>Graduate</option>
	// 		</select>
	// 	</li>
	// </ol>

	//create topic title
	var li_t_n = document.createElement('li');
	var inp = document.createElement('input');
	inp.setAttribute('type','text');
	inp.setAttribute('placeholder','Topic name');
	inp.classList.add('b-1');
	li_t_n.appendChild(inp);

	//create subject list
	var ol_s = document.createElement('ol');
	var li_c = document.createElement('li');
	li_c.classList.add('list-style-none','drop-box','hi-drop-box');
	var txt_c = document.createTextNode('Add Lessons');
	li_c.appendChild(txt_c);
	var li_p = document.createElement('li');
	li_p.classList.add('list-style-none','hidden');
	var lab = document.createElement('label');
	var lab_txt = document.createTextNode('Required Proficiency ');
	lab.appendChild(lab_txt);
	var sel = document.createElement('select');
	var opt1 = document.createElement('option');
	var opt2 = document.createElement('option');
	var opt1_txt = document.createTextNode('Select');
	var opt2_txt = document.createTextNode('Graduate');
	opt1.appendChild(opt1_txt);
	opt2.appendChild(opt2_txt);
	sel.appendChild(opt1);
	sel.appendChild(opt2);
	li_p.appendChild(lab);
	li_p.appendChild(sel);
	ol_s.appendChild(li_c);
	ol_s.appendChild(li_p);

	//append to parent
	target.appendChild(li_t_n);
	target.appendChild(ol_s);
}
function fillContainer(target, id){
	var par = target.parentNode,
	lesson_count,
	index = id-1,
	li_l = document.createElement('li'),
	sub = document.createTextNode(lesson[index]['subject']),
	btn = document.createElement('span');

	btn.classList.add('delete_lesson_btn','f-r','c-p');
	
	//append new lesson	
	li_l.appendChild(sub);
	li_l.appendChild(btn);
	par.insertBefore(li_l,target);

	lesson_count = par.children.length - 2;
	
	if(lesson_count == 1){
		target.textContent = "Drag to add more";
		target.classList.remove('hi-drop-box');
		target.classList.add('hi-add-more');
		par.lastElementChild.classList.remove('hidden');
		addNewTopic(target.parentNode.parentNode);
	}
}
var dragstart = function(event){
		var ref = event.target;
		if(ref.classList.contains('lesson')){
			var ref_id = ref.children[0].value;
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
}
