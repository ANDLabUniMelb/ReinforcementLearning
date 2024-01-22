rwd_n_trials = 200;


var rwd_images = ['img/elf_blue.png', 'img/elf_orange.png', 'img/elf_yellow.png', 'img/elf_purple.png',
			'img/house_3.png', 'img/house_4.png', 'img/house_2.png', 'img/house_6.png',
			'img/house_1.png', 'img/house_5.png', 'img/sack.png', 'img/sack_0.png', 'img/sack_1.png',
			'img/sack_2.png', 'img/sack_3.png', 'img/sack_4.png', 'img/sack_5.png',
			'img/sack_6.png', 'img/sack_7.png', 'img/sack_8.png', 'img/sack_9.png', 'img/coins_0.png', 
			'img/coins_1.png', 'img/coins_2.png', 'img/coins_3.png', 'img/coins_4.png', 'img/coins_5.png', 'img/coins_6.png', 
			'img/coins_7.png', 'img/coins_8.png', 'img/coins_9.png','img/coins_10.png', 'img/coins_11.png', 'img/coins_12.png', 
			'img/coins_13.png','img/coins_14.png', 'img/coins_15.png', 'img/coins_16.png', 'img/coins_17.png', 'img/coins_18.png', 'img/coins_19.png',
			'img/fairy_stakes1.png', 'img/fairy_stakes5.png', 'img/dragon_stakes1_num.png', 'img/dragon_stakes5_num.png'];

var rwd_stakes_1 = 'img/fairy_stakes1.png';
var rwd_stakes_1 = 'img/fairy_stakes1.png';
var rwd_stakes_4 = 'img/fairy_stakes5.png';
var rwd_stakes_4 = 'img/fairy_stakes5.png';

var rwd_low_stakes = {
    stakes_a: rwd_stakes_1,
    stakes_b: rwd_stakes_1
};

var rwd_high_stakes = {
    stakes_a: rwd_stakes_4,
    stakes_b: rwd_stakes_4
};

var rwd_stakes_1_num = 'img/dragon_stakes1_num.png';
var rwd_stakes_1_num = 'img/dragon_stakes1_num.png';
var rwd_stakes_4_num = 'img/dragon_stakes5_num.png';
var rwd_stakes_4_num = 'img/dragon_stakes5_num.png';

var rwd_low_stakes_num = {
    stakes_a: rwd_stakes_1_num,
    stakes_b: rwd_stakes_1_num
};

var rwd_high_stakes_num = {
    stakes_a: rwd_stakes_4_num,
    stakes_b: rwd_stakes_4_num
};

rwd_stakes_types = [
    {stakes: rwd_stakes_1_num, ...rwd_low_stakes_num},
    {stakes: rwd_stakes_1_num, ...rwd_low_stakes_num},
    {stakes: rwd_stakes_4_num, ...rwd_high_stakes_num},
    {stakes: rwd_stakes_4_num, ...rwd_high_stakes_num},
];

var rwd_result_1 = 'img/elf_blue.png';
var rwd_result_2 = 'img/elf_orange.png';
var rwd_result_3 = 'img/elf_yellow.png';
var rwd_result_4 = 'img/elf_purple.png';


var rwd_choice_11 = {
    name: 'img/house_3.png',  // shown with rwd_choice_12
    result: rwd_result_1
}
var rwd_choice_21 = {
    name: 'img/house_4.png',  // shown with rwd_choice_22
    result: rwd_result_1
}
var rwd_choice_12 = {
    name: 'img/house_2.png',  // shown with rwd_choice_11
    result: rwd_result_2
}
var rwd_choice_22 = {
    name: 'img/house_6.png',  // shown with rwd_choice_21
    result: rwd_result_2
}

var rwd_choice_8 = {
	name: 'img/house_1.png',
	result: rwd_result_3
}

var rwd_choice_9 = {
	name: 'img/house_5.png',
	result: rwd_result_4
}

var rwd_choice_5 = {
	name: 'img/elf_yellow.png',
	result: rwd_result_3
}
var rwd_choice_6 = {
	name: 'img/elf_purple.png',
	result: rwd_result_4
}

var rwd_get_result = function(choice) {
    if (choice == rwd_choice_11.name) return rwd_choice_11.result;
    else if (choice == rwd_choice_21.name) return rwd_choice_21.result;
    else if (choice == rwd_choice_12.name) return rwd_choice_12.result;
    else if (choice == rwd_choice_22.name) return rwd_choice_22.result;
    else if (choice == rwd_choice_8.name)  return rwd_choice_8.result;
    else if (choice == rwd_choice_9.name)  return rwd_choice_9.result;
    else if (choice == rwd_choice_5.name)  return rwd_choice_5.result;
    else if (choice == rwd_choice_6.name)  return rwd_choice_6.result;
}

var rwd_choices_types = [
    {choice_a: rwd_choice_11, choice_b: rwd_choice_12, type: '1'},
    {choice_a: rwd_choice_12, choice_b: rwd_choice_11, type: '1\''},
    {choice_a: rwd_choice_21, choice_b: rwd_choice_22, type: '2'},
    {choice_a: rwd_choice_22, choice_b: rwd_choice_21, type: '2\''},
];


var rwd_test_types = [
	{choice_a: rwd_choice_8, choice_b: rwd_choice_9, type:'3'},
	{choice_a: rwd_choice_5, choice_b: rwd_choice_6, type:'4'},
];


var rwd_resource_img = 'img/sack.png';
var rwd_resource_imgs = ['img/sack_0.png', 'img/sack_1.png', 'img/sack_2.png', 'img/sack_3.png',
'img/sack_4.png', 'img/sack_5.png', 'img/sack_6.png', 'img/sack_7.png', 'img/sack_8.png', 'img/sack_9.png'];


var rwd_lost_imgs = ['img/coins_0.png', 'img/coins_1.png', 'img/coins_2.png', 'img/coins_3.png',
'img/coins_4.png', 'img/coins_5.png', 'img/coins_6.png', 'img/coins_7.png', 'img/coins_8.png', 'img/coins_9.png',
'img/coins_10.png', 'img/coins_11.png', 'img/coins_12.png', 'img/coins_13.png',
'img/coins_14.png', 'img/coins_15.png', 'img/coins_16.png', 'img/coins_17.png', 'img/coins_18.png', 'img/coins_19.png'];

rwd_wording = 'You received';
rwd_wordings = 'Your outcome';
