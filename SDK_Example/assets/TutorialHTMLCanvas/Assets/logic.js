function getTexture()
{
	//create an HTML5 Canvas
	canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 512;

	//get a 2D context
	var context = canvas.getContext('2d');
	
	//draw transparent background
	context.fillStyle = "rgba(0, 0, 255, 0.4)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//draw text (current time)
	context.fillStyle = "white";
	context.font = 'bold 80pt Helvetica';
	var currentdate = new Date(); 
	
	var hours = currentdate.getHours();
	if (hours < 10) hours = "0"+hours;
	
	var minutes = currentdate.getMinutes();
	if (minutes < 10) minutes = "0"+minutes;
	
	var seconds = currentdate.getSeconds();
	if (seconds < 10) seconds = "0"+seconds;
	
	var datetime = "" + hours + ":" + minutes + ":" + seconds;  
	context.fillText(datetime, 50, 300);

	//creat image data from the canvas
	var newImageData = canvas.toDataURL();
	return new arel.Image(newImageData);
}

var myObject;

arel.sceneReady(function() 
{
	//acquire texture 
	var image = getTexture();
	
	//create 3D model from image
	myObject = new arel.Object.Model3D.createFromArelImage("myObject", image);
	
	//scale 3D model
	myObject.setScale(new arel.Vector3D(5.0, 5.0, 5.0));
	arel.Scene.addObject(myObject);
	
	//update texture every 1s
	setInterval( function(){
		myObject.setTexture("myObject", getTexture() );
	}, 1000 );
});