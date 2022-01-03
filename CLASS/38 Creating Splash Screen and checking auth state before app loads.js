/*
1-  To create our splash screen, we will be making use of the plugin 'npm i react-native-splash-screen@3.0.0'
2-  To create our assets, we will be using the website https://www.img-bak.in/
3-  Drop the image you want to use to create the splash screen and click on cook

ANDROID
1-  Then click on android to download the assets
2-  From ur project dir, go to 'android/app/src/main/res
3-  Paste the folders download from the baker file inside the res folder
4-  Open the project in android studio
5-  Go to the 'res' folder >> Right click >> Android resource file
6-  Resource Type = Layout
7-  File name = splash_layout
8-  Root Element = RelativeLayout
9-  Click Ok
10- The splash_layout.xml opens >> On the right-hand side, select Code and paste the following

<ImageView
        android:layout_width="match_parent"
        android:src="@drawable/logo"
        android:scaleType="centerCrop"
        android:layout_height="match_parent" />

'@drawable/d name of d image U put inside d drawable folders

11- Inside android/app/build.gradle, add these lines in the {dependencies } object starting at line 186
             implementation project(':react-native-splash-screen')
            implementation project(':react-native-device-info')
12- Inside android/settings.gradle, make sure these lines are added
            include ':react-native-splash-screen'
            project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')
13- Inside android/app/src/main/java/com/[Project name]/MainApplication.java >> Add these import 'import com.cboy.rn.splashscreen.SplashScreenReactPackage;'
14- Inside android/app/src/main/java/com/[Project name]/MainActivity.java >> Add these import statements : -
import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;

import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;

15- Add these methods inside the MainActivity.java
  // Add this method.
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }

16- File >> Sync project with gradle files
*/
