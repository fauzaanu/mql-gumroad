# GUMROAD SERVER WORKAROUND FOR MQL

Gumroad requires apps to send a POST request to their server to verify a purchase.

MQL does support POST requests, but it is personally very hard to implement for me and i am sure for many others too who do not possess a C or C++ background.

Using the built in webrequest is not an option as adding the links becomes a huge hassle for the user. So we are going to use the wininet library.

The library Written by sergeylukin on https://github.com/sergeylukin/mql4-http offers the very simple solution for sending GET requests using the wininet library so we wont be reinventing the wheel here.

But . . . it does not support POST requests which is why this repo exists.

---

## THE WORKAROUND

We are going to send a get request to not gumroad but to a node express server which we setup with the license key and the product id as query parameters.

The node server will then send a post request to gumroad and return the response to the mql4 server as the response to the initial get request.

YES I AM INSANE, I KNOW. BUT IT WORKS.

---

## THE INCLUDE FILE

In this same repo i have included the include file which you can use in your mql4 project. (same as https://github.com/sergeylukin/mql4-http edited with cache being invalidated with some suggestions from mql4 forum)

If you have no idea how to implement it you would basically be placing this file in the MQL4/Include folder and then including it in your project as #include <webreq.mqh>

This file is not needed for running the server at all. It exists in this repo just for convenience.

YOU DO NOT NEED TO SHARE THIS FILE WITH THE USER AS IT WILL BE COMPILED

This method would require your users to allow dll imports in their metatrader.

---

## THE NODE SERVER

The node server is a simple express server which takes the license key and the product id as a get request and then sends a post request to gumroad with the license key and the product id.

No extra configuration is required. Just run the app.mjs file and it will start listening

---

## THE MQL PROGRAM

```
// making the user enter the license key
// you would hardcode the product id in your program by getting that info from gumroad
string product_id = "DqMF7N6ODH2u6lBF-r4tZw==";
input string license_key="09A8F037-C1B44C11-BDDDA796-662340FF";

// enter the server ip as baseurl and the rest should be fine
string baseurl = "http://localhost:3000";
string licensed = httpGET(baseurl+"/?product_id="+product_id+"&license_key="+license_key);
Comment("Copy is liencesed = ", licensed);

// licensed is a string with true or false
// you can edit the app.mjs file to return a json object with more info
// but as this is a very simple check i did not bother

```

---

## CONGRATS.

Now you have a simple way to make sure your users have purchased your product.

Decompilers exists however I would not bother too much about it unless you found EL DORADO

(If you found EL DORADO please let me know) 😅😅
