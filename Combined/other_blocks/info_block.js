var ID = ''
var run = ''
var task = ''
    
    
var info_block = {
  		timeline: [
  			{
  				type: 'survey-text',
  				preamble: ["Please wait for the experimenter"],
  				questions: [{prompt: "Subject ID", required: true}, {prompt: "Run #", required: true}, {prompt: "Task Type", required: true}],
  			}
  		],
  		loop_function: function(data){
  			var 
  			ID = JSON.parse(jsPsych.data.getLastTrialData().select('responses').values).Q0
  			run = JSON.parse(jsPsych.data.getLastTrialData().select('responses').values).Q1
  			task = JSON.parse(jsPsych.data.getLastTrialData().select('responses').values).Q2
  			if ((ID == '')||(run == '')||(task == '')) {
  				alert("Please make sure you answer all questions.");
  				return true
  			}
  		},
};
	