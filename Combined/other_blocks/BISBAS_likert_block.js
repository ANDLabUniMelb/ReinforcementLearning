var prompt = {
	type: 'html-keyboard-response',
	stimulus:'<p><b> Now you will answer a few questionnaires</b></p>' +
		'<br> The following are statements that a person may either agree with or disagree with.</br>' +
		'<p>For each item, indicate how much you agree or disagree with what the item says by clicking your response. </p>' +
		'<p> Choose only one response and be as accurate and honest as you can. Do not worry about being consistent in your responses. </p>' +
		'<p> Press the space bar to start </p>',
    choices:['space'], 
};

var scale = [
	"Very true for me",
	"Somewhat true for me",
	"Somewhat false for me",
	"Very false for me"
];

var BIS_BAS = {
	type: 'survey-likert',
	questions:[
		{prompt: '<p style="text-align:center; font-size:24px">A person\'s family is the most important thing in life.',
		required: true, 
		name: 'BISBAS1', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">Even if something bad is about to happen to me, I rarely experience fear or nervousness.',
		required: true, 
		name: 'BISBAS2', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I go out of my way to get things I want.',
		required: true, 
		name: 'BISBAS3', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">When I\'m doing well at something, I love to keep at it.',
		required: true, 
		name: 'BISBAS4', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I am always willing to try something new if I think it will be fun.',
		required: true, 
		name: 'BISBAS5', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">How I dress is important to me.',
		required: true, 
		name: 'BISBAS6', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">When I get something I want, I feel excited and energized.',
		required: true, 
		name: 'BISBAS7', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">Criticism or scolding hurts me quite a bit.',
		required: true, 
		name: 'BISBAS8', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">When I want something, I usually go all-out to get it.',
		required: true, 
		name: 'BISBAS9', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">I will often do things for no other reason than that they might be fun.',
		required: true, 
		name: 'BISBAS10', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">It\'s hard for me to find the time to do things such as get a haircut.',
		required: true, 
		name: 'BISBAS11', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">If I see a chance to get something I want, I move on it right away.',
		required: true, 
		name: 'BISBAS12', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel pretty worried or upset when I think or know someone is angry at me.',
		required: true, 
		name: 'BISBAS13', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">When I see an opportunity for something I like, I get excited right away.',
		required: true, 
		name: 'BISBAS14', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I often act on the spur of the moment.',
		required: true, 
		name: 'BISBAS15', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">If I think something unpleasant is going to happen, I usually get pretty worked up.',
		required: true, 
		name: 'BISBAS16', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I often wonder why people act the way they do.',
		required: true, 
		name: 'BISBAS17', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">When good things happen to me, it affects me strongly.',
		required: true, 
		name: 'BISBAS18', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I feel worried when I think I have done poorly at something.',
		required: true, 
		name: 'BISBAS19', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I crave excitement and new sensations.',
		required: true, 
		name: 'BISBAS20', 
		labels: scale},

		{prompt: '<p style="text-align:center; font-size:24px">When I go after something, I use a no holds barred approach.',
		required: true, 
		name: 'BISBAS21', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I have very few fears compared to my friends.',
		required: true, 
		name: 'BISBAS22', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">It would excite me to win a contest.',
		required: true, 
		name: 'BISBAS23', 
		labels: scale},
	
		{prompt: '<p style="text-align:center; font-size:24px">I worry about making mistakes.',
		required: true, 
		name: 'BISBAS24', 
		labels: scale}
		
	],
	randomize_question_order:false
};

var BISBAS_block = {
	timeline: [prompt, BIS_BAS],
	randomize_order: false,
};

