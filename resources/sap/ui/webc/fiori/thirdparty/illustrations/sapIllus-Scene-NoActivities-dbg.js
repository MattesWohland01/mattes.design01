sap.ui.define(function () { 'use strict';

    var sceneSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="320" height="240" viewBox="0 0 320 240" id="sapIllus-Scene-NoActivities">
    <path class="sapIllus_BackgroundColor" d="M266.9815,95.18c-8.7871-18.7754-27.964-28.3084-50.7239-33.9747-34.4753-8.5832-70.55-40.3379-107.0375-34.4934-34.3072,5.4952-64.1914,34.3221-71.7923,69.07C23.6019,158.9869,73.0711,205.8384,128.67,218.065c25.7132,5.6544,53.0638,5.9906,77.8122-3.1356,36.5962-13.4952,64.6993-52.1564,65.62-92.4247C272.35,111.6868,270.4978,102.6934,266.9815,95.18Z"/>
    <rect class="sapIllus_Layering2" x="239.7247" y="108.5124" width="52" height="43" rx="0.8596"/>
    <rect class="sapIllus_ObjectFillColor" x="244.7247" y="112.5124" width="42" height="35" rx="0.5331"/>
    <path class="sapIllus_Layering2" d="M274.5353,119.53a3.2358,3.2358,0,0,0-3.3509-2.0285,5.3727,5.3727,0,0,0-3.3595,2.2749,16.8738,16.8738,0,0,0-2.8711,9.25l.0477,1.2616c-.9115-3.5088-3.713-6.2517-6.9046-8.0052a6.4494,6.4494,0,0,0-7.2546.807,2.7391,2.7391,0,0,0,1.0872,4.8911c1.4478.34,2.5466-.232,3.9965-.1383a10.9844,10.9844,0,0,1,6.4966,2.8207,5.8152,5.8152,0,0,1,1.9661,4.0746l.8356-.8827c.0108-.058.0131-.117.0222-.1753a5.2316,5.2316,0,0,1,2.6609-1.2082,7.74,7.74,0,0,0,2.9642-1.4913,4.66,4.66,0,0,0,1.6406-2.83,15.157,15.157,0,0,1,.22-2.8334c.1975-.58.9586-1.1885,1.2764-1.7127A5.2741,5.2741,0,0,0,274.5353,119.53Z"/>
    <path class="sapIllus_Layering1" d="M276.3949,132.5124h-19.34a.33.33,0,0,0-.33.33v3.34a.33.33,0,0,0,.33.33h1.6831l3.9051,11h8.6977l3.9051-11h1.1493a.33.33,0,0,0,.33-.33v-3.34A.33.33,0,0,0,276.3949,132.5124Z"/>
    <path class="sapIllus_Layering2" d="M266.48,132.4481l.8784-.6522a7.0706,7.0706,0,0,1,2.0055-1.7075,9.7415,9.7415,0,0,1,9.8878-.38c2.1589,1.0764,4.4759,2.9855,4.48,5.412.0036,2.1866-2.8207,2.84-4.1757,2.05-1.1413-.6658-1.8017-1.8323-2.7189-2.74a9.7583,9.7583,0,0,0-5.7052-2.6542,5.0869,5.0869,0,0,0-3.3536.6959Z"/>
    <polygon class="sapIllus_StrokeDetailColor" points="275.246 136.512 259.119 136.512 274.681 138.102 275.246 136.512"/>
    <path class="sapIllus_StrokeDetailColor" d="M265.5748,131.7654a.125.125,0,0,1-.1044-.0562,13.5546,13.5546,0,0,0-7.6612-5.5337.125.125,0,0,1-.0879-.1533.13.13,0,0,1,.1533-.0879,13.8122,13.8122,0,0,1,7.8047,5.6372.125.125,0,0,1-.1045.1939Z"/>
    <path class="sapIllus_StrokeDetailColor" d="M266.8468,130.2727a.1336.1336,0,0,1-.0332-.0044.1252.1252,0,0,1-.0874-.1538,40.6043,40.6043,0,0,1,3.3892-8.482.125.125,0,1,1,.22.1182,40.3794,40.3794,0,0,0-3.3682,8.43A.125.125,0,0,1,266.8468,130.2727Z"/>
    <circle class="sapIllus_BackgroundColor" cx="266.7247" cy="112.5124" r="2"/>
    <rect class="sapIllus_Layering2" x="19.7247" y="134.5124" width="42" height="45" rx="0.5393"/>
    <rect class="sapIllus_ObjectFillColor" x="24.7247" y="138.5124" width="32" height="28" rx="0.4472"/>
    <circle class="sapIllus_Layering1" cx="29.2247" cy="139.0124" r="2.5"/>
    <circle class="sapIllus_Layering1" cx="52.2247" cy="139.0124" r="2.5"/>
    <path class="sapIllus_Layering2" d="M40.7812,143.5879l-8.8858,7.1153a.4548.4548,0,0,0,.2851.8092H50.2557a.4548.4548,0,0,0,.2851-.8092l-9.1894-7.1153A.4549.4549,0,0,0,40.7812,143.5879Z"/>
    <rect class="sapIllus_Layering2" x="32.7247" y="153.4875" width="16" height="9" rx="0.5289"/>
    <circle class="sapIllus_BackgroundColor" cx="248.7247" cy="32.5124" r="15"/>
    <path class="sapIllus_PatternShadow" d="M230.9642,68.5721l.0255-1.06L140.3,67.489a26.0979,26.0979,0,0,0-24.2148,18.0234h-.0173c-2.7977,7.2671-3.2939,15.4912-2.6721,22.3016,1.9532,21.3851,9.5056,52.3106-11.0172,69.0183a1.9077,1.9077,0,0,0,1.1636,3.4121l13.9079.268h80.84a.9973.9973,0,0,0,.5018-.1361c24.6841-14.4718,21.3761-43.4791,18.7163-66.7872-.3531-3.1033-.6322-6.1029-.9535-8.9276-.85-7.4806-1.2708-13.7649-.3019-19.1491h.2163a23.0417,23.0417,0,0,1,3.732-9.2707A23.3968,23.3968,0,0,1,224.2,72.0033l.0022-.0016.0051-.0037,1.2489-.8885A20.2627,20.2627,0,0,1,230.9642,68.5721Z"/>
    <path class="sapIllus_Layering1" d="M96.6274,174.5067a1.9314,1.9314,0,0,1-1.1748-3.4532c20.72-16.9089,13.2511-48.6162,11.2792-70.2592-1.3957-15.32,2.7452-37.7225,25.7193-40.7979a22.5119,22.5119,0,0,1,2.9938-.1693l85.9068-.3068c.7261,0,.8589,1.35.2672,1.772l-4.3821,3.0749c-9.26,9.0172-8.7582,18.1461-7.0517,33.197.3239,2.8551.6054,5.8869.9614,9.0236,2.6819,23.5591,5.8095,53.0161-19.08,67.6438a1.0027,1.0027,0,0,1-.5052.1375H110.84Z"/>
    <path class="sapIllus_AccentColor" d="M198.9567,77.4937s-.7211-17.9194,1.5655-17.9771h21.5663a.6633.6633,0,0,1,.3433,1.2185c-1.4833.9583-3.5118,2.6566-4.9228,3.791a21.07,21.07,0,0,0-7.6861,12.963Z"/>
    <path class="sapIllus_ObjectFillColor" d="M86.9642,165.62a1.9129,1.9129,0,0,1-1.1716-3.4234c20.6649-16.7635,13.2679-47.9519,11.3012-69.4086-1.3906-15.172,3.4755-37.4614,26.3261-40.5466a23.3962,23.3962,0,0,1,3.1269-.1774l88.9085.0241-6.4106,4.5438c-10.5343,7.881-9.7978,18.03-8.0938,32.9692.3235,2.834.6505,6.4019.98,9.5182,2.4748,23.4452,5.6314,51.754-18.4336,66.3649a.9666.9666,0,0,1-.5035.1358H86.9642Z"/>
    <path class="sapIllus_Layering2" d="M202.9027,134.578H169.3284c.9549-10.4039-.3648-21.4-1.543-31.183-.0823-.6815-.1594-1.2155-.2391-1.8824l34.2314.0444-.1262-1.1223-34.2379-.0443c-.2744-2.3264-.5289-4.7037-.7242-6.8577-1.5889-17.525,4.1454-37.266,25.0084-40.1132a.56.56,0,0,0,.4767-.6313.55.55,0,0,0-.6269-.48c-10.4,1.4192-17.8788,6.84-22.231,16.1113-4.3925,9.36-4.227,19.8166-3.7373,25.2163.1932,2.1255.4706,4.6231.7394,6.91l-36.4444-.009c-.2741-2.3262-.5256-4.8493-.7208-7.0038-1.589-17.525,4.1453-37.266,25.0083-40.1132a.56.56,0,0,0,.4767-.6313.5455.5455,0,0,0-.6269-.48c-10.4,1.4192-17.8788,6.84-22.2309,16.1113-4.3925,9.36-4.227,19.8166-3.7373,25.2163.1931,2.1254.4529,4.5719.7217,6.8586l-30.36.0131.12,1.0051,30.3664-.009c.0848.7122.1636,1.3027.2513,2.0317,1.1741,9.7477,2.4891,20.7145,1.5221,31.0427l-30.5538-.0729-.1183,1.007,30.5747.0729c-1.0285,9.4575-4.0571,18.323-10.9834,25.148a35.1754,35.1754,0,0,1-4.0365,3.347l-1.8765,1.4c-.2492.1819-.1788.3808.0019.6318a.5568.5568,0,0,0,.4516.2323.5506.5506,0,0,0,.3265-.1063L116.2,164.99a36.3559,36.3559,0,0,0,4.1629-3.4544c7.1869-7.0818,10.2928-16.23,11.3291-25.95h36.4114c-1.0285,9.4575-4.0571,18.323-10.9828,25.148a35.1335,35.1335,0,0,1-4.0376,3.347l-1.9565,1.4295a.5637.5637,0,0,0-.1251.7836.5054.5054,0,0,0,.4415.1959.5565.5565,0,0,0,.3366-.07l1.9565-1.4294a36.2248,36.2248,0,0,0,4.1639-3.4544c7.1864-7.0818,10.2921-16.23,11.3284-25.95h33.513Zm-71.1106-.0988c.9548-10.42-.3646-21.433-1.5427-31.2315-.0824-.6841-.1627-1.0747-.2425-1.7441l36.4439.009c.0847.7121.14,1.1383.2277,1.8669,1.1742,9.7654,2.49,20.7525,1.5225,31.1Z"/>
    <path class="sapIllus_BrandColorSecondary" d="M99.9524,70.521a29.7039,29.7039,0,0,1,9.6359-12.8632,26.1987,26.1987,0,0,1,15.4462-5.5941l90.6347.0244-1.2424.9468c-1.8546.5527-2.9518,2.0067-5.6287,3.73-6.4477,4.151-8.2146,11.6309-8.555,13.756Z"/>
    <path class="sapIllus_AccentColor" d="M98.5161,51.7259c-2.2007-.8216-3.272-2.8257-4.102-4.8687a.433.433,0,0,0-.3977-.2661.4229.4229,0,0,0-.4044.2567c-1.1076,2.5415-2.7583,3.8445-4.67,5.3529l-.0474.0373a.4131.4131,0,0,0-.1481.4243.4289.4289,0,0,0,.3317.3121c1.6694.3431,4.2526,3.4308,4.2526,5.0822a.4246.4246,0,0,0,.3714.4158.4516.4516,0,0,0,.0618.0041.4313.4313,0,0,0,.4154-.3018c.5577-1.8408,2.172-4.8687,4.3347-5.6645a.4154.4154,0,0,0,.0017-.7843Z"/>
    <path class="sapIllus_AccentColor" d="M85.1039,64.1345c-3.3507-1.32-4.9754-4.5185-6.2318-7.7789A.5034.5034,0,0,0,78.41,56.03a.5275.5275,0,0,0-.4695.3136c-1.4065,3.9965-4.0887,6.3806-7.0461,8.5211l-.0658.0553a.5212.5212,0,0,0-.172.5194.51.51,0,0,0,.3852.3818c2.547.552,6.49,5.52,6.49,8.1774a.5109.5109,0,0,0,.4313.5088.5.5,0,0,0,.554-.3643c.8438-2.9377,3.2937-7.7718,6.5844-9.049a.5177.5177,0,0,0,.002-.9595Z"/>
    <path class="sapIllus_StrokeDetailColor" d="M182.06,166.4965H101.137l-13.9838-.27a2.3708,2.3708,0,0,1-2.2564-1.59,2.4457,2.4457,0,0,1,.7763-2.7382c17.4371-14.23,14.4172-39.1829,11.9911-59.2332-.42-3.4718-.8169-6.7508-1.1011-9.8661-.49-5.3785-.6554-15.7927,3.739-25.1131,4.35-9.2267,11.8282-14.6213,22.2261-16.0334a23.3983,23.3983,0,0,1,3.17-.1824h.0186l89.4525.13a.5024.5024,0,0,1,.2568.933l-4.791,3.0682a20.8448,20.8448,0,0,0-6.3225,5.6712c-4.7916,6.6949-4.8918,15.095-3.4,28.2538.158,1.3915.3057,2.8246.4574,4.292.1579,1.5331.32,3.104.5008,4.7014,2.69,23.6245,6.0369,53.0261-19.0541,67.771A1.4913,1.4913,0,0,1,182.06,166.4965ZM125.6973,52.4741a22.3923,22.3923,0,0,0-3.035.1735c-20.9388,2.8437-26.6959,22.5582-25.1013,40.06.2822,3.1.6784,6.3723,1.0976,9.8362,2.4559,20.2954,5.5125,45.5536-12.3536,60.1328a1.4349,1.4349,0,0,0-.4641,1.6234,1.3734,1.3734,0,0,0,1.3275.9227l13.9784.27H182.06a.5006.5006,0,0,0,.25-.0677c24.5286-14.415,21.2225-43.4562,18.566-66.7915-.1819-1.6013-.3443-3.1751-.5028-4.7121-.1506-1.4635-.2984-2.8932-.4554-4.2812-1.2825-11.3115-1.8983-21.2972,3.581-28.953a21.842,21.842,0,0,1,6.6218-5.9477l3.5648-2.1377-87.969-.1274Z"/>
</svg>
`;

    return sceneSvg;

});
