var th_eighth = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Which letter should you press to select the green tree on the left?</p>' +
        '<div class=group>' +
        decision_content(choices_types[0].choice_a, choices_types[0].choice_b) +
        '</div><br>',
    choices:['F', 'J'],
    on_finish: function(data){
    	if(data.key_press == 70){
    		data.correct = true;
    	} else {
    		data.correct = false;
    	}
 	}     
};

var th_eighth_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			 '<p> Remember, press "F" for left and "J" for right. </p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			'<p> Remember, press "F" for left and "J" for right.</p>'	
		}
 	},
 	trial_duration: 3000,   
};      

var th_ninth = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Which letter should you press to select the red tree on the right?</p>' +
        '<div class=group>' +
        decision_content(choices_types[0].choice_a, choices_types[0].choice_b) +
        '</div><br>',
    choices:['F', 'J'],
    on_finish: function(data){
    	if(data.key_press == 74){
    		data.correct = true;
    	} else {
    		data.correct = false;
    	}
 	}    
}; 
	
var th_ninth_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			 '<p> Remember, press "F" for left and "J" for right. </p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			'<p> Remember, press "F" for left and "J" for right.</p>'	
		}
 	},
 	trial_duration: 3000,   
};    
 
	
var th_tenth = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Type the number of the <b> maximum </b> amount of shields an gnome can make</p>', 
    choices:['1', '2', '3', '4', '5', '6', '7', '8','9'],
    on_finish: function(data){
    	if(data.key_press == 57){
    		data.correct = true;
    	} else {
    		data.correct = false;
    	}
 	}     
}; 

var th_tenth_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			'<p> Remember, gnomes can make 0 to 9 shields. </p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p> Remember, gnomes can make 0 to 9 shields.</p>'	
		}
 	},
 	trial_duration: 3000,   
}; 

var th_one = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Remember, the same tree always takes you to the same gnome. </p>' +
		'<p>On this trial, select the tree on the left by pressing "F".</p>' +
        '<div class=group>' +
        decision_content(test_types[0].choice_a, test_types[0].choice_b) +
        '</div><br>',
    choices:['F']
	};   
	
var th_two = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>The orange tree took you to the green gnome. </p>' +
		'<p> The green gnome gave you 8 shields. </p>' +
		'<p> The most shields a gnome can make is 9 shields, so this is a great outcome!</p>' +
		'<div class=group>' +
        outcome_content(result_3, resource_img, 8) + 
        '</div><br>' +
        '<p> Press space to continue </p>',
    choices:['space']
	};    

var th_three = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>If you wanted to visit the <b> green gnome </b> again, which tree would you select?</p>' +
		 '<div class=group>' +
        decision_content(test_types[0].choice_a, test_types[0].choice_b) +
        '</div><br>',
    choices:['F', 'J'],
    on_finish: function(data){
    	if(data.key_press == 70){
    		data.correct = true;
    	} else {
    		data.correct = false;
    	}
 	}
};
	
var th_three_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			'<p> Remember, the same tree goes to the same gnome. </p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p> Remember, the same tree goes to the same gnome. You would select the orange tree to visit the green gnome.</p>'	
		}
 	},
 	trial_duration: 3000,   
};
	
var th_four = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>On this trial, select the tree on the right by pressing "J".</p>' +
        '<div class=group>' +
        decision_content(test_types[0].choice_a, test_types[0].choice_b) +
        '</div><br>',
    choices:['J']
	}; 
	
var th_five = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>The blue tree took you to the purple gnome. </p>' +
		'<p> The purple gnome only gave you 1 shield. </p>' +
		'<p> That is not very much and is a pretty bad outcome.</p>' +
		'<div class=group>' +
        outcome_content(result_4, resource_img, 1) + 
        '</div><br>' +
        '<p> Press space to continue </p>',
    choices:['space']
	};  
	
var th_six = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Remember the green gnome gave you 8 shields and the purple gnome only gave you 1 shield. </p>' +
		'<p> Which gnome would you try to visit next? </p>' +
		 '<div class=group>' +
        decision_content(test_types[1].choice_a, test_types[1].choice_b) +
        '</div><br>',
    choices:['F', 'J'],
    on_finish: function(data){
    	if(data.key_press == 70){
    		data.correct = true;
    	} else {
    		data.correct = false;
    	}
 	}
};   
	
var th_six_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			'<p> Remember, you want to select the gnome who gives you the most shields.</p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p>Remember, you want to select the gnome who gives you the most shields.</p>'	
		}
 	},
 	trial_duration: 3000,   
};
	

var th_seven = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>To visit the green gnome, which tree should you visit? </p>' +
		'<div class=group>' +
        decision_content(test_types[0].choice_a, test_types[0].choice_b) +
        '</div><br>',
    choices:['F', 'J'], 
    on_finish: function(data){
    	if(data.key_press == 70){
    		data.correct = true;
    	} else {
    		data.correct = false;
    	}
 	}    
};   

var th_seven_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' + 
			'<p>Remember, the same tree goes to the same gnome each time.</p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p>Remember, the same tree goes to the same gnome each time.</p>'	
		}
 	},
 	trial_duration: 3000,   
};

var th_eight = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:36px;font-weight:bold">You are ready to play!</p>' +
		'<p>The trees and gnomes in the actual game will be different than the practice. </p>' +
		'<p> Press space to start the game</p>', 
    choices:['space']
	}; 	
	
var test_block = {
    timeline: [th_eighth, th_eighth_feedback, th_ninth, th_ninth_feedback, th_tenth, th_tenth_feedback, th_one, th_two, th_three, th_three_feedback, th_four, th_five, th_six, th_six_feedback, th_seven, th_seven_feedback, th_eight],
    randomize_order: false,
};