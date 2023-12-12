/**
* jspsych-survey-macarthur
* a jspsych plugin for the Macarthur scale of subjective social status
* written by Daniel Bennett
*/

jsPsych.plugins['survey-macarthur'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-demo',
    description: '',
    parameters: {
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
    }
  }
  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    // Initialize HTML
    var html = '';

    // Inject CSS
    html += `<style>

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    input[type=number] {
        -moz-appearance:textfield; /* Firefox */
    }

    .survey-macarthur-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-macarthur-container {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 10% 50% 15% 20%;
      grid-template-areas:
      "first-prompt"
      "ladder-image"
      "second-prompt"
      "question-field";
      width: 800px;
      height: 800px;
      margin: auto;
    }
    .survey-macarthur-first-prompt {
      grid-area: first-prompt;
    }
    .survey-macarthur-ladder-image {
      grid-area: ladder-image;
    }
    .survey-macarthur-ladder-image img {
      max-width: 100%;
      height: 100%
    }
    .survey-macarthur-second-prompt {
      grid-area: second-prompt;
    }
    .survey-macarthur-question-field {
      grid-area: question-field;
    }
    .survey-macarthur-question-field input[type='number'], input[type='text'] {
      height: 40px;
      width: 60px;
      border: 1px solid #333333;
      border-radius: 4px;
      font-size: 24px;
      text-align: center;
    }
    .survey-demo-footer {
      margin: auto;
      width: 800px;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-demo-footer input[type=submit] {
      background-color: #F0F0F0;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
      font-size: 14px;
      color: black;
    }
    </style>`;

    // Initialize survey.
    html += '<div class="survey-macarthur-wrap"><form id="jspsych-survey-macarthur">';

    // Begin container.
    html += '<div class="survey-macarthur-container">';

    // First prompt
    html += '<div class="survey-macarthur-first-prompt">';
    html += '<br>Imagine that this ladder shows how people stand in society.'
    html += '</div>'

    // Prompt image
    html += '<div class="survey-macarthur-ladder-image">';
    html += '<img src="static/img/macarthur-ladder.png">'
    html += '</div>'

    // Second prompt
    html += '<div class="survey-macarthur-second-prompt">';
    html += 'At the top of the ladder are the people who are the best off, those who have the most money, most education, and best jobs. At the bottom are the people who are the worst off, those who have the least money, least education, worst jobs, or no job.'
    html += '</div>'

    // Response field
    html += '<div class="survey-macarthur-question-field">';
    html += 'Which rung (1 - 10) best represents where you think you stand on the ladder?<br><br>'
    html += '<input type="number" name="rung" min="1" max="10" size="20" required>';
    html += '</div>'

    // Close container.
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-demo-footer">';
    html += `<input type="submit" value="${trial.button_label}"></input>`;
    html += '</div>';

    // End survey.
    html += '</form></div>';

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Define functions.
    //---------------------------------------//

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    display_element.querySelector('#jspsych-survey-macarthur').addEventListener('submit', function(event) {

      // Wait for response
      event.preventDefault();

      // Measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      var question_data = serializeArray(this);
      question_data = objectifyForm(question_data);

      // Store data
      var trialdata = {
        "rt": response_time,
        "responses": question_data
      };

      // Update screen
      display_element.innerHTML = '';

      // Move onto next trial
      jsPsych.finishTrial(trialdata);

    });

    var startTime = performance.now();

  };

  /*!
  * Serialize all form data into an array
  * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
  * @param  {Node}   form The form to serialize
  * @return {String}      The serialized form data
  */
  var serializeArray = function (form) {
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }

    // add checkbox responses
    var checkbox_types = document.querySelectorAll('input[type=checkbox]');
    var checkbox_names = [];
    for (var i = 0; i < checkbox_types.length; i++) {
        if (! checkbox_names.includes(checkbox_types[i].name) ){
          checkbox_names.push(checkbox_types[i].name)
        }
    }

    for (var i = 0; i < checkbox_names.length; i++ ){
      var checkboxes = document.querySelectorAll(`input[name=${checkbox_names[i]}]:checked`)
      var responses = [];

      for (var j = 0; j < checkboxes.length; j++) {
        responses.push(checkboxes[j].value)
      }
      serialized.push({
        name: checkbox_names[i],
        value: responses
      })

    }

    return serialized;
  };

  // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
  function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

  return plugin;

})();
