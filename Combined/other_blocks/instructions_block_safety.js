var instructions_block = {
	type:'instructions',
    pages: ['<p>In this game, you are traveling through a forest.<p>' +
    	'<p>Along the way, you will encounter dragons that can attack you.<p>' +
    	'<p>Each attack means you will lose some points. One dragon attack costs one point.</p>' +
    	'<br><p>Gnomes also live in the forest and make shields that can protect you from the dragons.<p>' +
    	'<p><b>Your goal is to learn which gnome makes the most shields ' +
    	'so you can get as much protection as possible.</b></p>',
    	'<p>In each round you will first be shown ' +
        'the dragon you will encounter.<p>' +
        '<p>When you encounter the <b>small dragon</b>, the shields you get from the gnomes will be <b>multiplied by 1</b>.</p>'+
        '<p> When you encounter the <b>big dragon</b>, the shields you get from the gnomes will be <b>multiplied by 5</b>. </p>'+ 
        'But the big dragon can also attack with 5x more flames so you need more shields to fully protect yourself.</p>' +
        '<br></p><p>The dragons you may encounter are as follows:</p>' +
        '<div class=group>' +
        instructions_stakes_content(low_stakes.stakes_a, high_stakes.stakes_a) +
        '</div>',
        '<p>After you see the dragon, you will see two trees.<p>' +
        '<p>Each tree leads to a specific gnome.<p>'+ 
        '<br><p>You will see one of the following two ' +
        'pairs of trees. <b>Each tree will always lead to the same ' +
        'gnome.</b></p>' +
        '<div class=group>' +
        decision_content(choices_types[0].choice_a, choices_types[0].choice_b) +
       '</div><br><div class=group>' +
        decision_content(choices_types[3].choice_a, choices_types[3].choice_b) +
        '</div><br>',
        '</div><p>In each round, you must choose which tree, and therefore ' +
        'which gnome, you will visit.</p>' + 
        '<p>You will only have 1.5 seconds to make your decision. ' +
        'If you make a decision early, you will not ' +
        'move to the next round any faster. <p>' +
        '<p> Instead, your chosen tree will have a gray box around it like this (below) ' +
        'for the remaining time.</p>' +
        '<div><img class=responded src=' + choice_11.name + ' style="zoom:100%;"/></div><br>',
        '<p>Once you have chosen a tree, you will be shown which gnome you visited.</p>' +
        '<p>When you are shown the gnome, <b>you will need to press space to see how many shields they make.</b></p> ' +
        '<p>Gnomes can make from 0-9 shields. <br> Remember, when you encounter the big dragon, your shields will be multiplied 5x.</p>'+
        '<br><p><b>The number of shields each gnome is able to ' +
        'make changes as the task continues. </b></p>' +
        '<p>But the changes are gradual enough that you can ' +
        'expect the same gnome to give you a similar number of shields on ' + 'successive rounds.</p>' +
        '<div class=group>' +
        outcome_content(result_1, resource_img, 3) + 
        '</div><br>',
        '<p>After you receive the shields from the gnome, you will be ' +
        'shown how many of the dragon\'s attack the ' +
        'shields you received protected you from.</p>' +
        '<p> In this example, the dragon is a small dragon. But you only received 3 shields, so you still got attacked by 6 flames. </p>' +
        '<p> You can think of this similar to losing 6 points. </p>' +
        '<p><b> Remember, the gnomes can make from 0 to 9 shields.</b></p>' +
        '<div class=group>' +
        report_content(stakes_1_num, resource_imgs[3], 3, wording, lost_imgs[6], wordings) +
        '</div><br>',
        '<p> In the example below, the dragon you encountered was a big dragon. </p>'+
        '<p> You received 8 shields, which was multiplied by 5 to give you 40 shields! </p>' +
        '<p> But because the big dragon has more flames, you still lost 5 points. </p>' +
        '<p> You need all 9 shields to be fully protected.</p>' +
        '<div class=group>' +
        report_content(stakes_4_num, resource_imgs[8], 40, wording, lost_imgs[11], wordings) +
        '</div><br>',
        '<p>To select a tree and visit a gnome, you will press "F" and "J".<p>' +
        '<p>Pressing "F" selects the tree on the left (orange) <p>' +
        '<p>Pressing "J" selects the tree on the right (purple)</p>' +
        '<div class=group>' +
        decision_content(choices_types[0].choice_a, choices_types[0].choice_b) +
        '</div><br>',
        '<p style="font-size:24px">Remember, if you do well you can receive a <b>$100 bonus</b> through the high-performers lottery. </p>'+
        '<p style="font-size:24px">You want to earn as many shields as possible to reduce your attacks.</p>' +
    	'<p style="font-size:24px">So try your best to learn which gnome makes the most shields!</p>' ,],
    show_clickable_nav: true
};


