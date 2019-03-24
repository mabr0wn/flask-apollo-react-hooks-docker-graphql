const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * async/await did not work with docker, removed.
 * @param {*} values displays the values typed into the redux forms.
 */
const showResults = (values) => {
   sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

export default showResults;