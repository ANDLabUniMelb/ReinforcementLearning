var ID = ''
var gender = ''
var age = 0
var sex = ''
    
    
var demographics_block = {
  		timeline: [
  			{
  				type: 'survey-text',
  				preamble: ["Please provide us with some information about yourself:"],
  				questions: [{prompt: "What is your Prolific ID?", required: true}, {prompt: "How old are you?", required: true}, {prompt: "What is your gender?", required: true}, {prompt: "What was your sex at birth?", required: true}],
  			}
  		],
  		loop_function: function(data){
  			var 
  			ID = JSON.parse(jsPsych.data.getLastTrialData().select('responses').values).Q0
  			age_ans = JSON.parse(jsPsych.data.getLastTrialData().select('responses').values).Q1
  			gender = JSON.parse(jsPsych.data.getLastTrialData().select('responses').values).Q2
  			sex = JSON.parse(jsPsych.data.getLastTrialData().select('responses').values).Q3
  			if ((ID == '')||(age_ans == '')||(gender == '') || (sex == '')) {
  				alert("Please make sure you answer all questions.");
  				return true
  			}
  			if (isNaN(age_ans)) {
  				alert("Please enter your age as a number (make sure to remove any spaces)")
  				return true
  			} else {
  				age = parseInt(age_ans)
  				return false
  			}
  		},
};
	