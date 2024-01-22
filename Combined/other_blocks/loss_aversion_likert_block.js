var prompt = {
	type: 'html-keyboard-response',
	stimulus:'<p>Please select which gamble you would prefer to take. </p>' +
		'<p> Press the space bar to start </p>',
    choices:['space'], 
};

var LA = {
	type: 'survey-multi-select',
	questions:[
		{prompt: '<p style="text-align:center; font-size:32px"><b>For each question, pick which outcome you prefer:</b>'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $10"],
		horizontal: true,
		required: true, 
		name: 'LA1'},
	

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $12"],
		horizontal: true,
		required: true, 
		name: 'LA2'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $14"],
		horizontal: true,
		required: true, 
		name: 'LA3'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $16"],
		horizontal: true,
		required: true, 
		name: 'LA4'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $18"],
		horizontal: true,
		required: true, 
		name: 'LA5'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18x">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $20"],
		horizontal: true,
		required: true, 
		name: 'LA6'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $22"],
		horizontal: true,
		required: true, 
		name: 'LA7'},
		
		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $24"],
		horizontal: true,
		required: true, 
		name: 'LA8'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $26"],
		horizontal: true,
		required: true, 
		name: 'LA9'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $28"],
		horizontal: true,
		required: true, 
		name: 'LA10'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $30"],
		horizontal: true,
		required: true, 
		name: 'LA11'},

		{prompt:'<p style="text-align:center; font-size:24px">'+
		'<p style="text-align:center; font-size:18px">Pick the gamble you would prefer to take:',
		options: ["100% chance of winning $0", "50% chance of losing $10, 50% chance of winning $32"],
		horizontal: true,
		required: true, 
		name: 'LA12'}		
	],
	randomize_question_order:false
};

var loss_aversion_block = {
	timeline: [prompt, LA],
	randomize_order: false,
};

