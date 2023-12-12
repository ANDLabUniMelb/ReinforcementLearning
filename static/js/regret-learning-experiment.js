//---------------------------------------//
// Define parameters.
//---------------------------------------//

// Define task parameters.
const n_trials_per_block = 25;
const all_probe_lags = [3, 4, 4, 4, 5, 5]
const n_blocks = 9;

//---------------------------------------//
// Define stimuli.
//---------------------------------------//

// Define card colours (randomized)
const suit_paths = [
  'static/img/card-decks/deck_01.png',
  'static/img/card-decks/deck_02.png',
  'static/img/card-decks/deck_03.png',
  'static/img/card-decks/deck_04.png',
  'static/img/card-decks/deck_05.png',
  'static/img/card-decks/deck_06.png',
  'static/img/card-decks/deck_07.png',
  'static/img/card-decks/deck_08.png',
  'static/img/card-decks/deck_09.png',
  'static/img/card-decks/deck_10.png',
  'static/img/card-decks/deck_11.png',
  'static/img/card-decks/deck_12.png',
  'static/img/card-decks/deck_13.png',
  'static/img/card-decks/deck_14.png',
  'static/img/card-decks/deck_15.png',
  'static/img/card-decks/deck_16.png',
  'static/img/card-decks/deck_17.png',
  'static/img/card-decks/deck_18.png'
];

let indices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

let suit_permutation_index = indices
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

//----------------------
// demographic survey
//----------------------
var DEMO_SURVEY = {
  type: "survey-demo",
  on_finish: function(data) {
    pass_message("Finished demographic questionnaire")
  }
}

//----------------------
// Macarthur survey
//----------------------
var MACARTHUR_SURVEY = {
  type: "survey-macarthur",
  on_finish: function(data) {
      pass_message("Finished Macarthur survey")
  }
}

//----------------------
// PERCI screening survey
//----------------------
var PERCI_SURVEY = {
  type: "survey-perci",
  on_finish: function(data) {

    // Check how many incorrect responses there were in the PERCI data
    var n_incorrect = jsPsych.data.getLastTrialData().select('n_incorrect').values
    pass_message("Finished Perci survey with " + n_incorrect + ' incorrect responses')

    // If two errors, reject the dataset
    if (n_incorrect == 2){

      // Remove requirement to verify redirect and reject participant
      window.removeEventListener("beforeunload", verify_unload);

      redirect_reject("{{workerId}}", "{{assignmentId}}", "{{hitId}}", "{{code_reject}}");
    }
  }
}

//----------------------
// Regret survey
//----------------------
var REGRET_SURVEY = {
  type: "survey-regret",
  on_finish: function(data) {
    pass_message("Finished regret survey")
  }
}

//----------------------
// Landing page
//----------------------

var LANDING_PAGE = {
  type: "html-keyboard-response",
  stimulus: "<p>Welcome!</p><br><p style='max-width:500px'>In this study, we will first ask you to complete several short questionnaires (around 3 to 4 minutes), followed by a behavioural task (approximately 20 minutes).</p><br><p>Press any key to get started.</p>"
};


//------------------------------------//
// Affective slider
//------------------------------------//

const AS_stimuli = [
  'static/img/affective-slider/slider_track.png',
  'static/img/affective-slider/AS_intensity_cue.png',
  'static/img/affective-slider/AS_unhappy.png',
  'static/img/affective-slider/AS_happy.png',
  'static/img/affective-slider/AS_sleepy.png',
  'static/img/affective-slider/AS_wideawake.png',
  'static/img/affective-slider/slider_thumb_unselected.png',
  'static/img/affective-slider/slider_thumb_selected.png'
];

affective_slider = {
  type: 'affective_slider',
  prompt: 'Please rate your current mood from extremely unhappy (left) to extremely happy (right).',
  slider_type: 'valence',
  left_anchor: 2, // indexes into the AS_stimuli array
  right_anchor: 3, // indexes into the AS_stimuli array
  AS_stimuli: AS_stimuli
}

//---------------------------------------//
// Specify trial sequence.
//---------------------------------------//

// Preallocate space.
var all_trials = [];

// Initialise trial and block counters
var trial_no = 1;
var block_no = 1;

// Specify a runsheet (written by generate_runsheet.R)
var runsheet = [
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.25], suits: [0, 1]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.50], suits: [2, 3]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'chosen-feedback',   probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'unchosen-feedback', probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'both-feedback',     probabilities: [0.25, 0.75], suits: [4, 5]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.25], suits: [6, 7]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.50], suits: [8, 9]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'chosen-feedback',   probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'unchosen-feedback', probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'both-feedback',     probabilities: [0.50, 0.75], suits: [10, 11]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.25], suits: [12, 13]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.50], suits: [14, 15]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ],
  [
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'chosen-feedback',   probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'unchosen-feedback', probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'both-feedback',     probabilities: [0.75, 0.75], suits: [16, 17]},
    {trial_type: 'attention-check',   probabilities: [0, 1]      , suits: [NaN, NaN]}
  ]
]


//------------------------------------//
// Generate trials.
//------------------------------------//

// Randomise trial order within each block
for (i = 0; i < runsheet.length; i++){
  runsheet[i] = jsPsych.randomization.repeat(runsheet[i], 1);
}

// Randomise the order of blocks
runsheet = jsPsych.randomization.repeat(runsheet, 1);

// Create container for blocks
var block_runsheets = Array.from(Array(n_blocks), () => []);
//
// // Create runsheet counter to index into runsheet
// runsheet_counter = 0;

// Loop over blocks/trials to assign trials
for (block_ix = 0; block_ix < n_blocks; block_ix++){

  // Calculate affective slider locations for this block
  slider_locs = assign_probe_locs(all_probe_lags)

  // Add an affective slider prior to the first trial
  block_runsheets[block_ix].push(affective_slider);

  for (trial_ix = 0; trial_ix < n_trials_per_block; trial_ix++){

    // Define trial.
    var trial = {
      block:                  block_ix + 1,
      trial:                  trial_ix + 1,
      phase:                  'experiment',
      type:                   "regret-learning-trial",
      trial_type:             runsheet[block_ix][trial_ix].trial_type,
      all_suit_paths:         suit_paths,
      randomise_lr:           (Math.random() < 0.5) ? 0 : 1,
      suits:                  runsheet[block_ix][trial_ix].suits,
      suit_permutation_index: suit_permutation_index,
      probabilities:          runsheet[block_ix][trial_ix].probabilities,
      on_finish: function(data) {

        // Store number of browser interactions
        data.browser_interactions = jsPsych.data.getInteractionData().filter({trial: data.trial_index}).count();

        // Evaluate missing data
        if ( data.choice == null ) {
          // Set missing data to true.
          data.missing = true;
        } else {
          // Set missing data to false.
          data.missing = false;
        }

      }    // end on_finish
    }  // end trial definition

    // Define looping node.
    const trial_node = {
      timeline: [trial],
      loop_function: function(data) {
        return data.values()[0].missing;
      }
    }

    // Append affective slider
    if (slider_locs.includes(trial_ix)){
      block_runsheets[block_ix].push(affective_slider);
    }

    // Append trial.
    block_runsheets[block_ix].push(trial_node);

    // // Increment runsheet index
    // runsheet_counter++;

  } // end trial loop

  // Add an affective slider prior after the last trial of the block
  block_runsheets[block_ix].push(affective_slider);

} // end block loop


//------------------------------------//
// Define transition screens.
//------------------------------------//

// Define ready screen.
var READY_01 = {
  type: 'regret-learning-instructions',
  pages: [
    "<p>Great job! You've passed the comprehension check.</p>",
    "<p>We will now begin the experiment.</p><p>The experiment will be broken into nine blocks, each lasting for approximately 2 minutes.</p>",
    "<p>You will be able to take a break after each block of the experiment.</p><p>However, please give your undivided attention during the experiment.</p>",
    "<p>Please also report your mood accurately when you are asked, as this is an important component of our study.</p>",
    "<p>Get ready to begin <b>Block 1 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>",
  ],
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_finish: function(trial) {
    pass_message('Starting block 1');
  }
}

var READY_02 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 2 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 2');
  }
}

var READY_03 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 3 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 3');
  }
}

var READY_04 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 4 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 4');
  }
}

var READY_05 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 5 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 5');
  }
}

var READY_06 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 6 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 6');
  }
}

var READY_07 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 7 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 7');
  }
}

var READY_08 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 8 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 8');
  }
}

var READY_09 = {
  type: 'regret-learning-instructions',
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
  on_start: function(trial){
    trial.pages = [
      `<p>End of block. In total, you have collected <b>${jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()}</b> stars so far.</p><p>Take a break for a few moments and press 'Next' when you are ready to continue.</p>`,
      `<p>Get ready to begin <b>Block 9 of 9</b>. It will take approximately 2 minutes.</p><p>Press next when you're ready to start.</p>`,
    ]
  },
  on_finish: function(trial) {
    pass_message('Starting block 9');
  }
}

// Define finish screen.
var FINISHED = {
  type: 'regret-learning-instructions',
  on_start: function(trial){
    const stars_won = jsPsych.data.get().filter({trial_type: 'regret-learning-trial', phase: 'experiment'}).select('chosen_outcome').sum()
    const bonus_payment = Math.min(2, Math.max(0, (stars_won - 50) * 0.01));
    trial.pages = [
      `<p>Great job! You've finished the card game.</p><p>In total, you collected <b>${stars_won}</b> stars.</p><p>As a result, you will receive a bonus payment of <b>$${bonus_payment}</b> in addition to your participation payment.</p>`
    ]
  },
  show_clickable_nav: true,
  button_label_previous: "Prev",
  button_label_next: "Next",
}

//---------------------------------------//
// Define functions.
//---------------------------------------//

function diff(A) {
  return A.slice(1).map(function(n, i) { return n - A[i]; });
}

function assign_probe_locs(all_probe_lags){

  var AS_locs = [];
  var shuffled_lags = jsPsych.randomization.sampleWithoutReplacement(all_probe_lags, all_probe_lags.length)
  var up_to = 0;
  for (i = 0; i < shuffled_lags.length; i++){
    AS_locs.push(up_to + shuffled_lags[i])
    up_to += shuffled_lags[i]
  }

  return(AS_locs)
}
