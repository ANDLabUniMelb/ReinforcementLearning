var instructions_block_rwd = {
	type:'instructions',
	pages: ['<p>In this game, you are traveling through a forest.<p>' +
    	'<p> Along the way, you will encounter dragons that can attack you.</p>' +
    	'<p>Each attack means you will lose some points. One attack flame costs one point.</p>' +
    	'<br><p>To find out how many attacks you receive, you must visit elves that also live in the forest.<p>' +
    	'<p><b>Your goal is to learn which elves have the most flames so you can avoid as many attacks as possible.</b></p>' +
    	'<p>In each round you will first be shown ' +
        'the dragon you will encounter.<p>' +
        '<p>When you encounter the <b>small dragon</b>, the flames the elves attack with will be <b>multiplied by 1</b>.</p>'+
        '<p> When you encounter the <b>big dragon</b>, the flames the elves attack you with will be <b>multiplied by 5</b>. </p>'+ 
        '<br><p>The dragons you may encounter are as follows:</p>' +
        '<div class=group>' +
        rwd_instructions_stakes_content(rwd_low_stakes.stakes_a, rwd_high_stakes.stakes_a) +
        '</div>',
        '<p>After you see the dragon, you will see two houses.<p>' +
        '<p>Each house leads to a specific elf.<p>'+ 
        '<p>You will see one of the following two ' +
        'pairs of houses. <b>Each house will always lead to the same ' +
        'elf.</b></p>' +
        '<div class=group>' +
        rwd_decision_content(rwd_choices_types[0].choice_a, rwd_choices_types[0].choice_b) +
       '</div><br><div class=group>' +
        rwd_decision_content(rwd_choices_types[3].choice_a, rwd_choices_types[3].choice_b) +
        '</div><br>',
        '</div><p>In each round, you must choose which house, and therefore ' +
        'which elf, you will visit.<p>' + 
        '<p>You will only have 1.5 seconds to make your decision.' +
        ' If you make a decision early, you will not ' +
        'move to the next round any faster. <p>' +
        '<p> Instead, your chosen house will have a gray box around it like this (below) ' +
        'for the remaining time.</p>' +
        '<div><img class=responded src=' + rwd_choice_11.name + ' style="zoom:100%;"/></div><br>',
        '<p>Once you have chosen a house, you will be shown which elf you visited.</p>' +
        '<p>When you are shown the elf, <b>you will need to press space to see how many flames they have.</b></p> ' +
        '<p>Elves have from 0-9 flames. <br> Remember, when you encounter the big dragon, your flames will be multiplied 5x.</p>'+
        '<br><p><b>The number of flames each elf has ' +
        'changes as the task continues. </b></p>' +
        '<p>But the changes are gradual enough that you can ' +
        'expect the same elf to attack you with a similar number of flames on ' + 'successive rounds.</p>' +
        '<div class=group>' +
        rwd_outcome_content(rwd_result_1, rwd_resource_img, 3) + 
        '</div><br>',
        '<p>After you see how many flames the elf has, you will be ' +
        'shown how many total flames you received based on the dragon you encountered.</p>' +
        '<p> In this example, the dragon is a small dragon. You received 3 flames, so you got attacked by 3 flames. </p>' +
        '<p> You can think of this similar to losing 3 points. </p>' +
        '<p><b> Remember, the elves can give 0 to 9 flames.</b></p>' +
        '<div class=group>' +
        rwd_report_content(rwd_stakes_1_num, rwd_resource_imgs[3], 3, rwd_wording, rwd_lost_imgs[6], rwd_wordings) +
        '</div><br>',
        '<p> In the example below, the dragon you encountered was a big dragon. </p>'+
        '<p> You received 8 flames, which was multiplied by 5 to got attacked by 40 flames! </p>' +
        '<p> Because you encountered the big dragon, you lost 40 points. </p>' +
        '<div class=group>' +
        rwd_report_content(rwd_stakes_4_num, rwd_resource_imgs[8], 40, rwd_wording, rwd_lost_imgs[11], rwd_wordings) +
        '</div><br>',
        '<p>To select a house and visit an elf, you will press "F" and "J".<p>' +
        '<p>Pressing "F" selects the house on the left (green) <p>' +
        '<p>Pressing "J" selects the house on the right (red)</p>' +
        '<div class=group>' +
        rwd_decision_content(rwd_choices_types[0].choice_a, rwd_choices_types[0].choice_b) +
        '</div><br>',
        '<p style="font-size:24px">Remember, if you do well you can receive a <b>$100 bonus</b> through the high-performers lottery.</p>' +
        '<p style="font-size:24px">You want to avoid losing points to have the best score possible.</p>' +
    	'<p style="font-size:24px">So try your best to learn which elf has the least flames!</p>' ,],
    show_clickable_nav: true
};