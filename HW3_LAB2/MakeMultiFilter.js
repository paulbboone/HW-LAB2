function MakeMultiFilter(array) {
    var originalArray = array;
    var currentArray = originalArray;
    return function arrayFilterer1(pred, callback) {
      if (typeof pred !== "function") return currentArray;
      // Filter out things
      currentArray = currentArray.filter(pred);
      // If callback is a function, execute callback
      if (typeof callback === "function")
        callback.call(originalArray, currentArray);
      return arrayFilterer1;
    };
  }
  
  // Invoking MakeMultiFilter() with originalArray = [1, 2, 3] returns a
  // function, saved in the variable arrayFilterer1, that can be used to
  // repeatedly filter the input array
  var arrayFilterer1 = MakeMultiFilter([1, 2, 3]);
  
  // Call arrayFilterer1 (with a callback function) to filter out all the numbers
  // not equal to 2.
  arrayFilterer1(
    function (elem) {
      return elem !== 2; // check if element is not equal to 2
    },
    function (currentArray) {
      // 'this' within the callback function should refer to originalArray which is [1, 2, 3]
      console.log(this); // prints [1, 2, 3]
      console.log(currentArray); // prints [1, 3]
    }
  );
  
  // Call arrayFilterer1 (without a callback function) to filter out all the
  // elements not equal to 3.
  arrayFilterer1(function (elem) {
    return elem !== 3; // check if element is not equal to 3
  });
  
  var currentArray = arrayFilterer1();
  console.log("currentArray", currentArray); 
  
  function filterTwos(elem) {
    return elem !== 2;
  }
  function filterThrees(elem) {
    return elem !== 3;
  }
  var arrayFilterer2 = MakeMultiFilter([1, 2, 3]);
  var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();
  console.log("currentArray2", currentArray2); 
  var arrayFilterer3 = MakeMultiFilter([1, 2, 3]);
  var arrayFilterer4 = MakeMultiFilter([4, 5, 6]);
  console.log(arrayFilterer3(filterTwos)()); 
  console.log(arrayFilterer4(filterThrees)()); 