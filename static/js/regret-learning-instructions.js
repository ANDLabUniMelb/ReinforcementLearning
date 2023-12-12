//------------------------------------//
// Define parameters.
//------------------------------------//

// Define images to preload.
const instruction_images = [
  "static/img/instructions/instructions01.png",
  "static/img/instructions/instructions02.png",
  "static/img/instructions/instructions03.png",
  "static/img/instructions/instructions04.png",
  "static/img/instructions/instructions05.png",
  "static/img/instructions/instructions06.png",
  "static/img/instructions/instructions07.png",
  "static/img/instructions/instructions08.png",
  "static/img/instructions/instructions09.png",
  "static/img/instructions/instructions10.png",
  "static/img/instructions/instructions11.png",
  "static/img/instructions/instructions12.png",
  "static/img/instructions/instructions13.png",
  "static/img/instructions/instructions14.png",
  "static/img/instructions/instructions15.png",
  "static/img/instructions/instructions16.png",
  "static/img/instructions/instructions17.png",
  "static/img/instructions/instructions18.png",
  "static/img/instructions/instructions19.png",
  "static/img/instructions/instructions20.png",
  "static/img/instructions/instructions21.png",
  "static/img/instructions/instructions22.png",
  "static/img/instructions/instructions23.png",
  "static/img/instructions/instructions24.png",
  "static/img/instructions/instructions25.png",
  "static/img/instructions/instructions26.png",
  "static/img/instructions/instructions27.png"
];


// Define image scaling CSS.
const style = "width:auto; height:auto; max-width:100%; max-height:450px;";

//------------------------------------//
// Define instructions (part 1).
//------------------------------------//

instructions01 = {
  type: 'regret-learning-instructions',
  pages: [
    `<img src="static/img/instructions/instructions01.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions02.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions03.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions04.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions05.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions06.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions07.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions08.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions09.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions10.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions11.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions12.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions13.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions14.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions15.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions16.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions17.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions18.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions19.png" style="${style}"></img>`,
  ],
  button_label_previous: 'Prev',
  button_label_next: 'Next',
  on_start: function(trial) {
    pass_message('Started instructions');
  }
}

practice = {
  timeline: [{
    block:                  0,
    trial:                  0,
    phase:                  'practice',
    type:                   "regret-learning-trial",
    all_suit_paths:         [
                              'static/img/card-decks/practice_deck_1.png',
                              'static/img/card-decks/practice_deck_2.png'
                            ],
    trial_type:             jsPsych.timelineVariable('trial_type'),
    suits:                  jsPsych.timelineVariable('suits'),
    probabilities:          jsPsych.timelineVariable('probabilities'),
    suit_permutation_index: [0, 1],
    randomise_lr:            0
  }],
  timeline_variables: [
    {trial_type: 'chosen-feedback',   suits: [0,1], probabilities: [0.75, 0.5]},
    {trial_type: 'chosen-feedback',   suits: [0,1], probabilities: [0.75, 0.5]},
    {trial_type: 'both-feedback',     suits: [0,1], probabilities: [0.75, 0.5]},
    {trial_type: 'unchosen-feedback', suits: [0,1], probabilities: [0.75, 0.5]},
    {trial_type: 'attention-check',   suits: [0,1], probabilities: [1, 0]}
  ],
  randomize_order: false
}


//------------------------------------//
// Define instructions (part 2).
//------------------------------------//

instructions02 = {
  type: 'regret-learning-instructions',
  pages: [
    `<img src="static/img/instructions/instructions20.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions21.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions22.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions23.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions24.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions25.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions26.png" style="${style}"></img>`,
    `<img src="static/img/instructions/instructions27.png" style="${style}"></img>`
  ],
  button_label_previous: 'Prev',
  button_label_next: 'Next',
}

var comprehension = {
  type: 'regret-learning-comprehension',
}

var check_answers = {
  type: "call-function",
  func: function() {

    // Extract data
    data = jsPsych.data.get()

    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // End timeline if all responses are correct.
    if (num_errors == 0) {
      jsPsych.endCurrentTimeline();
    }
  }
}

var corrective_feedback = {
  type: "html-keyboard-response",
  stimulus: "Unfortunately, you did not answer all questions correctly.<br>Press any key to view the instructions again from the start."
};

//------------------------------------//
// Define instructions block.
//------------------------------------//

// Define instructions loop.
var INSTRUCTIONS = {
  timeline: [
    instructions01,
    practice,
    instructions02,
    comprehension,
    check_answers,
    corrective_feedback
  ],
  loop_function: function(data) {

    // Extract number of errors.
    const num_errors = data.values().slice(-3)[0].num_errors;

    // Check if instructions should repeat.
    if (num_errors > 0) {
      return true;
    } else {
      return false;
    }

  }
}
