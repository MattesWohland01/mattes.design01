sap.ui.define(["../types/InvisibleMessageMode","./getSingletonElementInstance","../Boot"],function(e,t,s){"use strict";let i;let n;s.attachBoot(()=>{if(i&&n){return}const e=`position: absolute;\n\tclip: rect(1px,1px,1px,1px);\n\tuser-select: none;\n\tleft: -1000px;\n\ttop: -1000px;\n\tpointer-events: none;`;i=document.createElement("span");n=document.createElement("span");i.classList.add("ui5-invisiblemessage-polite");n.classList.add("ui5-invisiblemessage-assertive");i.setAttribute("aria-live","polite");n.setAttribute("aria-live","assertive");i.setAttribute("role","alert");n.setAttribute("role","alert");i.style.cssText=e;n.style.cssText=e;t("ui5-static-area").appendChild(i);t("ui5-static-area").appendChild(n)});const a=(t,s)=>{const a=s===e.Assertive?n:i;a.textContent="";a.textContent=t;if(s!==e.Assertive&&s!==e.Polite){console.warn(`You have entered an invalid mode. Valid values are: "Polite" and "Assertive". The framework will automatically set the mode to "Polite".`)}};return a});