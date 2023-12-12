/**
 * jspsych-perci-screening
 * a jspsych plugin incorporating the PERCI
 */

jsPsych.plugins['survey-perci'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-template',
    description: '',
    parameters: {
      items: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Items',
        decription: 'The questions associated with the survey',
        default:
        [
          "When I’m feeling bad, I don’t know what to do to feel better.",
          "When I’m feeling bad, those feelings stop me from getting work done.",
          "When I’m feeling bad, I do stupid things.",
          "When I’m feeling bad, I believe I need to get rid of those feelings at all costs.",
          "When I’m feeling bad, I’m powerless to change how I’m feeling.",
          "When I’m feeling bad, I can’t complete tasks that I’m meant to be doing.",
          "When I’m feeling bad, my behaviour becomes out of control.",
          "When I’m feeling bad, I can’t allow those feelings to be there.",
          "When I’m feeling bad, I don’t have many strategies (e.g., activities or techniques) to get rid of that feeling.",
          "When I’m feeling bad, I can’t get motivated to do important things (work, chores, school, etc.).",
          "When I’m feeling bad, I have trouble controlling my actions.",
          "When I’m feeling bad, I must try to totally eliminate those feelings.",
          "When I’m feeling bad, I have no control over the strength and duration of that feeling.",
          "When I’m feeling bad, I have trouble getting anything done.",
          "When I’m feeling bad, I have strong urges to do risky things.",
          "When I’m feeling bad, I believe those feelings are unacceptable.",
          "When I’m feeling good, I do stupid things.",
          "When I’m feeling good, I don’t have many strategies (e.g., activities or techniques) to increase the strength of that feeling.",
          "When I’m feeling good, I have trouble completing tasks that I’m meant to be doing.",
          "When I’m feeling good, part of me hates those feelings.",
          "When I’m feeling good, my behaviour becomes out of control.",
          "I don’t know what to do to create pleasant feelings in myself.",
          "When I’m feeling good, I end up neglecting my responsibilities (work, chores, school, etc.).",
          "When I’m feeling good, I can’t allow those feelings to be there.",
          "When I’m feeling good, I have strong urges to do risky things.",
          "When I’m feeling good, I have no control over whether that feeling stays or goes.",
          "When I’m feeling good, I have difficulty staying focused during important stuff (at work or school, etc.)",
          "When I’m feeling good, I believe those feelings are unacceptable.",
          "When I’m feeling good, I can’t keep control over myself (in terms of my behaviours).",
          "When I’m feeling good, I don’t have any useful ways to help myself keep feeling that way.",
          "When I’m feeling good, I have trouble getting anything done.",
          "When I’m feeling good, I must try to eliminate those feelings.",
          "When you’ve finished reading this item, please select ‘strongly disagree’.",
          "When you’ve finished reading this item, please select ‘neither agree nor disagree’."
        ]
      },
      scale: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Scale',
        decription: 'The response options associated with the survey',
        default:
        [
            "<br><br>Strongly<br>disagree",             // scored as 0
            "",                                 // scored as 1
            "",                                 // scored as 2
            "Neither agree<br>nor disagree",    // scored as 3
            "",                                 // scored as 4
            "",                                 // scored as 5
            "<br><br>Strongly<br>agree"                 // scored as 6
        ]
      },
      reverse: {
        type: jsPsych.plugins.parameterType.BOOL,
        array: true,
        pretty_name: 'Randomize Question Order',
        description: 'If true, the corresponding item will be reverse scored',
        default: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
      },
      infrequency_items: {
        type: jsPsych.plugins.parameterType.INT,
        array: true,
        pretty_name: 'Infrequency items',
        decription: 'Infrequency-check item numbers (0-indexed)',
        default: [32, 33]
      },
      instructions: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Instructions',
        decription: 'The instructions associated with the survey',
        default: '<p>This questionnaire asks about how you manage and respond to your emotions. Please score the following statements according to <b>how much you agree or disagree that the statement is true of you</b>. Select one answer for each statement.<br><br>Half of the questionnaire asks about <i>bad</i> or <i>unpleasant</i> emotions; this means emotions like sadness, anger, or fear. The other half asks about <i>good</i> or <i>pleasant</i> emotions; this means emotions like happiness, amusement, or excitement.</p>'
      },
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: true,
        description: 'If true, the order of the questions will be randomized'
      },
      scale_repeat: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Scale repeat',
        default: 8,
        description: 'The number of items before the scale repeats'
      },
      survey_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Survey width',
        default: 80,
        description: 'The percentage of the viewport occupied by the survey'
      },
      item_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Item width',
        default: 50,
        description: 'The percentage of a row occupied by an item text'
      },
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
    // Define survey HTML.
    //---------------------------------------//

    // Initialize HTML
    var html = '';

    // Define CSS constants
    const n  = trial.scale.length;              // Number of item responses
    const x1 = trial.item_width;                // Width of item prompt (percentage)
    const x2 = (100 - trial.item_width) / n;    // Width of item response (percentage)

    // Insert CSS
    html += `<style>
    .survey-template-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-template-instructions {
      width: ${trial.survey_width}vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-template-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: ${trial.survey_width}vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-template-row {
      display: contents;
    }
    .survey-template-row:hover div {
      background-color: #dee8eb;
    }
    .survey-template-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-template-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-template-response {
      padding: 12px 0 12px 0;
      font-size: 1.15vw;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-template-response input[type='radio'] {
      position: relative;
      width: 15px;
      height: 15px;
    }
    .survey-template-response .pseudo-input {
      position: relative;
      height: 0px;
      width: 0px;
      display: inline-block;
    }
    .survey-template-response .pseudo-input:after {
      position: absolute;
      left: 6.5px;
      top: -6px;
      height: 2px;
      width: calc(${trial.survey_width}vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-template-response:last-child .pseudo-input:after {
      display: none;
    }
    .survey-template-footer {
      margin: auto;
      width: ${trial.survey_width}vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-template-footer input[type=submit] {
      background-color: #F0F0F0;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
      font-size: 1vw;
      color: black;
    }
    @media screen and (max-width: 1200px) {
      .survey-template-instructions {
        width: calc(1200px * ${trial.survey_width} / 100);
        font-size: calc(1200px * 0.0125);
      }
      .survey-template-container {
        width: calc(1200px * ${trial.survey_width} / 100);
      }
      .survey-template-header {
        font-size: calc(1200px * 0.0100);
      }
      .survey-template-prompt {
        font-size: calc(1200px * 0.0115);
      }
      .survey-template-response .pseudo-input:after {
        width: calc(1200px * ${x2 / 100} - 30px);
      }
      .survey-template-footer {
        width: calc(1200px * ${trial.survey_width} / 100);
      }
    }
    @media screen and (min-width: 1600px) {
      .survey-template-instructions {
        width: calc(1600px * ${trial.survey_width} / 100);
        font-size: calc(1600px * 0.0125);
      }
      .survey-template-container {
        width: calc(1600px * ${trial.survey_width} / 100);
      }
      .survey-template-header {
        font-size: calc(1600px * 0.0100);
      }
      .survey-template-prompt {
        font-size: calc(1600px * 0.0115);
      }
      .survey-template-response .pseudo-input:after {
        width: calc(1600px * ${x2 / 100} - 40px);
      }
      .survey-template-footer {
        width: calc(1600px * ${trial.survey_width} / 100);
      }
    }
    </style>`;

    // Initialize survey.
    html += '<div class="survey-template-wrap"><form name="survey-template" id="survey-template-submit">';

    // Add instructions.
    html += '<div class="survey-template-instructions" id="instructions">';
    html += `<p>${trial.instructions}<p>`;
    html += '</div>';

    // Randomize question order.
    var item_order = [];
    for (var i=0; i < trial.items.length; i++){ item_order.push(i); }
    if(trial.randomize_question_order){

      // Shuffle item order
      item_order = jsPsych.randomization.shuffle(item_order);

      // check if the first batch of items includes an infrequency item; if so, re-shuffle to avoid this
      while (!(trial.infrequency_items === null) && (trial.infrequency_items.toString().includes([item_order[0]]) || trial.infrequency_items.toString().includes([item_order[1]]) || trial.infrequency_items.toString().includes([item_order[2]]) || trial.infrequency_items.toString().includes([item_order[3]]) || trial.infrequency_items.toString().includes([item_order[4]]) && trial.infrequency_items.toString().includes([item_order[5]]) || trial.infrequency_items.toString().includes([item_order[6]]) || trial.infrequency_items.toString().includes([item_order[7]]))){
        item_order = jsPsych.randomization.shuffle(item_order);
      }

    }

    // Iteratively add items.
    html += '<div class="survey-template-container">';

    for (var i = 0; i < trial.items.length; i++) {

      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`).slice(-2);

      // Define response values.
      var values = [];
      for (var j = 0; j < trial.scale.length; j++){ values.push(j); }
      if (trial.reverse[item_order[i]]) { values = values.reverse(); }

      // Add response headers (every N items).
      if (i % trial.scale_repeat == 0) {
        html += '<div class="survey-template-header"></div>';
        for (var j = 0; j < trial.scale.length; j++) {
          html += `<div class="survey-template-header">${trial.scale[j]}</div>`;
        }
      }

      // Add row.
      html += '<div class="survey-template-row">';
      html += `<div class='survey-template-prompt'>${trial.items[item_order[i]]}</div>`;
      for (let v of values) {
        html += '<div class="survey-template-response">';
        html += '<div class="pseudo-input"></div>';
        html += `<input type="radio" name="Q${qid}" value="${v}" required>`;
        html += "</div>";
      }
      html += '</div>';

    }
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-template-footer">';
    html += `<input type="submit" value="${trial.button_label}"></input>`;
    html += '</div>';

    // End survey.
    html += '</form></div>';

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    // Preallocate space.
    var key_events = [];
    var mouse_events = [];
    var radio_events = [];

    // Add event listener.
    function log_event(event) {
      const response_time = performance.now() - startTime
      if (event.screenX > 0) {
        mouse_events.push( response_time );
      } else {
        key_events.push( response_time );
      }
      if (event.target.type == "radio") {
        radio_events.push( response_time )
      }
    }
    document.addEventListener("click", log_event);

    display_element.querySelector('#survey-template-submit').addEventListener('submit', function(event) {

        // Wait for response
        event.preventDefault();

        // Measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;

        var question_data = serializeArray(this);

        // check number of incorrect infrequency responses
        var n_incorrect = 0;

        for (var i = 0; i < question_data.length; i++) {

          if (question_data[i].name == "Q33" & question_data[i].value != "0"){
            n_incorrect += 1
          }
          if (question_data[i].name == "Q34" & question_data[i].value != "3"){
            n_incorrect += 1
          }

        }

        question_data = objectifyForm(question_data);
        // Store data
        var trialdata = {
          "item_order": item_order,
          "responses": question_data,
          "radio_events": radio_events,
          "key_events": key_events,
          "mouse_events": mouse_events,
          "rt": response_time,
          "n_incorrect": n_incorrect
        };

        // Remove event listener
        document.removeEventListener("click", log_event);

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
