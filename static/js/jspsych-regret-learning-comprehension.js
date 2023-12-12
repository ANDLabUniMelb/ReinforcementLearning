/**
 * jspsych-regret-learning-comprehension
 * Daniel Bennett, based on a template written by Sam Zorowitz
 *
 * plugin for running the comprehension check for the regret learning task
 *
 **/

jsPsych.plugins['regret-learning-comprehension'] = (function() {
  var plugin = {};

  plugin.info = {
    name: 'regret-learning-comprehension',
    description: '',
    parameters: {
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      }
    }
  }
  plugin.trial = function(display_element, trial) {

    // Plug-in setup
    var plugin_id_name = "jspsych-survey-multi-choice";
    var plugin_id_selector = '#' + plugin_id_name;
    var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }

    // ---------------------------------- //
    // Section 1: Define Prompts          //
    // ---------------------------------- //

    // Define comprehension check questions.
    var prompts = [
      "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;My goal in this game is to collect as many black circles as possible.",
      "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;Some decks of cards have more gold stars in them and some have fewer.",
      "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;The dealer will only ever turn over the card I choose, and will never turn over the unchosen card",
      "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;Even if the dealer doesn't turn over my chosen card, I will still collect the star or circle that is on the other side of it.",
      "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;The dealer decides at random which cards to turn over.",
      "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;If the dealer turns over both cards, then I get to keep both the symbol on my chosen card and the symbol on the unchosen card.",
      "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;If I collect enough gold stars, I can trade them for money at the end of the task.",
    ];

    // Define correct answers.
    var correct = ["false",  "true", "false", "true", "true", "false", "true"];

    // ---------------------------------- //
    // Section 2: Define HTML             //
    // ---------------------------------- //

    // Initialize HTML
    var html = "";

    // Insert CSS
    html += `<style>
    body {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: static;
    }
    .comprehension-box {
      position: absolute;
      top: 10%;
      left: 50%;
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0);
      width: 70%;
      height: 100%;
      line-height: 1.5em;
    }
    .comprehension-box .jspsych-survey-multi-choice-question {
      margin-top: 0em;
      margin-bottom: 1.0em;
      text-align: left;
      padding-left: 2em;
      font-size: 18px;
      color: #000000;
    }
    .comprehension-box .jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-text {
      text-align: left;
      margin: 0em 0em 0em 0em
    }
    .comprehension-box .jspsych-survey-multi-choice-horizontal .jspsych-survey-multi-choice-option {
      display: inline-block;
      margin: 0.33em 1em 0em 1em;
    }
    .comprehension-box .jspsych-survey-multi-choice-option input[type='radio'] {
      margin-right: 0.5em;
      width: 1.2em;
      height: 1.2em;
    }
    </style>`;

    // Add factory machine parts (back).
    html += '<div class="instructions-container">';

    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.innerHTML += '<form id="'+trial_form_id+'"></form>';

    // Show preamble text
    html += '<div class="comprehension-box">'
    html += '<div class="jspsych-survey-multi-choice-preamble"><h4 style="font-size: 20px; margin-block-start: 1em; margin-block-end: 1.5em; color: #000000">Please answer the questions below:</div>';

    // Initialize form element
    html += '<form id="jspsych-survey-multi-choice-form">';

    // Iteratively add comprehension questions.
    for (i = 0; i < prompts.length; i++) {

      // Initialize item
      html += `<div id="jspsych-survey-multi-choice-${i}" class="jspsych-survey-multi-choice-question jspsych-survey-multi-choice-horizontal" data-name="Q${i}">`;

      // Add question text
      html += `<p class="jspsych-survey-multi-choice-text survey-multi-choice">${prompts[i]}</p>`;

      // Option 1: True
      html += `<div id="jspsych-survey-multi-choice-option-${i}-0" class="jspsych-survey-multi-choice-option">`;
      html += `<input type="radio" name="jspsych-survey-multi-choice-response-${i}" id="jspsych-survey-multi-choice-response-${i}-0" value=true required>`;
      html += `<label class="jspsych-survey-multi-choice-text" for="jspsych-survey-multi-choice-response-${i}-0">True</label>`;
      html += '</div>';

      // Option 2: False
      html += `<div id="jspsych-survey-multi-choice-option-${i}-1" class="jspsych-survey-multi-choice-option">`;
      html += `<input type="radio" name="jspsych-survey-multi-choice-response-${i}" id="jspsych-survey-multi-choice-response-${i}-1" value=false required>`;
      html += `<label class="jspsych-survey-multi-choice-text" for="jspsych-survey-multi-choice-response-${i}-1">False</label>`;
      html += '</div>';

      // Close item
      html += '</div>';

    }

    // add submit button
    html += '<input type="submit" id="'+plugin_id_name+'-next" class="'+plugin_id_name+' jspsych-btn"' + (trial.button_label ? ' value="'+trial.button_label + '"': '') + '"></input>';

    // End HTML
    html += '</form>';
    html += '</div></div>';

    // Display HTML
    display_element.innerHTML = html;

    // ---------------------------------- //
    // Section 2: jsPsych Functions       //
    // ---------------------------------- //

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    // Detect submit button press
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();

      // Measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      // Gather responses
      var responses = [];
      var num_errors = 0;
      for (var i=0; i<prompts.length; i++) {

        // Find matching question.
        var match = display_element.querySelector('#jspsych-survey-multi-choice-'+i);
        var val = match.querySelector("input[type=radio]:checked").value;

        // Store response
        responses.push(val)

        // Check accuracy
        if ( correct[i] != val ) {
          num_errors++;
        }

      }

      // store data
      var trial_data = {
        "responses": responses,
        "num_errors": num_errors,
        "rt": response_time
      };

      // clear html
      display_element.innerHTML += '';

      // next trial
      jsPsych.finishTrial(trial_data);

    });

    var startTime = performance.now();
  };

  return plugin;
})();
