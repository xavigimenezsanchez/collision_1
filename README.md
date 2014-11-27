# Amb dues Pilotes i un rectangle
## bé de fet hi ha 150 pilotes

Per aquest exemple he fet servir la POO clàsica.

Hi ha 4 classes:
* **Joc**
* **CanvasElement**
* **Pilota**
* **Totxo**

#CanvaElement
   
   Aquesta és la classe (abstracta) de la que hereta qualsevol element que volem pintar en el canvas.
   
   El mètode **collisio** s'encarrega de dir-nos en quina paret ha col·lisionat la pilota
   
#Pilota

   Aquesta és la classe filla que hereta de **CanvasElement**.
   
   Té una nova propietat que és **color**.
   
   La màgia de les matemàtiques la trobem al mètode **moure**
   
   La col·lisió amb el rectangle(totxo) la controlem al mètode **collisioTotxo**
   
#Joc

   És la classe que crea el canvas, el array de pilotes i fa que es mogin

#Totxo
   És la classe que crea un rectangle en el canvas
