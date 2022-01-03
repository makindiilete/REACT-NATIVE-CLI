package com.makindiilete.rncontacts;

import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreen;
import android.os.Bundle; // Import this.
public class MainActivity extends ReactActivity {

  // Add this method.
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rncontacts";
  }
}
