// Helper to group array of objects by key

export default function(array, key, excludeValue) {
  return array.reduce((result, currentValue) => {
    // Check for value if user want to exclude grouping by it

    if (excludeValue) {
      if (currentValue[key] !== excludeValue) {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
      }
    } else {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
    }

    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
}
