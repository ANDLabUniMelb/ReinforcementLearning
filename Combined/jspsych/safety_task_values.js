threat_n_trials= 200;

var threat_images = ['img/gnome_blue.png', 'img/gnome_orange.png', 'img/gnome_green.png', 'img/gnome_purple.png',
			'img/tree_3.png', 'img/tree_9.png', 'img/tree_7.png', 'img/tree_8.png',
			'img/tree_1.png', 'img/tree_2.png', 'img/shield.png', 'img/shield_0.png', 'img/shield_1.png',
			'img/shield_2.png', 'img/shield_3.png', 'img/shield_4.png', 'img/shield_5.png',
			'img/shield_6.png', 'img/shield_7.png', 'img/shield_8.png', 'img/shield_9.png', 'img/flame_0.png', 
			'img/flame_1.png', 'img/flame_2.png', 'img/flame_3.png', 'img/flame_4.png', 'img/flame_5.png', 
			'img/flame_6.png', 'img/flame_7.png', 'img/flame_8.png', 'img/flame_9.png', 'img/flame_10.png', 
			'img/flame_11.png', 'img/flame_12.png', 'img/flame_13.png', 'img/flame_14.png', 'img/flame_15.png', 
			'img/flame_16.png', 'img/flame_17.png', 'img/flame_18.png', 'img/flame_19.png',
			'img/dragon_stakes1.png', 'img/dragon_stakes5.png', 'img/dragon_stakes1_num.png', 'img/dragon_stakes5_num.png'];

var stakes_1 = 'img/dragon_stakes1.png';
var stakes_1 = 'img/dragon_stakes1.png';
var stakes_4 = 'img/dragon_stakes5.png';
var stakes_4 = 'img/dragon_stakes5.png';

var low_stakes = {
    stakes_a: stakes_1,
    stakes_b: stakes_1
};

var high_stakes = {
    stakes_a: stakes_4,
    stakes_b: stakes_4
};

var stakes_1_num = 'img/dragon_stakes1_num.png';
var stakes_1_num = 'img/dragon_stakes1_num.png';
var stakes_4_num = 'img/dragon_stakes5_num.png';
var stakes_4_num = 'img/dragon_stakes5_num.png';

var low_stakes_num = {
    stakes_a: stakes_1_num,
    stakes_b: stakes_1_num
};

var high_stakes_num = {
    stakes_a: stakes_4_num,
    stakes_b: stakes_4_num
};

stakes_types = [
    {stakes: stakes_1_num, ...low_stakes_num},
    {stakes: stakes_1_num, ...low_stakes_num},
    {stakes: stakes_4_num, ...high_stakes_num},
    {stakes: stakes_4_num, ...high_stakes_num},
];

var result_1 = 'img/gnome_blue.png';
var result_2 = 'img/gnome_orange.png';
var result_3 = 'img/gnome_green.png';
var result_4 = 'img/gnome_purple.png';

var choice_11 = {
    name: 'img/tree_3.png',  // shown with choice_12
    result: result_1
}
var choice_21 = {
    name: 'img/tree_9.png',  // shown with choice_22
    result: result_1
}
var choice_12 = {
    name: 'img/tree_7.png',  // shown with choice_11
    result: result_2
}
var choice_22 = {
    name: 'img/tree_8.png',  // shown with choice_21
    result: result_2
}

var choice_8 = {
	name: 'img/tree_1.png',
	result: result_3
}

var choice_9 = {
	name: 'img/tree_2.png',
	result: result_4
}

var choice_5 = {
	name: 'img/gnome_green.png',
	result: result_3
}
var choice_6 = {
	name: 'img/gnome_purple.png',
	result: result_4
}

var get_result = function(choice) {
    if (choice == choice_11.name) return choice_11.result;
    else if (choice == choice_21.name) return choice_21.result;
    else if (choice == choice_12.name) return choice_12.result;
    else if (choice == choice_22.name) return choice_22.result;
    else if (choice == choice_8.name)  return choice_8.result;
    else if (choice == choice_9.name)  return choice_9.result;
	else if (choice == choice_5.name)  return choice_5.result;
    else if (choice == choice_6.name)  return choice_6.result;
}

var choices_types = [
    {choice_a: choice_11, choice_b: choice_12, type: '1'},
    {choice_a: choice_12, choice_b: choice_11, type: '1\''},
    {choice_a: choice_21, choice_b: choice_22, type: '2'},
    {choice_a: choice_22, choice_b: choice_21, type: '2\''},
];


var test_types = [
	{choice_a: choice_8, choice_b: choice_9, type: '3'},
	{choice_a: choice_5, choice_b: choice_6, type: '4'},
];


var resource_img = 'img/shield.png';
var resource_imgs = ['img/shield_0.png', 'img/shield_1.png', 'img/shield_2.png', 'img/shield_3.png',
'img/shield_4.png', 'img/shield_5.png', 'img/shield_6.png', 'img/shield_7.png', 'img/shield_8.png', 'img/shield_9.png'];


var lost_imgs = ['img/flame_0.png', 'img/flame_1.png', 'img/flame_2.png', 'img/flame_3.png',
'img/flame_4.png', 'img/flame_5.png', 'img/flame_6.png', 'img/flame_7.png', 'img/flame_8.png', 'img/flame_9.png',
'img/flame_10.png', 'img/flame_11.png', 'img/flame_12.png', 'img/flame_13.png',
'img/flame_14.png', 'img/flame_15.png', 'img/flame_16.png', 'img/flame_17.png', 'img/flame_18.png', 'img/flame_19.png'];


wording = 'Protected by';
wordings = 'Your outcome';
