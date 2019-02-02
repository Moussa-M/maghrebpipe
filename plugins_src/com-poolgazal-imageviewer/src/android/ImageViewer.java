package com.poolgazal.imageviewer;

import android.Manifest;
import android.app.ActivityOptions;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.transition.Explode;
import android.view.Window;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import io.maghrebpipe.app.R;

/**
 * Class to Open ImageViewer with the Required Parameters from Cordova
 * <p>
 * - URL
 * - Title
 */
public class ImageViewer extends CordovaPlugin {

    public static final int PERMISSION_DENIED_ERROR = 20;

    public static final String WRITE = Manifest.permission.WRITE_EXTERNAL_STORAGE;
    public static final String READ = Manifest.permission.READ_EXTERNAL_STORAGE;

    public static final int REQ_CODE = 0;

    protected JSONArray args;
    protected CallbackContext callbackContext;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("show")) {
            this.args = args;
            this.callbackContext = callbackContext;

            if (cordova.hasPermission(READ) && cordova.hasPermission(WRITE)) {
                this.launchActivity();
            } else {
                this.getPermission();
            }
            return true;
        }
        return false;
    }

    protected void getPermission() {
        cordova.requestPermissions(this, REQ_CODE, new String[]{WRITE, READ});
    }

    //
    protected void launchActivity() throws JSONException {
        Intent i = new Intent(this.cordova.getActivity(), ImageActivity.class);
        ImageActivity.mArgs = this.args;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
          

            this.cordova.getActivity().startActivity(i, ActivityOptions.makeSceneTransitionAnimation(this.cordova.getActivity()).toBundle());

        }else{
            this.cordova.getActivity().startActivity(i);
        }
        this.callbackContext.success("");
    }

    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions,
                                          int[] grantResults) throws JSONException {
        for (int r : grantResults) {
            if (r == PackageManager.PERMISSION_DENIED) {
                this.callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, PERMISSION_DENIED_ERROR));
                return;
            }
        }

        switch (requestCode) {
            case REQ_CODE:
                launchActivity();
                break;
        }

    }


}
