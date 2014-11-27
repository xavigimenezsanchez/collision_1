'use strict';

// Exemple de càlcul de col·lisions entre un  
// rectangle i un cercle
// fent servir la POO clàsica en javaScript


/*******************************************************
 *
 *          Classe CanvasEmement
 *  
 *******************************************************/



function CanvasElement(x,y,w,h,mx,my,v) {
    /*
     * Un trist element del canvas
     * */
    this.x = x;  
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;  // velocitat
    this.mx = mx;  // màxim valor de la x, és a dir el width del canvas
    this.my = my;  // màxim valor de la y, és a dir, el  height del vanvas
}

CanvasElement.prototype.collisio = function() {
    /*
     * Funció que detecta col·lisións de cada pilota 
     * amb les parets del canvas
     * */
    var noCollisio = -1, dalt = 0,dreta=1, baix = 2, esquerra = 3;
    if ((this.x + this.w) >= this.mx) {
        this.x = this.mx -this.w; //per que no aparegi una pilota pintada fora dels límits
        return dreta;
    } else if ((this.x-this.w) <= 0) {
        this.x = this.w;   //per que no aparegi una pilota pintada fora dels límits
        return esquerra;
        
    } else if ((this.y-this.h) <= 0) {
        this.y = this.h;   //per que no aparegi una pilota pintada fora dels límits
        return dalt;
    } else if ((this.y+this.h) >= this.my) {
        this.y = this.my - this.h;  //per que no aparegi una pilota pintada fora dels límits
        return baix;
    } else {
        return noCollisio;
    }
}

/*******************************************************
 *
 *          Classe Pilota
 *  
 *******************************************************/


function Pilota(x,y,r,angle, mx,my,v,color) {
    CanvasElement.call(this,x,y,r,r,mx,my,v); //amb això heretem de la classe CanvasElement
    this.angle = angle;
    this.color = color;
}

Pilota.prototype = Object.create(CanvasElement.prototype);  // Heretem el prototype de CanvasElement
Pilota.prototype.constructor = Pilota  // Corretgim el constructor de Pilota


Pilota.prototype.pintar = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.w,0,2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
} 


Pilota.prototype.moure = function (totxo) {
    /*  Canviar la direcció si ha 
     * col·lisionat amb la paret
     *                            */
    
    var noCollisio = -1, dalt = 0,dreta=1, baix = 2, esquerra = 3;
    var pi = Math.PI;
    var collisio;
    this.x += Math.cos(this.angle) * this.v;
    this.y += Math.sin(this.angle) * this.v;
    
    /* Aquí podeu comprovar la màgia de les matemàtiques
     * la formula per la dreta i la esquerra és la mateixa
     * i la formula per dalt i baix és la mateixa, 
     * increïble i apasionant, les matemàtiques són unes
     * de les portes que obren el coneixment i la apretura
     * de la nostra ment
     * */
    
    collisio = this.collisio();  //Primer comprovem si la pilota ha col·lisionat amb les parets
    
    if (collisio === -1) 
        collisio = this.collisioTotxo(totxo); // Si la pilota no ha col·lisiona amb la paret 
                                              // comprovem si ha ha col·lsionat amb el totxo
    
    
    
    switch (collisio) {
        case dreta:
            this.angle = pi - this.angle;
            break;
        case esquerra:
            this.angle = pi - this.angle;
            break;
        case baix:
            this.angle = 2 * pi - this.angle;
            break;
        case dalt:
            this.angle = 2 * pi - this.angle;
            break;
    }
    
    
}

Pilota.prototype.collisioTotxo = function(totxo) {
    var noCollisio = -1, dalt = 0,dreta=1, baix = 2, esquerra = 3;
    var collisio = false;
    
    // Primer comprobem si la pilota ha col·lisionat amb el totxo
    // utilitzant la sombra del totxo y el cercle al eix X i
    // al eix Y si les ombres d'aquest dos elements interseccionen
    // llavors s'ha produït una col·lisió
    if ( ((totxo.x < (this.x-this.w) && (this.x-this.w) < (totxo.x + totxo.w)) ||  //sobre l'eix X
          (totxo.x < (this.x+this.w) && (this.x+this.w) < (totxo.x + totxo.w))) && //sobre l'eix X 
         ((totxo.y < (this.y-this.h) && (this.y-this.h) < (totxo.y + totxo.h)) ||  //sobre l'eix Y
          (totxo.y < (this.y+this.h) && (this.y+this.h) < (totxo.y + totxo.h))))   //sobre l'eix Y
                collisio = true;
    
    if (collisio) {
        // Comprovar on ha col·lisionat: dalt, dreta, baix, esquerra
        var centreR = {
            x: totxo.x + (totxo.w/2),
            y: totxo.y + (totxo.h/2)
        }
        
        if (this.x > totxo.x && this.x < (totxo.x + totxo.w)){
            // la pilota és a dalt o a baix
            if (this.y > centreR.y) {
                this.y = totxo.y + totxo.h + this.h;
                return baix;
            } else {
                this.y = totxo.y - this.h;
                return dalt;
            }
        } else {
             // la pilota és a la dreta o la esquerra
            if (this.x > centreR.x) {
                this.x = totxo.x + totxo.w + this.w;
                return dreta;
            }else {
                this.x = totxo.x - this.w;
                return esquerra;
            }
        }
        return noCollisio;
    }
        
    
       
    
}


/*******************************************************
 *
 *          Classe Totxo
 *  
 *******************************************************/
function Totxo(x,y,w,h,mx,my,color) {
    CanvasElement.call(this,x,y,w,h,mx,my);
    this.color = color;
}

Totxo.prototype = Object.create(CanvasElement.prototype);
Totxo.prototype.constructor = Totxo;

Totxo.prototype.pintar = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.w,this.h);
}


/*******************************************************
 *
 *          Classe Joc
 *  
 *******************************************************/


function Joc() {
    /*
     * La classe Joc és la que contè el canvas,
     * les pilotetes i la que s'encarrega d'animar
     * les pilotes.
     * */
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.pilotes = [];
    this.totxo = new Totxo(this.canvas.width/6,this.canvas.height/3,this.canvas.width/1.5,this.canvas.height/14,this.canvas.width,this.canvas.height,'#FF6C00');
    var that = this;
    this.animar = function () {
        that.pintar();
        window.requestAnimationFrame(that.animar);
    }
}

Joc.prototype.pintar = function() {
    var that=this;
    this.ctx.fillStyle ='#000';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.totxo.pintar(that.ctx);
    this.pilotes.forEach(function(p) {
        // Hem de fer servir una referència al objecte Joc
        // dintre del ForEach this és igual al objecte pilota
        p.pintar(that.ctx);
        p.moure(that.totxo);
    })
}

Joc.prototype.crearPilotes = function() {
    /*
     * Creem pilotetes de diferents 
     * colors, velocitats i angle de partida
     * super-mega-divertit!!!!!!
     * */
    var aleatori;
    var colors = ['#801515','#5B0F4D','#FF6C00','#FFBB00','#70ED00','#1157C5','#CD00AD','#FD0006','#93F200','#00C973'];
    
    for (var i = 0 ; i < 100; i++) {
        aleatori = Math.random() * 10;
        this.pilotes.push(new Pilota(this.canvas.width/2,
                                     this.canvas.height/2,
                                     15,
                                     Math.PI/3 * aleatori,
                                     window.innerWidth,
                                     window.innerHeight,
                                     Math.PI * aleatori,
                                     colors[Math.round(aleatori)]
                                        ));
        console.log(aleatori+ ' ' + Math.round(aleatori));
    }
}

/*******************************************************
 *
 *          Creem un objecte joc
 *  
 *******************************************************/


var joc = new Joc();
joc.crearPilotes();
joc.animar();