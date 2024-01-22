var end_block = {
      type: 'html-keyboard-response',
      stimulus: '<div>End of the study, thank you for participating!'+
      '<p>We will notify you within 48 hours if you received the $100 lottery prize.</p>'+
      '<br><br><br>' + 
        '<b>Press the space bar to get your completion code.</b> Thank you!' +
        //'Click <a href="https://app.prolific.ac/submissions/complete?cc=WRYNQLA7">here</a> to complete the study!' +
        '</div>',
      //on_start: function(trial) {
          //db.collection("tasks").doc('protect').collection('subjects').doc(uid).update({
        //});
      //trial.stimulus = '<div>End of the task, thank you for participating!<br><br>' + 
        //'Click <a href="https://app.prolific.ac/submissions/complete?cc=WRYNQLA7">here</a> to complete the study!' +
        //'</div>'},    
  		choices: ['space']
    	//choices: jsPsych.NO_KEYS
};

//commented section saves data on server
//stimulus: ''
//then uncomment on_start: .... div>'},
//replace choices:['space'] with No Keys, space is just there for data gathering right now

 