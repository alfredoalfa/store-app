---
title: "Groshop Template Installation Documentation"
keywords: 
sidebar: 
hide_sidebar: true
toc: false
search: false
permalink: index.html
summary: Technical information to help you setup mobile template of Groshop - Shop Delivery Template.
---
<div class="row">
  <div class="col-md-6 section-col">
    <h2 id="mobile-title" class="section-title">Instructions for building android mobile app</h2>
    <p>Following section explains how to connect Andrioid App to server and built it properly</p>
  </div>
  <div class="col-md-6">
    <section id="footer-cta" class="hasAnim on" data-offset="100">
      <div class="bg-wrap">
        <div class="background cn basic-scaler">
          <!-- animations -->

          <div class="blob part" data-num="1"><img src="https://cognitohq.com/wp-content/themes/cognito/images/parts/footer-blob1.svg"></div>

          <div class="part main"><img src="https://cognitohq.com/wp-content/themes/cognito/images/parts/footer-cta.svg"></div>      

          <div class="part main"><img src="https://cognitohq.com/wp-content/themes/cognito/images/parts/footer-girl@2x.png"></div>

          <div class="blob part" data-num="2"><img src="https://cognitohq.com/wp-content/themes/cognito/images/parts/footer-blob2.svg"></div>
          <div class="man part"><img src="https://cognitohq.com/wp-content/themes/cognito/images/parts/footer-man@2x.png"></div>

          <!-- end animations -->
        </div>
      </div>    
    </section>
  </div>  
</div>
<div markdown="1">

1. ### Download And Setup Ionic
      - `download node` Install Node.js version 13.14.0 on your system [https://nodejs.org/en/blog/release/v13.14.0/](https://nodejs.org/en/blog/release/v13.14.0/).
      - Install node with installer and on screen instructions.
      - Verify node installation by running `node -v` you should see version 13.14.0 output.
      - `Install ionic globally 5.4.16` -> `npm install -g ionic@5.4.16`. 
      - Verify ionic installation by running `ionic -v` you should see version 5.4.16 output.
      - `Install cordova globally` for platform builds -> `npm install -g cordova@10.0.0`. 
      - Verify installation by running `cordova -v` you should see version 10.0.0 output.

2. ### First Run
    - **Requires Step 1: Download And Setup Ionic**
    - Open your desired cmd/terminal and navigate to the source folder (project).
    - run `npm install` to install project dependencies.
    - then run `ionic serve` to run your project in browser.
    - Entering into `INSPECT` mode of browser to see mobile view of the app

3. ### Setup And Customization
    ### resources
      - To change app icon and splash in your template for refer [https://stackoverflow.com/questions/55813237/how-to-change-default-app-icon-and-splash-screen-in-ionic-4-application](https://stackoverflow.com/questions/55813237/how-to-change-default-app-icon-and-splash-screen-in-ionic-4-application).
    ### src
      ### app
      - Here show all components first and to change according your screens. 
      ### assets
        - `images` To change logo and other image assets (only `.png` files) in your templete from `src/assets/images`.
        - To chnage other image assets (other `name` image). Here you put assets path `src/assets/image_name.png` in your screen `app` `your_page_name.page.html`. to display same screen.
      ### Changing Colours And Theme Settings.
       - For this you'll have to focus on two files. i.e.
       - `src/global.scss` - containing application's primary colours and overall styling of various components.
       - `src/theme/variables.scss` - containing primary colours for various widgets used throughout the application. For example radio buttons. Also used for dark mode colouring.
       - Find `--primary` and `--secondary` in `global.scss` to change main `respective colour` of the app. Other colour codes below are also customizable.
       - Find `--ion-color-primary` in `theme/variable.scss` to change main `respective colour` of widgets in application.
       - Find `@media (prefers-color-scheme: dark)` in `theme/variable.scss` and uncomment everything below from here to enable System wide dark mode colour settings.
    ### config.xml
      - `config.xml` has two values. Your template's package name/template id in id parameter in line no. 2. and template name in line number 3.

4. ### Platform Builds
    - **Requires Step 1: Download And Setup Ionic**
    - Download and install Java here: [https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    - Android SDK setup. We recommend installing `Android Studio` for easy setup. [https://developer.android.com/studio/](https://developer.android.com/studio/)
    ### Android Build
      - To add platform run `ionic cordova platform add android@8.1.0`
      - To prepare platform run `ionic cordova prepare android`
      - To build debuggable .apk file run `ionic cordova build android --prod`
      - To build release unsigned .apk file run `ionic cordova build android --prod --release`
      - To generate a `Keystore` refer this. [https://stackoverflow.com/questions/11446121/how-do-i-generate-a-keystore-for-google-play](https://stackoverflow.com/questions/11446121/how-do-i-generate-a-keystore-for-google-play)
      - To sign builds and publishing refer this. [https://ionicframework.com/docs/deployment/play-store](https://ionicframework.com/docs/deployment/play-store).
    ### IOS Build
      - To add platform run `ionic cordova platform add ios@5.1.1`
      - To prepare platform run `ionic cordova prepare ios`
      - To build debuggable .apk file run `ionic cordova build ios --prod`
      - Opening respective project, open the .xcworkspace file in ./platforms/ios/ to start Xcode.
      - For XCode setup refer this. [https://ionicframework.com/docs/developing/ios](https://ionicframework.com/docs/developing/ios)
      
5. ### Deployment Of Applications
    ### Signing Builds
      ### Android
        - To sign builds and publishing refer this. [https://ionicframework.com/docs/deployment/play-store](https://ionicframework.com/docs/deployment/play-store).
      ### IOS
        - To sign builds and publishing refer this. [https://ionicframework.com/docs/deployment/app-store](https://ionicframework.com/docs/deployment/app-store).
    - Deploying apps on Google Play Store and Apple App Store is out of the scope of this document.
    - Kindly refer to this [guide](https://ionicframework.com/docs/intro/deploying/) for further instructions.

**Note: If you are unable to understand any topic or find any topic needs more elaboration. 
Please raise an issue ticket at this link [https://opuslabs.freshdesk.com](https://opuslabs.freshdesk.com)**
</div>