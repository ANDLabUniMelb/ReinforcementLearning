/**
* jspsych-regret-learning-trial
* Daniel Bennett (based on a template written by Sam Zorowitz)
*
* plugin for running a trial of the counterfactual mood task
*
**/

jsPsych.plugins["regret-learning-trial"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'regret-learning-trial',
    description: '',
    parameters: {
      trial_type: {
        type: jsPsych.plugins.parameterType.STRING,
        description: 'Whether trial is chosen-feedback, both-feedback, or unchosen-feedback'
      },
      randomise_lr: {
        type: jsPsych.plugins.parameterType.BOOL,
        description: 'Boolean indicating whether cards on a trial are left-right randomised or not'
      },
      valid_responses: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Valid responses',
        default: [37, 39],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      choice_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      confirmation_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Confirmation duration',
        default: 1000,
        description: 'How long to show choice confirmation before it ends.'
      },
      feedback_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback duration',
        default: 500,
        description: 'How long to show feedback before it ends.'
      },
      iti_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback duration',
        default: 500,
        description: 'How long to show ITI screen.'
      },
      initial_delay_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Initial delay duration',
        default: 250,
        description: 'How long to show choice options before a choice can be made.'
      },
      all_suit_paths: {
        type: jsPsych.plugins.parameterType.STRING,
        array: true,
        description: 'Array of paths to the suit images.'
      },
      suit_permutation_index: {
        type: jsPsych.plugins.parameterType.STRING,
        array: true,
        description: 'Shuffled array for suit lookup.'
      },
      suits: {
        type: jsPsych.plugins.parameterType.STRING,
        array: true,
        description: 'Trial-specific: which suits to show.'
      },
      probabilities: {
        type: jsPsych.plugins.parameterType.STRING,
        array: true,
        description: 'Trial-specific: payout probabilities per suit.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    var win_texture = "static/img/gold_star.png";
    var loss_texture = "static/img/black_circle.png";

    // Initialize HTML.
    var new_html = '';

    // Insert CSS.
    new_html += `<style>
    body {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: fixed;
    }
    .jspsych-content-wrapper {
      overflow: hidden;
    }
    </style>`;

    // Initialize container & grid.
    new_html += '<div class="card-flip-container">';
    new_html += '<div class="card-flip-grid">';

    // Left choice indicator
    new_html += `<div class="card-flip-grid-item" style="grid-area: left-indicator">`
    new_html += `<div class="choice-indicator" id="indicator-L"></div>`
    new_html += `</div>`

    // Right choice indicator
    new_html += `<div class="card-flip-grid-item" style="grid-area: right-indicator">`
    new_html += `<div class="choice-indicator" id="indicator-R"></div>`
    new_html += `</div>`

    // Assemble stimuli properties.
    stimuli = {};
    if ( trial.randomise_lr == 0 ) {
      stimuli.suits = [trial.suits[0], trial.suits[1]];
      stimuli.probs = [trial.probabilities[0], trial.probabilities[1]];
    } else if ( trial.randomise_lr == 1 ) {
      stimuli.suits = [trial.suits[1], trial.suits[0]];
      stimuli.probs = [trial.probabilities[1], trial.probabilities[0]];
    }
    stimuli.suit_paths = [trial.all_suit_paths[trial.suit_permutation_index[stimuli.suits[0]]], trial.all_suit_paths[trial.suit_permutation_index[stimuli.suits[1]]]];
    stimuli.outcomes = [NaN, NaN];


    // Initialise prompt text
    var prompt_text = 'Use the arrow keys to choose a card.'
    new_html += `<div class="card-flip-grid-item" style="grid-area: prompt-text">`
    new_html += `<div id="prompt-text" style="visibility: hidden"><p style="font-size: 28px" visible="false">${prompt_text}</p></div>`
    new_html += `</div>`

    // Add end-of-trial prompt text (hidden)
    new_html += `<div class="card-flip-grid-item" style="grid-area: prompt-text">`
    new_html += `<div id="end-of-trial-prompt-text" style="visibility: hidden"><p style="font-size: 28px" visible="false">Press any key to continue to the next trial.</p></div>`
    new_html += `</div>`

    // Draw cards
    card_locs = ['left-card', 'right-card']
    for (let i = 0; i < 2; i++) {

      // Initialize card.
      new_html += `<div class="card-flip-grid-item" style="grid-area: ${card_locs[i]}">`;
      if (trial.trial_type == 'attention-check'){
        new_html += `<div class="flip-card" id="${card_locs[i]}" face="up">`;
      } else {
        new_html += `<div class="flip-card" id="${card_locs[i]}" face="down">`;
      }
      new_html += '<div class="flip-card-inner">';

      // Draw card face.
      if (trial.trial_type == 'attention-check'){
        stimuli.outcomes[i] =  stimuli.probs[i];
      } else {
        stimuli.outcomes[i] =  (Math.random() < stimuli.probs[i]) ? 1 : 0;
      }
      new_html += `<div class="flip-card-back">`
      if (stimuli.outcomes[i] == 1){
        new_html += `<img src=${win_texture}>`;
      } else if (stimuli.outcomes[i] == 0){
        new_html += `<img src=${loss_texture}>`;
      }
      new_html += `</div>`

      // Draw card suit.
      if (trial.trial_type != 'attention-check'){
        new_html += `<div class="flip-card-front">`;
        new_html += `<div class="flip-card-front-suit"><img src=${stimuli.suit_paths[i]}></div>`;
        new_html += `</div>`;
      }

      // Finish card.
      new_html += '</div>';    // Close flip-card-inner
      new_html += '</div>';    // Close flip-card
      new_html += '</div>';    // Close card-flip-grid-item

    }

    // Close game containers.
    new_html += '</div>';    // Close card-flip-grid
    new_html += '</div>';    // Close card-flip-container

    // draw HTML
    display_element.innerHTML = new_html;

    var collection = document.getElementsByClassName("flip-card");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.visibility = "visible";
    }

    //---------------------------------------//
    // Response handling
    //---------------------------------------//

    // confirm screen resolution
    const mediaQuery = window.matchMedia('(min-height: 300px) and (min-width: 600px)');

    // store response
    var response = {
      rt: null,
      key: null,
      choice: null
    };

    // function to handle missed responses
    var missed_response = function() {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      // Display warning message.
      const msg = '<p style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 20px; line-height: 1.5em; color: #F8F8F8">You did not respond within the allotted time. Please respond more quickly on the next turn.';

      display_element.innerHTML = '<div class="card-flip-container">' + msg + '</div>';

      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, 5000);

    }

    // function to handle responses by the subject
    var after_response = function(info) {

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      document.getElementById("prompt-text").style.visibility = "hidden";

      // evaluate choice
      if ( response.key == trial.valid_responses[0] ) {

        response.choice_dir = 'left';
        response.chosen_suit = stimuli.suits[0];
        response.chosen_suit_path = stimuli.suit_paths[0];
        response.chosen_outcome = stimuli.outcomes[0];
        response.unchosen_suit = stimuli.suits[1];
        response.unchosen_suit_path = stimuli.suit_paths[1];
        response.unchosen_outcome = stimuli.outcomes[1];
        document.getElementById("indicator-L").setAttribute('status', 'choice');

      } else if ( response.key == trial.valid_responses[1] ) {

        response.choice_dir = 'right';
        response.chosen_suit = stimuli.suits[1];
        response.chosen_suit_path = stimuli.suit_paths[1];
        response.chosen_outcome = stimuli.outcomes[1];
        response.unchosen_suit = stimuli.suits[0];
        response.unchosen_suit_path = stimuli.suit_paths[0];
        response.unchosen_outcome = stimuli.outcomes[0];
        document.getElementById("indicator-R").setAttribute('status', 'choice');

      }

      // choice highlight timeout
      jsPsych.pluginAPI.setTimeout(function() {
        present_feedback();
      }, trial.confirmation_duration);

    }

    // function to handle responses by the subject
    var present_feedback = function(info) {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      // initiate card flip animation (depending on condition)
      if (trial.trial_type == "chosen-feedback"){

        if (response.choice_dir == 'left'){
          document.getElementById("left-card").setAttribute('status', 'flip');
        } else if (response.choice_dir == "right"){
          document.getElementById("right-card").setAttribute('status', 'flip');
        }
        response.chosen_viewed_outcome = response.chosen_outcome;
        response.unchosen_viewed_outcome = NaN;

      } else if (trial.trial_type == "unchosen-feedback"){

        if (response.choice_dir == 'left'){
          document.getElementById("right-card").setAttribute('status', 'flip');
        } else if (response.choice_dir == "right"){
          document.getElementById("left-card").setAttribute('status', 'flip');
        }
        response.chosen_viewed_outcome = NaN;
        response.unchosen_viewed_outcome = response.unchosen_outcome;

      } else if (trial.trial_type == "both-feedback"){

          document.getElementById("left-card").setAttribute('status', 'flip');
          document.getElementById("right-card").setAttribute('status', 'flip');

          response.chosen_viewed_outcome = response.chosen_outcome;
          response.unchosen_viewed_outcome = response.unchosen_outcome;
      }

      // feedback timeout
      jsPsych.pluginAPI.setTimeout(function() {

          // Change the visibility of the instruction text
          document.getElementById("prompt-text").style.visibility = "hidden";
          document.getElementById("end-of-trial-prompt-text").style.visibility = "visible";

          // Start the keyboard listener
          endTrialKeyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: end_trial,
            rt_method: 'performance',
            persist: false,
            allow_held_key: false
          });

      }, trial.feedback_duration);

    };

    // function to end trial when it is time
    var end_trial = function() {

      var collection = document.getElementsByClassName("flip-card");
      for (let i = 0; i < collection.length; i++) {
        collection[i].style.visibility = "hidden";
      }

      collection = document.getElementsByClassName("choice-indicator");
      for (let i = 0; i < collection.length; i++) {
        collection[i].style.visibility = "hidden";
      }

      jsPsych.pluginAPI.setTimeout(function() {

          // Kill any timeout handlers / keyboard listeners
          jsPsych.pluginAPI.clearAllTimeouts();
          jsPsych.pluginAPI.cancelAllKeyboardResponses();
          if (typeof keyboardListener !== 'undefined') {
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
          }

          // gather the data to store for the trial
          var trial_data = {
            'block':                   trial.block,
            'trial':                   trial.trial,
            'phase':                   trial.phase,
            'task_trial_type':         trial.trial_type,
            'suits':                   stimuli.suits,
            'probs':                   stimuli.probs,
            'suit_paths':              stimuli.suit_paths,
            'outcomes':                stimuli.outcomes,
            'chosen_suit':             response.chosen_suit,
            'chosen_suit_path':        response.chosen_suit_path,
            'unchosen_suit':           response.unchosen_suit,
            'unchosen_suit_path':      response.unchosen_suit_path,
            'choice':                  response.choice_dir,
            'chosen_outcome':          response.chosen_outcome,
            'chosen_viewed_outcome':   response.chosen_viewed_outcome,
            'unchosen_outcome':        response.unchosen_outcome,
            'unchosen_viewed_outcome': response.unchosen_viewed_outcome,
            "key_press":               response.key,
            "rt":                      response.rt,
            "screen_resolution":       (mediaQuery.matches) ? 1 : 0
          };

          // clear the display
          display_element.innerHTML = '';

          // move on to the next trial
          jsPsych.finishTrial(trial_data);

      }, trial.iti_duration);

    };


    // Initialize first stage keyboardListener.
    var keyboardListener = "";
    setTimeout(function() {

      // Change the visibility of the instruction text
      document.getElementById("prompt-text").style.visibility = "visible";

      // Start the keyboard listener
      keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.valid_responses,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }, trial.initial_delay_duration);

    // End trial if no response.
    if (trial.choice_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        missed_response();
      }, trial.choice_duration);
    }

  };

  return plugin;
})();
