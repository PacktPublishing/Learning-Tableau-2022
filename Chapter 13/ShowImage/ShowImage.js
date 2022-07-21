'use strict';

(function () {
  $(document).ready(function () {


    // This is the entry point into the extension.  It initializes the Tableau Extensions Api, and then
    // grabs all of the parameters in the workbook, processing each one individually.
    tableau.extensions.initializeAsync().then(function () {
      tableau.extensions.dashboardContent.dashboard.getParametersAsync().then(function (parameters) {
        parameters.forEach(function (p) {
          p.addEventListener(tableau.TableauEventType.ParameterChanged, onParameterChange);
		  updateImage(p);
        });


      });
    });
  });

  // When the parameter value is changed, call the updateImage() function.
  function onParameterChange (parameterChangeEvent) {
    parameterChangeEvent.getParameterAsync().then(function (param) {
		updateImage(param);
    });
  }


  // This function updates the src attribute of the image in the HTML document based
  // on the value of the ImageURL and ImageWidth parameters in the dashboard
  function updateImage (p) {
	if (p.name=='ImageURL'){
	 document.getElementById("imgImage").src = p.currentValue.formattedValue;
	}
	else if (p.name=='ImageWidth'){
	 document.getElementById("imgImage").style.height = p.currentValue.formattedValue + "px";
	}

  }
})();
