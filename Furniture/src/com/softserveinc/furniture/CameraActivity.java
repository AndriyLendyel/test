package com.softserveinc.furniture;
import java.io.File;

import android.util.Log;
import android.view.View;

import com.metaio.sdk.ARViewActivity;
import com.metaio.sdk.MetaioDebug;
import com.metaio.sdk.jni.IGeometry;
import com.metaio.sdk.jni.IMetaioSDKCallback;
import com.metaio.tools.io.AssetsManager;

public class CameraActivity extends ARViewActivity 
{
	
	@Override
	protected int getGUILayout() 
	{
		// Attaching layout to the activity
		return R.layout.camera_activity; 
	}


	public void onButtonClick(View v)
	{
		finish();
	}
	
	
	@Override
	protected void loadContents() 
	{
		
		try
		{
			// Getting a file path for tracking configuration XML file
			File trackingConfigFile = AssetsManager.getAssetPathAsFile(getApplicationContext(), "TutorialHelloWorld/Assets/TrackingData_MarkerlessFast.xml");
			
			// Assigning tracking configuration
			boolean result = metaioSDK.setTrackingConfiguration(trackingConfigFile); 
			MetaioDebug.log("Tracking data loaded: " + result); 
	      
			 String modelFileName = getIntent().getExtras().getString("modelFileName");
			// Getting a file path for a 3D geometry
			File metaioManModel = AssetsManager.getAssetPathAsFile(getApplicationContext(), "TutorialHelloWorld/Assets/"+modelFileName);			
			if (metaioManModel != null) 
			{
				// Loading 3D geometry
				IGeometry geometry = metaioSDK.createGeometry(metaioManModel);
				if (geometry != null) 
				{
					// Set geometry properties
					geometry.setScale(0.5f);
				}
				else
					MetaioDebug.log(Log.ERROR, "Error loading geometry: "+metaioManModel);
			}
		}
		catch (Exception e)
		{
			MetaioDebug.printStackTrace(Log.ERROR, e);
		}
	}


	@Override
	protected void onGeometryTouched(IGeometry geometry)
	{
		// Not used in this tutorial
	}


	@Override
	protected IMetaioSDKCallback getMetaioSDKCallbackHandler()
	{
		// No callbacks needed in this tutorial
		return null;
	}	
}