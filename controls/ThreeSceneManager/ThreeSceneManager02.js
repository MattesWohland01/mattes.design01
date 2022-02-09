var Modul = (function (modul) {
  /* … private Objekte … */

  /* Lege Methode am Modulobjekt an: */
  modul.methode1 = function () 
  {  return new sap.ui.core.HTML({
                content: "<canvas class='THSM_threeCylinderGeometry' id='threeCanvas' ></canvas>"                
            });
  };

  return modul;
}(Modul || {}));
