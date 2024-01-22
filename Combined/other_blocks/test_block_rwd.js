var eighth = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Which letter should you press to select the red house on the left?</p>' +
        '<div class=group>' +
        rwd_decision_content(rwd_test_types[0].choice_a, rwd_test_types[0].choice_b) +
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

var eighth_feedback = {
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

var ninth = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Which letter should you press to select the blue house on the right?</p>' +
        '<div class=group>' +
        rwd_decision_content(rwd_test_types[0].choice_a, rwd_test_types[0].choice_b) +
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
	
var ninth_feedback = {
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
 
	
var tenth = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Type the number of the <b> maximum </b> amount of flames an elf can have</p>', 
    choices:['1', '2', '3', '4', '5', '6', '7', '8','9'],
    on_finish: function(data){
    	if(data.key_press == 57){
    		data.correct = true;
    	} else {
    		data.correct = false;
    	}
 	}     
}; 

var tenth_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			'<p> Remember, elves can have 0 to 9 flames. </p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p> Remember, elves can have 0 to 9 flames.</p>'	
		}
 	},
 	trial_duration: 3000,   
}; 

var one = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Remember, the same house always takes you to the same elf. </p>' +
		'<p>On this trial, select the house on the left by pressing "F".</p>' +
        '<div class=group>' +
        rwd_decision_content(rwd_test_types[0].choice_a, rwd_test_types[0].choice_b) +
        '</div><br>',
    choices:['F']
	};   
	
var two = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>The red house took you to the yellow elf. </p>' +
		'<p> The yellow elf attacked you with 8 flames. </p>' +
		'<p> The most flames an elf can have is 9, so this is a bad outcome!</p>' +
		'<div class=group>' +
        rwd_outcome_content(rwd_result_3, rwd_resource_img, 8) + 
        '</div><br>' +
        '<p> Press space to continue </p>',
    choices:['space']
	};    

var three = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>If you wanted to visit the <b> yellow elf </b> again, which house would you select?</p>' +
		 '<div class=group>' +
        rwd_decision_content(rwd_test_types[0].choice_a, rwd_test_types[0].choice_b) +
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
	
var three_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			'<p> Remember, the same house goes to the same elf. </p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p> Remember, the same house goes to the same elf. You would select the red house to visit the yellow elf.</p>'	
		}
 	},
 	trial_duration: 3000,   
};
	
var four = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>On this trial, select the house on the right by pressing "J".</p>' +
        '<div class=group>' +
        rwd_decision_content(rwd_test_types[0].choice_a, rwd_test_types[0].choice_b) +
        '</div><br>',
    choices:['J']
	}; 
	
var five = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>The blue house took you to the purple elf. </p>' +
		'<p> The purple elf only attacked you with 1 flame. </p>' +
		'<p> That is not very much and is a pretty good outcome!</p>' +
		'<div class=group>' +
        rwd_outcome_content(rwd_result_4, rwd_resource_img, 1) + 
        '</div><br>' +
        '<p> Press space to continue </p>',
    choices:['space']
	};  
	
var six = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>Remember the yellow elf attacked with 8 flames and the purple elf only attacked with 1 flame. </p>' +
		'<p> Which elf would you try to visit next? </p>' +
		 '<div class=group>' +
        rwd_decision_content(rwd_test_types[1].choice_a, rwd_test_types[1].choice_b) +
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
	
var six_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' +
			'<p> Remember, you want to select the elf who attacked with the least flames.</p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p>Remember, you want to select the elf who attacked with the least flames.</p>'	
		}
 	},
 	trial_duration: 3000,   
};
	

var seven = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:24px;font-weight:bold">TEST QUESTION</p>' +
		'<p>To visit the purple elf, which house should you visit? </p>' +
		'<div class=group>' +
        rwd_decision_content(rwd_test_types[0].choice_a, rwd_test_types[0].choice_b) +
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

var seven_feedback = {
	type: 'html-keyboard-response', 
	stimulus: function(){
		var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
		if(last_trial_correct){
			return '<p style="font-size:36px;font-weight:bold">Correct!</p>' + 
			'<p>Remember, the same house goes to the same elf each time.</p>';
		}else {
			return '<p style="font-size:36px;font-weight:bold">Wrong answer.</p>' +
			 '<p>Remember, the same house goes to the same elf each time.</p>'	
		}
 	},
 	trial_duration: 3000,   
};

var eight = {
	type: 'html-keyboard-response',
	stimulus:'<p style="font-size:36px;font-weight:bold">You are ready to play!</p>' +
		'<p>The houses and elves in the actual game will be different than the practice. </p>' +
		'<p> Press the space bar to start the game</p>', 
    choices:['space']
	}; 	
	
var test_block_rwd = {
    timeline: [eighth, eighth_feedback, ninth, ninth_feedback, tenth, tenth_feedback, one, two, three, three_feedback, four, five, six, six_feedback, seven, seven_feedback, eight],
    randomize_order: false,
};