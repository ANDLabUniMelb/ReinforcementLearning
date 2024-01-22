function rwd_instructions_stakes_content(stakes_a, stakes_b) {
    return '<table class=table_center><tr>' +
            '<td class=prompt colspan=3>You could encounter</td>' +
        '</tr><tr style="height: 300px;">' +
            '<td><img src=' + stakes_a + ' style="zoom: 40%;"/></td>' +
            '<td class=prompt>OR</td>' +
            '<td><img src=' + stakes_b + ' style="zoom: 40%;"/></td>' +
        '</tr></table>'
};

function rwd_init_stakes_content(stakes_a) {
    return '<table class=table_center><tr>' +
            '<td class=prompt colspan=3>You will encounter</td>' +
        '</tr><tr style="height: 300px;">' +
            '<td><img src=' + stakes_a + ' style="zoom: 40%;"/></td>' +
        '</tr></table>'
};


function rwd_decision_content(choice_a, choice_b) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=2>Choose one</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td style="width: 300px;">' +
            '<img id="left" src=' + choice_a.name + ' style="zoom: 100%;"/></td>'  +
        '<td style="width: 300px;">' +
            '<img id="right" src=' + choice_b.name + ' style="zoom: 100%;"/></td>' +
      '</tr></table>'
};

function rwd_motor_content(choice, result) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=2>You visited</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td style="width: 70px;">' +
            '<img style="opacity: 0.5; zoom: 0.5;" src=' + choice + ' style="zoom: 100%;"/></td>' +
        '<td style="width: 300px;">' +
            '<img src=' + result + ' style="zoom: 100%;"/></td>' +
      '</tr></table>';
};

// For some reason, seems to increase separation between choice and result
// images compared to motor_content. Not sure why.
function rwd_motor_reminder_content(choice, result) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=2>Remember to press space!</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td style="width: 70px;">' +
            '<img style="opacity: 0.5; zoom: 0.5;" src=' + choice + ' style="zoom: 100%;"/></td>' +
        '<td style="width: 300px;">' +
            '<img src=' + result + ' style="zoom: 100%;"/></td>' +
        '</tr></table>';
};

function rwd_confidence_estimate_content(result) {
    return '<table class=table_center><tr>' +
        '<td class=prompt>How many flames do you think you will receive <br>from the elf you visited?<br></td>' +
		'</tr><tr><td><img style="zoom: 0.5;" src=' + result + ' style="zoom: 100%;"/></td></tr>' +
        '<tr><td class=prompt><p>Type your best estimate from 0-9 <br>using the keypad and press enter<br></p>'+
            '<input type="text" id="estimate"/>' +
        '</td>' +
      '</tr></table>';
};


// with buttons formatting is not as pretty as I'd like
//function confidence_certainty_content(result) {
  //  return '<table class=table_center><tr>' +
    //    '<td class=prompt style="width: 400px;">' +
      //      'How confident are you that you chose the house ' +
        //    'that will lead to the most sacks? (click one)'+
        //'</td>' +
      //'</tr><tr style="height: 100px;">' +
        //'<td><form>' +
                //'<label for="certaintymin">Not sure</label>' +
                //'<input type="button" id="certainty-0" value="0"/>' +
                //'<input type="button" id="certainty-1" value="1"/>' +
                //'<input type="button" id="certainty-2" value="2"/>' +
                //'<input type="button" id="certainty-3" value="3"/>' +
                //'<input type="button" id="certainty-4" value="4"/>' +
                //'<input type="button" id="certainty-5" value="5"/>' +
                //'<input type="button" id="certainty-6" value="6"/>' +
                //'<label for="certaintymax">Very sure</label>' +
        //'</form></td>' +
      //'</tr></table>';
//};

// with numeric formatting 
function rwd_confidence_certainty_content() {
    return '<table class=table_center><tr>' +
        		'<td class=prompt><p> How certain are you '+
        		'that you picked the house<br>' +
            'that will lead to fewer flames?</br></p></td>'+
      	'</tr><tr style="height: 100px;">' +
        '<td><form>' +
                '<label for="certaintymin">Not at all certain</label>' +
                '<label for="certaintymin0"> 0 </label>' +
                '<label for="certaintymin1"> 1 </label>' +
                '<label for="certaintymin2"> 2 </label>' +
                '<label for="certaintymin3"> 3 </label>' +
                '<label for="certaintymin4"> 4 </label>' +
                '<label for="certaintymin5"> 5 </label>' +
                '<label for="certaintymin6"> 6 </label>' +
                '<label for="certaintymin7"> 7 </label>' +
                '<label for="certaintymin8"> 8 </label>' +
                '<label for="certaintymin9"> 9 </label>' +
                '<label for="certaintymax">Very certain</label>' +
        '</form></td></tr>' +
        '<td class=prompt colspan=2><p>Type your best estimate from 0-9<br>'+ 
        'using the keypad and press enter<br></p>' +
            '<input type="text" id="certainty"/>' +
        '</td>' +
    '</tr></table>';
};


function rwd_outcome_content(result, resource, resource_count) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=3>You received</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td><img src=' + result + ' style="zoom: 100%;"/></td>' +
        '<td><img src=' + resource + ' style="zoom: 30%;"/></td>' +
        '<td class=prompt>x ' + resource_count + '</td>' +
      '</tr></table>';
};

function rwd_fin_stakes_content(stakes) {
    return '<table class=table_center><tr>' +
        '<td class=prompt>You encountered</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td><img src=' + stakes + ' style="zoom: 100%;"/></td>' +
      '</tr></table>';
};


function rwd_report_content(stakes, rwd_resource_img, report_value, rwd_wording, rwd_lost_img, rwd_wordings) {
    return '<table class=table_center><tr>' +
            '<td class=prompt>' + rwd_wording + ' ' + report_value + ' flames</td>' +
             '</tr>'+  
             '<tr style="height: 30px; width="500px;">' +
            '<td><img src=' + stakes + ' style="zoom: 30%;"/>' +
            '<img src=' + rwd_resource_img  +  ' style="zoom: 40%;"/></td>' + 
        '</tr>' +
             '<tr style="height: 30px; width="500px;">' +
           '<td class=responded >' + rwd_wordings + 
           '<img src=' + rwd_lost_img  +  ' style="zoom: 30%;"/></td></tr>'  +
            '</tr></table>';
};


//function confidence_estimate_content(result) {
    //return '<table class=table_center><tr>' +
        //'<td>' +
            //'<img src=' + result + '/>' +
        //'</td><td class=prompt style="width: 200px;">' +
            //'<p>How many sacks do you think you will recieve?</p>' +
            //'<p>Click the text box, type your best estimate from 0-9, and press enter</p>' +
            //'<input type="text" id="estimate"/>' +
        //'</td>' +
      //'</tr></table>';
//};



//function tradeoff_use_content(resource_img, num, block_index, block_length) {
//    return '<table class=table_center><tr>' +
//            '<td class=prompt colspan=2>(' + block_index + '/' + block_length + ') Use your' + num + ' saved ' + <img src=resource_img> + '?</td>' +
//        '</tr><tr style="height: 300px;">' +
//            '<td>No</td>' +
//            '<td>Yes</td>' +
//        '</tr></table>'
//};

//function tradeoff_save_content(resource_img, block_index, block_length) {
//    return '<table class=table_center><tr>' +
//            '<td class=prompt colspan=2>Save ' + <img src=resource_img> + ' for later? Input the number you would like to save.</td>' +
//        '</tr><tr>' +
//            '<input type="text" id="save"/>' +
//        '</tr></table>'
//};
