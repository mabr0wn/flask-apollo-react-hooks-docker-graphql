const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

 const showResults = (values) => {
   sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

export default showResults;