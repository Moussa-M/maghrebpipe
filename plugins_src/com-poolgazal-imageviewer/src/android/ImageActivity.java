package com.poolgazal.imageviewer;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.StrictMode;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;


import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.net.HttpURLConnection;
import java.util.Arrays;
import java.util.Iterator;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;


import com.ortiz.touchview.TouchImageView;


public class ImageActivity extends Activity {


    private TouchImageView image;

    private ImageButton closeBtn;
    private ImageButton shareBtn;
    private ProgressBar loadingBar;

    private TextView titleTxt;

    private String mImage;
    private String mTitle;
    private boolean mShare;
    private boolean mClose;
    private File mTempImage;
    private int shareBtnVisibility;
    private int closeBtnVisibility;

    public static JSONArray mArgs = null;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(getApplication().getResources().getIdentifier("activity_image", "layout", getApplication().getPackageName()));

        // Load the Views
        findViews();

        try {
            this.mImage = mArgs.getString(0);
            this.mTitle = mArgs.getString(1);
            this.mShare = mArgs.getBoolean(2);
            this.mClose = mArgs.getBoolean(3);

            //Set the share button visibility
            shareBtnVisibility = this.mShare ? View.VISIBLE : View.INVISIBLE;
            //Set the ؤمخسث button visibility
            closeBtnVisibility = this.mClose ? View.VISIBLE : View.INVISIBLE;


        } catch (JSONException exception) {
            shareBtnVisibility = View.INVISIBLE;
            closeBtnVisibility = View.VISIBLE;
        }
        shareBtn.setVisibility(shareBtnVisibility);
        closeBtn.setVisibility(closeBtnVisibility);
        //Change the activity title
        if (!mTitle.equals("")) {
            titleTxt.setText(mTitle);
        }

        loadImage();

        // Set Button Listeners
        closeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        shareBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (Build.VERSION.SDK_INT >= 24) {
                    try {
                        Method m = StrictMode.class.getMethod("disableDeathOnFileUriExposure");
                        m.invoke(null);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

                Uri imageUri;
                if (mTempImage == null) {
                    mTempImage = getLocalBitmapFileFromView(image);
                }

                imageUri = Uri.fromFile(mTempImage);

                if (imageUri != null) {
                    Intent sharingIntent = new Intent(Intent.ACTION_SEND);

                    sharingIntent.setType("image/*");
                    sharingIntent.putExtra(Intent.EXTRA_STREAM, imageUri);

                    startActivity(Intent.createChooser(sharingIntent, "Share"));
                }
            }
        });

    }

    /**
     * Find and Connect Views
     */
    private void findViews() {
        // Buttons first
        closeBtn = (ImageButton) findViewById(getApplication().getResources().getIdentifier("closeBtn", "id", getApplication().getPackageName()));
        shareBtn = (ImageButton) findViewById(getApplication().getResources().getIdentifier("shareBtn", "id", getApplication().getPackageName()));

        //ProgressBar
        loadingBar = (ProgressBar) findViewById(getApplication().getResources().getIdentifier("loadingBar", "id", getApplication().getPackageName()));
        // Image Container
        image = (TouchImageView) findViewById(getApplication().getResources().getIdentifier("imageView", "id", getApplication().getPackageName()));
        

        // Title TextView
        titleTxt = (TextView) findViewById(getApplication().getResources().getIdentifier("titleTxt", "id", getApplication().getPackageName()));
    }

    /**
     * Get the current Activity
     *
     * @return
     */
    private Activity getActivity() {
        return this;
    }

    /**
     * Hide Loading when showing the Image. Update the ImageView Attacher
     */
    private void hideLoadingAndUpdate() {
        image.setVisibility(View.VISIBLE);
        loadingBar.setVisibility(View.INVISIBLE);
        shareBtn.setVisibility(shareBtnVisibility);

    }



    /**
     * Load the image using TouchImageView
     */

    private boolean isLocalFile(Uri uri) {
        String auth = uri.getHost();

        if (auth.equals("localhost") || uri.getScheme().equals("file")) {
            return true;
        }
        return false;
    }
    private String getLocalFilePath(Uri uri) throws IOException {
        InputStream stream = getBaseContext().getAssets().open("www"+uri.getPath(), AssetManager.ACCESS_STREAMING);
        byte[] buffer = new byte[stream.available()];
        stream.read(buffer);

        File temp = File.createTempFile("temp_image", uri.getPath().substring(uri.getPath().lastIndexOf('.')));
        OutputStream outputStream =new FileOutputStream(temp);
        outputStream.write(buffer);
        stream.close();
        outputStream.close();
        return temp.getAbsolutePath();
    }
    private void loadImage() {

        Uri uri = Uri.parse(mImage);
        if (isLocalFile(uri)) {

            String path = null;
            try {
                path = getLocalFilePath(uri);
                Bitmap myBitmap = BitmapFactory.decodeFile(path);
                image.setImageBitmap(myBitmap);
            
            } catch (IOException e) {
                e.printStackTrace();
            }

     

            hideLoadingAndUpdate();
        } else if (mImage.startsWith("data:image")) {

            new AsyncTask<Void, Void, File>() {

                protected File doInBackground(Void... params) {
                    String base64Image = mImage.substring(mImage.indexOf(",") + 1);
                    return getLocalBitmapFileFromString(base64Image);
                }

                protected void onPostExecute(File file) {
                    Uri uri = Uri.fromFile(file);
                    image.setImageURI(uri);
                    hideLoadingAndUpdate();
                }
            }.execute();

        } else {
            image.setImageURI(Uri.parse(mImage));

            hideLoadingAndUpdate();
        }
    }

    public void onDestroy() {
        super.onDestroy();
    }


    public File getLocalBitmapFileFromString(String base64) {
        File file;
        try {
            file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
                    "share_image_" + System.currentTimeMillis() + ".png");
            file.getParentFile().mkdirs();
            FileOutputStream output = new FileOutputStream(file);
            byte[] decoded = Base64.decode(base64, Base64.DEFAULT);
            output.write(decoded);
            output.close();
        } catch (IOException e) {
            e.printStackTrace();
            file = null;
        }
        return file;
    }

    /**
     * Create Local Image due to Restrictions
     *
     * @param imageView
     * @return
     */
    public File getLocalBitmapFileFromView(ImageView imageView) {
        Drawable drawable = imageView.getDrawable();
        Bitmap bmp;

        if (drawable instanceof BitmapDrawable) {
            bmp = ((BitmapDrawable) imageView.getDrawable()).getBitmap();
        } else {
            return null;
        }

        // Store image to default external storage directory
        File file;
        try {
            file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
                    "share_image_" + System.currentTimeMillis() + ".png");
            file.getParentFile().mkdirs();
            FileOutputStream out = new FileOutputStream(file);
            bmp.compress(Bitmap.CompressFormat.PNG, 90, out);
            out.close();

        } catch (IOException e) {
            file = null;
            e.printStackTrace();
        }
        return file;
    }



}
