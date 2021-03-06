arel.sceneReady(function()
{
	// Note that front camera is selected via index.xml. You could also use the function
	// arel.Scene.startCamera if you want to switch the camera dynamically.
	// see more at https://dev.metaio.com/sdk/documentation/faq/starting-front-or-back-facing-camera/
});

var selectedCamera = arel.Camera.FACE_FRONT;

function switchCameraButtonClicked()
{
    if(selectedCamera == arel.Camera.FACE_FRONT) 
    {
        selectedCamera = arel.Camera.FACE_BACK;
    } 
    else 
    {
        selectedCamera = arel.Camera.FACE_FRONT;
    }
    arel.Scene.startCamera(selectedCamera);
}