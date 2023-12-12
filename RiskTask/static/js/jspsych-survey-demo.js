/**
* jspsych-survey-demo
* a jspsych plugin for the lab demographics form
* updated by Daniel Bennett from a plugin initially written by Sam Zorowitz
*/

jsPsych.plugins['survey-demo'] = (function() {

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

    .survey-demo-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-demo-instructions {
      margin: auto;
      width: 800px;
      padding: 0 0 0 0;
      text-align: center;
      font-size: 15px;
      line-height: 1.15em;
    }
    .survey-demo-container {
      display: grid;
      grid-template-columns: 40% 60%;
      grid-template-rows: auto;
      width: 800px;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 12px;
    }
    .survey-demo-row {
      display: contents;
      justify-items: center;
      text-align: left;
      font-size: 16px;
      line-height: 1.5em;
    }
    .survey-demo-prompt {
      padding: 12px 0 12px 15px;
      border-top: 2px solid #ffffff;
    }
    .survey-demo-prompt label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .survey-demo-response {
      padding: 12px 0 12px 0;
      border-top: 2px solid #ffffff;
    }
    .survey-demo-response label {
      padding: 0 1em 0 0;
      display: inline-block;
    }
    .survey-demo-response input[type='radio'], input[type='checkbox'] {
      height: 13px;
      width: 13px;
      margin: 0 6px 0 0;
    }
    .survey-demo-response input[type='number'], input[type='text'] {
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .survey-demo-response input[type='number'] {
      width: 40px;
    }
    .survey-demo-response input[type='text'] {
      width: 15%;
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
    html += '<div class="survey-demo-wrap"><form id="jspsych-survey-demo">';

    // Add demoing header.
    html += '<div class=survey-demo-instructions>';
    html += '<h2>Demographics Survey</h2>';
    html += '<p>Please answer the questions below. <font color="#c87606">Your answers will not affect your payment.</font></p>'
    html += '</div>';

    // Begin demoing container.
    html += '<div class="survey-demo-container">';

    // Item 1: Age
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="age">What is your current age (in years)?</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<input type="number" name="age" min="18" max="100" size="20" required>';
    html += '</div></div>';

    // Item 2: Gender
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="gender-categorical">What is your gender?</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<label><input type="radio" name="gender-categorical" value="Female" required>Female</label><br>';
    html += '<label><input type="radio" name="gender-categorical" value="Male" required>Male</label><br>';
    html += '<label><input type="radio" name="gender-categorical" value="Non-binary or gender diverse" required>Non-binary or gender diverse</label><br>';
    html += '<label><input type="radio" name="gender-categorical" value="Not listed" required>My gender identity isn\'t listed</label><br>';
    html += '<label><input type="radio" name="gender-categorical" value="Rather not say" required>Prefer not to say</label><br>';
    html += '</div></div>';

    // Item 3: Education
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="education">What is the highest level of education that you have completed?</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<label><input type="radio" name="education" value="Did not graduate high school" required>Did not graduate high school</label><br>';
    html += '<label><input type="radio" name="education" value="High school" required>High school diploma or equivalent</label><br>';
    html += `<label><input type="radio" name="education" value="College or university degree" required>College or university degree (e.g., Bachelor's degree)</label><br>`;
    html += `<label><input type="radio" name="education" value="Post-graduate university degree" required>Post-graduate university degree (e.g., Master's degree, PhD)</label><br>`;
    html += '<label><input type="radio" name="education" value="Rather not say" required>Rather not say</label>';
    html += '</div></div>';

    // Item 4: Country of residence:
    var countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "the Vatican", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
    html += '<div class="survey-demo-row">';
    html += '<div class="survey-demo-prompt"><label for="country">In what country do you currently reside?</label></div>';
    html += '<div class="survey-demo-response">';
    html += '<select id="country" name="country" required>';
    html += '<option value="">Please select</option>';
    countries.forEach(country => {
      html += `'<option value="${country}">${country}</option>'`
    })
    html += '</select>';
    html += '</div></div>';

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

    display_element.querySelector('#jspsych-survey-demo').addEventListener('submit', function(event) {

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
