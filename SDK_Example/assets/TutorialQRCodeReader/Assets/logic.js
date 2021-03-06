var currentQRCode = null;
var notTrackingTimer = null;

arel.sceneReady(function()
{
	arel.Scene.setTrackingConfiguration("QRCODE");
	arel.Events.setListener(arel.Scene, trackingHandler);
});

function trackingHandler(type, param)
{
	if(param[0] !== undefined)
	{
		if (type == arel.Events.Scene.ONTRACKING)
		{
			var trackingValues = param[0];

			if (trackingValues.getState() == arel.Tracking.STATE_TRACKING)
			{
				if (notTrackingTimer)
				{
					clearTimeout(notTrackingTimer);
					notTrackingTimer = null;
				}

				if (trackingValues.getContent() != currentQRCode)
				{
					currentQRCode = trackingValues.getContent();

					alert(currentQRCode);
				}
			}
			else if (trackingValues.getState() == arel.Tracking.STATE_NOTTRACKING && !notTrackingTimer)
			{
				// Allow showing next QR code scanned. Use delay because QR codes can quickly lose
				// tracking
				notTrackingTimer = setTimeout(function() {
					currentQRCode = null;
					notTrackingTimer = null;
				}, 200);
			}
		}
	}
};
