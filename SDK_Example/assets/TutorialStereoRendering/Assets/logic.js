arel.sceneReady(function()
{
	console.log("sceneReady");

	// Set a listener to get information about when the image is tracked
	arel.Events.setListener(arel.Scene, trackingHandler);

	// Adjust stereo calibration (i.e. difference in view of camera vs. left/right eye).
	// These are contrived example values. Real values should be gathered by an exact
	// calibration. Note that for typical scenarios, e.g. AR/VR glasses where the camera has
	// a translation to left/right eye, the camera image is still rendered as for the mono
	// case (it is not transformed by the hand-eye calibration to look correct). Therefore
	// on glasses, see-through mode should be enabled (see below).
	// This is just a contrived example. The values are overwritten below, using the recommended
	// approach.
	var rotationLeft = new arel.Rotation();
	rotationLeft.setFromEulerAngleDegrees(new arel.Vector3D(0, -18, 0));
	arel.Scene.setHandEyeCalibration(
		new arel.Vector3D(70, 0, 0),
		rotationLeft,
		arel.CameraType.RENDERING_STEREO_LEFT);
	var rotationRight = new arel.Rotation();
	rotationRight.setFromEulerAngleDegrees(new arel.Vector3D(0, 7, 0));
	arel.Scene.setHandEyeCalibration(
		new arel.Vector3D(10, 0, 0),
		rotationRight,
		arel.CameraType.RENDERING_STEREO_RIGHT);

	// Recommended way to load stereo calibration (in this order):
	// 1) Load your own, exact calibration (calibration XML file created with Toolbox 6.0.1 or newer),
	//    i.e. *you* as developer provide a calibration file. Note that the path to "hec.xml"
	//    doesn't actually exist in this example; it's only there to show how to apply a custom
	//    calibration file.
	// 2) Load calibration XML file from default path, i.e. in case the user has used Toolbox to
	//    calibrate (result file always stored at same path).
	// 3) Load calibration built into Metaio SDK for known devices (may not give perfect result
	//    because stereo glasses can vary).
	// Items 2) and 3) only do something on Android for the moment, as there are no supported,
	// non-Android stereo devices yet.
	arel.Scene.setHandEyeCalibrationFromFile("Assets/hec.xml", function(succeeded) {
		if (!succeeded)
		{
			// File not found or failed to load, try 2) and 3)
			arel.Scene.setHandEyeCalibrationFromFile(function(succeeded) {
				// There's also no default file, try 3)
				if (!succeeded)
				{
					arel.Scene.setHandEyeCalibrationByDevice();
				}
			});
		}
	});

	// Enable stereo rendering
	arel.Scene.setStereoRendering(true);

	// Enable see through mode (e.g. on glasses)
	arel.Scene.setSeeThrough(true);
	arel.Scene.setSeeThroughColor(new arel.Vector4D(0, 0, 0, 255));
});

function trackingHandler(type, param)
{
	// Check if there is tracking information available
	if(param[0] !== undefined)
	{
		if(type && type == arel.Events.Scene.ONTRACKING && param[0].getState() == arel.Tracking.STATE_TRACKING)
		{
			console.log("Tracking is active");
		}
		else if(type && type == arel.Events.Scene.ONTRACKING && param[0].getState() == arel.Tracking.STATE_NOTTRACKING)
		{
			console.log("Tracking is lost");
		}
	}
};