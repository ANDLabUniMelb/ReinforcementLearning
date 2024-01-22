var prompt = {
	type: 'html-keyboard-response',
	stimulus:'<p>Please indicate for each statement how you <b> generally </b> feel. </p>' +
		'<p> Press the space bar to start </p>',
    choices:['space'], 
};

var scale = [
	"Almost never",
	"Sometimes",
	"Often",
	"Almost always"
];

var STAIT = {
	type: 'survey-likert',
	questions:[
		{prompt: '<p style="text-align:center; font-size:32px"><b>Generally...</b>'+
		'<p style="text-align:center; font-size:24px">I feel pleasant',
		required: true, 
		name: 'STAIT1', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel nervous and restless',
		required: true, 
		name: 'STAIT2', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel satisfied with myself',
		required: true, 
		name: 'STAIT3', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I wish I could be as happy as others seem to be',
		required: true, 
		name: 'STAIT4', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel like a failure',
		required: true, 
		name: 'STAIT5', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel rested',
		required: true, 
		name: 'STAIT6', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">I am calm, cool, and collected',
		required: true, 
		name: 'STAIT7', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">I feel that difficulties are piling up so that I cannot overcome them',
		required: true, 
		name: 'STAIT8', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I worry too much over something that really doesn\'t matter',
		required: true, 
		name: 'STAIT9', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">I am happy',
		required: true, 
		name: 'STAIT10', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">I have disturbing thoughts',
		required: true, 
		name: 'STAIT11', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I lack self-confidence',
		required: true, 
		name: 'STAIT12', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel secure',
		required: true, 
		name: 'STAIT13', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I make decisions easily',
		required: true, 
		name: 'STAIT14', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel inadequate',
		required: true, 
		name: 'STAIT15', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">I am content',
		required: true, 
		name: 'STAIT16', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">Some unimportant thought runs through my mind and bothers me',
		required: true, 
		name: 'STAIT17', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I take disappointments so keenly that I can\'t put them out of my mind',
		required: true, 
		name: 'STAIT18', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I am a steady person',
		required: true, 
		name: 'STAIT19', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I get in a state of tension or turmoil as I think over my recent concerns and interests',
		required: true, 
		name: 'STAIT20', 
		labels: scale}
		
	],
	randomize_question_order:false
};

var STAIT_block = {
	timeline: [prompt, STAIT],
	randomize_order: false,
};

