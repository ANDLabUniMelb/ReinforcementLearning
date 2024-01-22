jsPsych.plugins['no-tradeoff-rwd'] = (function() {

    var plugin = {};

    plugin.info = {
        name: 'no-tradeoff-rwd',
        description: 'task with no tradeoff',
        parameters: {
            type: {
                type: jsPsych.plugins.parameterType.STRING,
                default: 'normal',
                description: 'practice or normal block'
            },
            trial_no: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'custom trial index for updating progress bar'
            },
            stakes: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'level of stakes, 1 or 5'
            },
            choices_id: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'choices configuration, 0-3'
            },
            protection_a: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'number of shields from gnome a, init 0-4'
            },
            protection_b: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'number of shields from gnome b, init 5-9'
            },
            confidence_type: {
                type: jsPsych.plugins.parameterType.STRING,
                default: null,
                description: 'type of survey: estimate or certainty or none'
            },
            init_stakes_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 1500,
                description: 'milliseconds pair of potential stakes values shown'
            },
            choice_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 1500,
                description: 'milliseconds pair of choices shown'
            },
            motor_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 1500,
                description: 'milliseconds subject has to press space to see outcome'
            },
            confidence_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 3000,
                description: 'milliseconds subject has to answer survey'
            },
            outcome_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 1500,
                description: 'milliseconds outcome shown'
            },
            fin_stakes_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 1500,
                description: 'milliseconds actual stakes shown'
            },
            report_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2500,
                description: 'milliseconds final trial result shown'
            },
            iti_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 500,
                description: 'milliseconds of iti between trials'
            }
        }
    }


    plugin.trial = function(display_element, trial) {
        document.body.style.backgroundColor = '#777';  // dark bg color
        display_element.style.backgroundColor = 'white';

        var setTimeoutHandlers = [];
        var keyboardListener = new Object;
        var choice_selected;
        var choice_notselected;
        var result;
        var outcome;
        var outcome_notreceived;


        var response = {
            rt: null,
            key: null,
            certainty: null,
            estimate: null
        };

        var responses = {
            rt: [],
            key: [],
        };

		jsPsych.pluginAPI.clearAllTimeouts();
		jsPsych.pluginAPI.cancelAllKeyboardResponses();

        var end_trial = function() {
            var trial_data = {
                "stimulus": trial.stimuli,
              //  "duration": trial.trial_duration,
                "stakes": trial.stakes,
               // "result": result,
                "outcome": outcome,
                "outcome_notreceived": outcome_notreceived,
                "choice_selected" : choice_selected,
                "choice_not_selected" : choice_notselected,
                "rt_choice": responses.rt[0],
                "rt_space": responses.rt[1],
                "rt_certainty": responses.rt[2],
                "all_rts": responses.rt,
                "key_choice": responses.key[0],
                "all_keys": responses.key,
                "estimate_trial": response.estimate,
                "estimate_val": response.estimates,
                "certainty_trial": response.certainty,
                "certainty_val": response.certaintys
            };

            jsPsych.finishTrial(trial_data);
   }

   var after_response = function(info) {
       if (response.key == null) {
          let character = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key);
          if (['space', 'f', 'j'].indexOf(character) > -1) {
              if (character == 'f') {
              choice_selected = rwd_choices_types[trial.choices_id].choice_a.name;
              choice_notselected = rwd_choices_types[trial.choices_id].choice_b.name;                      
              display_element.querySelector('#left').className += ' responded';
           }
           else if (character == 'j') {
              choice_selected = rwd_choices_types[trial.choices_id].choice_b.name;
              choice_notselected = rwd_choices_types[trial.choices_id].choice_a.name;                       
              display_element.querySelector('#right').className += ' responded';
            }
            else if (display_element.querySelector('#motor') &&
                    character == 'space') { // offset from motor
                stages(4);
            }
	    }
    	else if (display_element.querySelector('#estimate') &&
         	    character == 'enter') {
            	response.estimate = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key);
            	response.estimates = display_element.querySelector('#estimate').value;
        	stages(5);
         }
        else if (display_element.querySelector('#certainty') &&
                character == 'enter') {
                response.certainty = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key);
               	response.certaintys = display_element.querySelector('#certainty').value;
            stages(3);
        }
    }
    responses.rt.push(info.rt);
    responses.key.push(info.key);
    responses.certainty.push(info.certainty);
 }

        var start_response_listener = function(choices) {
            response.key = null;
			if(JSON.stringify(choices) != JSON.stringify(["none"])) {
				var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
					callback_function: after_response,
					valid_responses: choices,
					rt_method: 'performance',
					persist: false,
					allow_held_key: false,
				})
			}
		}

        //var after_certainty_response = function(e) {
            //response.certainty = e.currentTarget.getAttribute('value');
            //console.log(response.certainty);
            //stages(3);
        //}

        //var start_certainty_listener = function() {
            //for (let i = 0; i <= 6; i++) {
                //response.certainty = display_element.querySelector('#certainty-' + i).addEventListener('click', after_certainty_response);
            //}
        //}

        // This is the function that show each part of the trial in order
        // the part shown is determined by the stage number (and things like
        // whether a choice was selected). Because of the branching, the stage
        // numbers are a bit wonky in places.
        var stages = function(stage) {
            jsPsych.pluginAPI.clearAllTimeouts();
    		jsPsych.pluginAPI.cancelAllKeyboardResponses();
            display_element.innerHTML = '';

            let delay;

            if (stage == 0) { // init stakes
                let stakes_a = rwd_stakes_1;
                let stakes_b = rwd_stakes_1;
                if (trial.stakes > 2) {
                    stakes_a = rwd_stakes_4;
                    stakes_b = rwd_stakes_4;
                }

                display_element.innerHTML = '<div class=bg>' + rwd_init_stakes_content(stakes_a, stakes_b) + '</div>';
				result=rwd_get_result(rwd_init_stakes_content)
					
                delay = trial.init_stakes_duration;
            }
            else if (stage == 1) { // choice
                let choice_a = rwd_choices_types[trial.choices_id].choice_a;
                let choice_b = rwd_choices_types[trial.choices_id].choice_b;

                display_element.innerHTML = '<div class=bg>' + rwd_decision_content(choice_a, choice_b) + '</div>';
                start_response_listener(['f', 'j']);

                delay = trial.choice_duration;
            }
            else if (choice_selected == null) { // did not make choice
                if (stage == 2) { // outcome
                    outcome = 0;
                    display_element.innerHTML =
                        '<div class="bg prompt" id="motor">' +
                        'You did not make a selection in time,<br>' +
                        'so you received nothing!<br><br>' +
                        'Please press space.</div>';

                    start_response_listener(['space']);
                    return;
                }
                //else if (stage == 4) { // fin stakes
                    //display_element.innerHTML = '<div class=bg>' + rwd_fin_stakes_content(rwd_stakes_types[trial.stakes - 1].stakes) + '</div>';

                    //delay = trial.fin_stakes_duration;
                //}
                else if (stage == 4) { // iti
                    display_element.innerHTML = '<div class=bg style="font-size: 60px;">+</div>';
                    delay = trial.iti_duration;
                }
                else {
                    end_trial();
                    return;
                }
            }
            else if (stage < 6) {  // made choice
                if (trial.confidence_type == 'estimate') {
                    if (stage == 2) { // motor
                        result = rwd_get_result(choice_selected);

                        display_element.innerHTML = '<div class=bg id="motor">' + rwd_motor_content(choice_selected, result) + '</div>';

                        start_response_listener(['space']);
                        delay = trial.motor_duration;
                        jsPsych.pluginAPI.setTimeout(function() {stages(stage + 0.5);}, delay);
                        return;
                    }
                    else if (stage == 2.5) { // motor reminder
                        display_element.innerHTML = '<div class=bg id="motor">' + rwd_motor_reminder_content(choice_selected, result) + '</div>';
                        start_response_listener(['space']);
                        return;
                    }
                    if (stage == 4) { // confidence: estimate
                        display_element.innerHTML = '<div class=bg>' + rwd_confidence_estimate_content(result) + '</div>';
						
                        start_response_listener(['enter']);
                        return;
                    }
                    else if (stage == 5) { // outcome
                        if (result === rwd_result_1) outcome = trial.protection_a;
                        else if (result === rwd_result_2) outcome = trial.protection_b;

                        if (result === rwd_result_1) outcome_notreceived = trial.protection_b;
                        else if (result === rwd_result_2) outcome_notreceived = trial.protection_a;


                        display_element.innerHTML = '<div class=bg>' + rwd_outcome_content(result, rwd_resource_img, outcome) + '</div>';
						
                        delay = trial.outcome_duration;
                    }
                }
                else if (trial.confidence_type == 'certainty') {
                    if (stage == 2) { // confidence: certainty
                        display_element.innerHTML = '<div class=bg>' + rwd_confidence_certainty_content() + '</div>';
                    	
                        start_response_listener(['enter']);
                        return;
                    }
                    if (stage == 3) { // motor
                        result = rwd_get_result(choice_selected);

                        display_element.innerHTML = '<div class=bg id="motor">' + rwd_motor_content(choice_selected, result) + '</div>';

                        start_response_listener(['space']);
                        delay = trial.motor_duration;
                        jsPsych.pluginAPI.setTimeout(function() {stages(stage + 0.5);}, delay);
                        return;
                    }
                    else if (stage == 3.5) { // motor reminder
                        display_element.innerHTML = '<div class=bg id="motor">' + rwd_motor_reminder_content(choice_selected, result) + '</div>';
                        start_response_listener(['space']);
                        return;
                    }
                    else if (stage == 4) { // outcome
                        if (result === rwd_result_1) outcome = trial.protection_a;
                        else if (result === rwd_result_2) outcome = trial.protection_b;

                        if (result === rwd_result_1) outcome_notreceived = trial.protection_b;
                        else if (result === rwd_result_2) outcome_notreceived = trial.protection_a;


                        display_element.innerHTML = '<div class=bg>' + rwd_outcome_content(result, rwd_resource_img, outcome) + '</div>';
                    	result = rwd_get_result(result);
                    	
                        delay = trial.outcome_duration;
                        stage++;
                    }
                }
                else {
                    if (stage == 2) { // motor
                        result = rwd_get_result(choice_selected);

                        display_element.innerHTML = '<div class=bg id="motor">' + rwd_motor_content(choice_selected, result) + '</div>';

                        start_response_listener(['space']);
                        delay = trial.motor_duration;
                        jsPsych.pluginAPI.setTimeout(function() {stages(stage + 0.5);}, delay);
                        return;
                    }
                    else if (stage == 2.5) { // motor reminder
                        display_element.innerHTML = '<div class=bg id="motor">' + rwd_motor_reminder_content(choice_selected, result) + '</div>';
                        start_response_listener(['space']);
                        return;
                    }
                    else if (stage == 4) { // outcome
                        if (result === rwd_result_1) outcome = trial.protection_a;
                        else if (result === rwd_result_2) outcome = trial.protection_b;

                        if (result === rwd_result_1) outcome_notreceived = trial.protection_b;
                        else if (result === rwd_result_2) outcome_notreceived = trial.protection_a;


                        display_element.innerHTML = '<div class=bg>' + rwd_outcome_content(result, rwd_resource_img, outcome) + '</div>';
                    	result = rwd_get_result(result);
                    	
                        delay = trial.outcome_duration;
                        stage++;
                    }
                }
            }
            else { // made choice
                if (stage == 6) { // report
                    //display_element.innerHTML = '<div class=bg>' + rwd_fin_stakes_content(rwd_stakes_types[trial.stakes - 1].stakes) + '</div>';

                    //delay = trial.fin_stakes_duration;
                //}
                //else if (stage == 6 ) { // report
                    let shielded = sack_coin(outcome, trial.stakes);
                    let pct = Math.round(100 * Math.min((trial.stakes + shielded) / trial.stakes, 1));
                    let lostvals = lost_val(outcome, trial.stakes);
					let lostval = Number(lostvals);
					
                    display_element.innerHTML = '<div class=bg>' + rwd_report_content(rwd_stakes_types[trial.stakes - 1].stakes, rwd_resource_imgs[outcome], pct, rwd_wording, rwd_lost_imgs[lostval], rwd_wordings) + '</div>';

                    delay = trial.report_duration;
                }
                else if (stage == 7) { // iti
                    display_element.innerHTML = '<div class=bg style="font-size: 60px;">+</div>';
                    delay = trial.iti_duration;
                }
                else {
                    console.log(response, responses);

                    jsPsych.setProgressBar(trial.trial_no / n_trials);

                    end_trial();
                    return;
                }
            }

            jsPsych.pluginAPI.setTimeout(function() {stages(stage + 1);}, delay);
        }

        stages(0);
    }

    return plugin;

})();
