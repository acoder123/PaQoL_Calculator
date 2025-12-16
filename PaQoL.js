const form = document.getElementById("form");

/* ---- Derivation cohort parameters ---- */
const params = {
  exerciseDays: { mean: 4.53, sd: 1.81 },
  exerciseMinutes: { mean: 75.45, sd: 44.22 },
  activity150: { mean: 0.07, sd: 0.25 },
  trainingEvent: { mean: 0.47, sd: 0.50 },
  sleepHours: { mean: 7.17, sd: 1.17 },
  restedDays: { mean: 4.08, sd: 2.27 },
  fruitsVeg: { mean: 3.88, sd: 2.02 },
  mindfulness: { mean: 1.38, sd: 2.40 }
};

/* ---- Minutes/week categorical → midpoint ---- */
const minutesMidpoints = {
  "1-15": 8,
  "16-30": 23,
  "31-59": 45,
  "60-89": 75,
  "90-119": 105,
  "120-149": 135,
  "150+": 165,
  "180+": 195
};

/* ---- Utility: z-score ---- */
function zScore(x, mean, sd) {
  return (x - mean) / sd;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  /* ---- Step 1: raw inputs ---- */
  const exerciseDays = Number(form.Exercise.value);
  const minutesCat = form.minutes.value;
  const trainingEvent = form.Event.checked ? 1 : 0;
  const activity150 = form.min_boolean.checked ? 1 : 0;
  const sleepHours = Number(form.sleep.value);
  const restedDays = Number(form.rested.value);
  const fruitsVeg = Number(form.fruits.value);
  const mindfulness = Number(form.mindfulness.value);

  /* ---- Step 2: convert minutes/week ---- */
  const exerciseMinutes = minutesMidpoints[minutesCat];

console.log(exerciseDays);
console.log(exerciseMinutes);
console.log(trainingEvent);
console.log(activity150);
console.log(sleepHours);
console.log(restedDays);
console.log(fruitsVeg);
console.log(mindfulness);


  /* ---- Step 4: compute z-scores ---- */
  const zScores = [];
 if(document.getElementById("E_days").checked === true){
    zScores.push(zScore(exerciseDays, params.exerciseDays.mean, params.exerciseDays.sd));
 }
if(document.getElementById("E_minutes").checked === true){
    zScores.push(zScore(exerciseMinutes, params.exerciseMinutes.mean, params.exerciseMinutes.sd));
}
if(document.getElementById("min_boolean").checked === true){
   zScores.push(zScore(activity150, params.activity150.mean, params.activity150.sd));
}
 
if(document.getElementById("Et_boolean").checked === true){
    zScores.push(zScore(trainingEvent, params.trainingEvent.mean, params.trainingEvent.sd));
}
if(document.getElementById("S_hours").checked === true){
    zScores.push(zScore(sleepHours, params.sleepHours.mean, params.sleepHours.sd));
}
if(document.getElementById("R_days").checked === true){
    zScores.push(zScore(restedDays, params.restedDays.mean, params.restedDays.sd));
}
if(document.getElementById("F_servings").checked === true){
  zScores.push(zScore(fruitsVeg, params.fruitsVeg.mean, params.fruitsVeg.sd));

}
if(document.getElementById("M_days").checked === true){
    zScores.push(zScore(mindfulness, params.mindfulness.mean, params.mindfulness.sd));
}

  var k = zScores.length; 
  console.log(k);

  /* ---- Step 5: composite z-bar ---- */

  if (k < 2) {
    alert("At least 2 components are required to compute PA-QoL.");
    return;
  }

  const zBar = zScores.reduce((a, b) => a + b, 0) / k; /*Accumelator. (a,b) a is the current index, the one that was passed by the prior operation, 
                                                        or in the initial value case (,0) is equal to 0 at the first step. The .reduce method then takes
                                                        parameter b, which is the current index in the array. After the first cycle, a is passed as the output from the previous
                                                        accumulation, (simple recursive process) while b becomes the next element in the array */

  /* ---- Step 6: T-score ---- */
  const paQol = 50 + 21.74 * zBar;
  console.log(zBar.toFixed(3));

document.getElementById("Z_Comp").innerHTML = "" + zBar.toFixed(3);
document.getElementById("Score").innerHTML = "" + paQol.toFixed(1);
});
