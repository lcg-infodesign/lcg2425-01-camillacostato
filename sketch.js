function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background("#d0cdc5");
  noFill();
  blendMode(DARKEST);
  //per ricreare l'effetto dell'opera originale credo che questo blendMode sia il più adatto poichè nel disegno a pennarellino i colori più scuri tendono a emergere e "coprire" quelli più chiari | talvolta però, soprattutto con i colori più chiari, al passaggio di uno sopra l'altro c'è una piccola variazione di colore dovuta al blend dei due inchiostri: questo effetto è stato ricreato con una lieve trasparenza dei colori
  
  //definisco il numero di righe e colonne basandomi sull'opera originale 
  let columns = 9; 
  let rows = 6;
  
  //calcolo le dimensioni della griglia di quad rispetto alla tela seguendo l'opera originale in cui la griglia occupa 80% della larghezza e il 60% dell'altezza
  let gridwidth = 0.8 * width;  //80%
  let gridheight = 0.6 * height; //60%
  
  //calcolo il lato dei quad
  //la dimensione del lato dipende dallo spazio disponibile in orizzontale (larghezza griglia/numero di colonne) e dallo spazio disponibile in verticale (altezza griglia/ numero di righe) 
  //per fare in modo che le forme si adattino alle dimensioni e proporzioni dello schermo, qualsiasi esse siano, prendo in considerazione il valore più piccolo (min) tra lo spazio disponibile in orizzontale e in verticale
  //il valore minimo viene calcolato facendo larghezza della griglia / numero di colonne per la direzione orizzontale | altezza della griglia / numero di righe per la direzione verticale
  //in caso di schermi "larghi e bassi" il valore minimo da prendere come riferimento è quello dell'altezza per cui il lato viene calcolato in base a questo e la griglia occuperà il 60% in altezza anche se non raggiungerà 80% della larghezza dello schermo
  //al contrario per schermi "stretti e alti" il valore minimo da prendere come riferimento è quello della larghezza per cui il lato viene calcolato in base a questo e la griglia occuperà 80% in larghezza anche se non raggiungerà il 60% della altezza dello schermo
  //così facendo il lato viene calcolato solamente in base ad una delle due direzioni garantendo che si tratti di "quadrati" anche se poi non perfettamente regolari (forma randomizzata successivamente per somiglianza con l'opera originale)
  //in questo modo si rispetta la forma geometrica delle figure, la proprorzione della griglia, e uno dei due margini originali in base alle proporzioni dello schermo --> la griglia si adatta a dimensione e mantiene proporzione

  let side = min(gridwidth / columns, gridheight / rows);
  
  //per creare una griglia devo usare cicli for annidati 
  //innanzitutto faccio ciclo per righe e ciclo per le colonne(variabile r che è equivalente a y: per r=0 ossia la prima riga, esegue c=0, c=1, c=2... (dove c corrisponde a x) disegnando le colonne fino alla fine dettata da c<colums) 
  //aggiungo un terzo ciclo per ripetere i singoli quad un numero definito di volte
  //aggiungo un quarto ciclo for per ricreare le piccole macchie di inchiostro sui vertici dei quad dovute al disegno a pennarellino (per somiglianza con l'opera originale disegnata a mano)
    
  //1. rows 
  for (let r = 0; r < rows; r++) {

    //ciclo per le colonne inserito all'interno del primo ciclo for (per le righe)
    //2. colums
    for (let c = 0; c < columns; c++) {

      //in base alla posizione orizzontale del quad (quindi in base alla colonna) vorrei che questo venga ripetuto un numero di volte ben definito così da assomigliare al quadro originale
      //metto un terzo ciclo for per ripetere ogni elemento della griglia (iter: per r=0 (prima riga) --> disegna c=0 il numero di volte che voglio, per c=1 il numero di volte che voglio, per c=2 il numero di volte che voglio, per c=3 il numero di volte che voglio e così via fino a c=8 che corrisponde alla nona e ultima colonna, poi passa a r=1 (seconda riga) --> idem, fino a r=5 che è la sesta e ultima riga) 
      //siccome il numero di iterazioni per posizione (posiz: combinazione di x-y o c-r) è vario creo una array per specificare il numero di iterazioni che voglio ottenere per ricreare l'opera originale
      //guida p5: array: a list that keeps several pieces of data in order. Each piece of data in an array is called an element. Each element has an address, or index, within its array. 
      //nella array metto il numero di quad sovrapposti per ogni colonna (ossia numero di iterazioni che il ciclo deve fare tenendo conto della posizione orizzontale/colonna)
      //conto il numero di quad "sovrapposti" per ogni colonna e lo inserisco come valore nell'array

      let quadnumber = [1, 2, 4, 7, 15, 27, 8, 2, 1];

      //terzo ciclo for serve per ripetere all'interno di una riga per ogni posizione orizzontale (colonna) tot quad "sovrapposti"
      //siccome questo ciclo è inserito all'interno del "ciclo colonne" (e ancora prima nel "ciclo righe") metto come condizione che i, ossia la variabile di questo ciclo, sia minore di array[c] ossia del valore nella array che occupa la posizione c in ogni momento/in ogni ciclo (dipende sempre dal valore di c = dalla colonna in cui mi trovo) --> se sono in colonna c=0 (prima colonna) vuol dire che nel terzo ciclo for avrò i<1 che è il valore in posiz 0 nell'array = disegna 1 quad, per c=1 avrò i<2 = disegna 2 quad, per c=2 avrò i<4 = disegna 4 quad, c=3 avrò i<7 = disegna 7 quad e così via 

      //funzionamento dei primi tre cicli for: entra in prima riga (r=0) --> entra in prima colonna --> terzo loop per iterare quad --> terzo ciclo si chiude quando non è più vera la condiz. i<... --> entra in seconda colonna --> stessa cosa --> arriva all'ultima colonna --> esce dal "ciclo colonna" grazie a condizione c<colums --> entra seconda riga (r=1) --> stessa cosa di prima --> tutto finisce quando non è più rispettata la condizione r<rows 
      //(spiegazione di tutti e quattro i cicli sotto!!)
      
      //creo array per i colori            
      //guida p5: array --> we can store colors we want to use in a data stucture known as an array and choose from those colors randomly
      //creo l'array colors con i colori che voglio usare per disegnare i quad
          
      let colors = ['#472B22D8', '#BE5F2BD1', '#060A27C6'];
      
      //colori randomici: per randomizzarli uso: random (nome array)   
      //creo la variabile color per salvare il colore randomico scelto ad ogni iterazione del secondo ciclo for (colonne) (salvo il colore nella variabile perchè servirà nel quarto ciclo | vedi sotto) -
      let color = random(colors);
      stroke(color); 
      //creo qui la variabile color perché voglio che venga scelto un colore random per ogni colonna in cui ci troviamo e non per ogni iterazione effettuata: se inserissi il codice nel terzo ciclo for quad sovrapposti avrebbero colori differenti e non rispetterebbe l'opera originale

      //3. iteration quad
      for (let i = 0; i < quadnumber[c]; i++) { 
          
          //non voglio che le figure siano attaccate al bordo sx e superiore per cui definisco due valori x0 e y0 da usare per disegnare le forme

          //larghezza - (colonne*lato)/2 mi permette di posizionare x0 in modo da avere un bordo equo a sx e dx
          let x0 = (width - (columns * side)) / 2;
          //altezza - (righe*lato)/2 mi permette di posizionare y0 in modo da avere un bordo equo sopra e sotto
          let y0 = (height - (rows * side)) / 2;

          //stroke: gli do un valore relativo rispetto al lato in modo che si adatti a schermi più piccoli/grandi senza essere sproporzionato rispetto alla grandezza della tela (siccome anche il lato è proporzionato a sua volta alla dimensione dello schermo)
          //per somiglianza con l'opera originale gli do un valore dell'1.5% (=0.015) del lato del quad

          let strokevalue = 0.015 * side;
          strokeWeight(strokevalue);  
          
          //definisco delle varibili per disegnare quadrilateri irregolari
          //dalla guida: quad --> Draws a quadrilateral (four-sided shape) 
          //creo delle variabili per i quattro punti

          //x1 = x sinistra data da x0 (margine) + posizione colonna * lato, così il primo quad ad es. avrà x1 = x0 + 0*lato --> parte dall'inizio
          let x1 = x0 + c * side
          //x2 = x destra data da x0 (margine) + posizione colonna * lato, così il primo quad ad es. avrà x2 = x0 + (0+1)* lato --> x0 + lato: ottengo l'estremo dx del primo quad a cui si arriva "percorrendo" side del quad in orizzontale
          let x2 = x0 + (c+1) * side
          //y1 = y sopra data da y0 (margine) + posizione riga * lato, così il primo quad ad es. avrà y1 = y0 + 0*lato --> parte dall'alto
          let y1 = y0 + r * side
          //y2 = y sotto data da y0 (margine) + posizione colonna * lato, così il primo quad ad es. avrà y2 = y0 + (0+1)* lato --> y0 + lato: ottengo l'estremo sotto del primo quad a cui si arriva "percorrendo" side del quad in verticale
          let y2 = y0 + (r+1) * side
          
          //randomizzazione del lato per somiglianza con l'opera originali: dimensione relativa sempre per questione di adattabilità a schermi più piccoli /grandi --> impongo che la randomizzazione della posizione dei vertici sia del tot % del lato del quad 
          //uso random --> guida p5: The version of random() with two parameters returns a random number from a given range.   
          //randomizzazione su asse verticale (posizione delle x)
          let randvaluex = 0.25 * side;
          //randomizzazione della posizione y dei due vertici in basso
          let randvalueydown = 0.17 * side
          //randomizzazione della posizione y dei due vertici in altro che questa volta deve essere uguale per entrambi (a differenza di quelli in basso) per ricreare l'opera originale in cui il lato sopra dei quad è sempre perfettamente orizzonrale
          let randvalueyup = random(-(0.36 * side), 0.36 * side); //un solo valore randomico così saranno allineati

          //creo array per le coordinate dei punti     
          //definisco una nuova array coord: si tratta di una array bidimensionale ossia una array che contiene a sua volta all'interno due o più array --> nel mio caso nella array coord ci sono 4 array "figlie" che contengono i valori delle cordinate x e y dei 4 spigoli dei quad --> in array ci sono 4 [0,1,2,3] array che contengono a loro volta due valori: x e y[0,1]

          let coord = [
            //vertice alto a sx
            [random(x1 - randvaluex, x1 + randvaluex),   y1+randvalueyup],
            //vertice alto a dx
            [random(x2 - randvaluex, x2 + randvaluex), y1 + randvalueyup],
            //vertice basso dx
            [random(x2 - randvaluex, x2 + randvaluex), random(y2 - randvalueydown, y2 + randvalueydown)],
            //vertice basso sx
            [random(x1 - randvaluex, x1 + randvaluex), random(y2 - randvalueydown, y2 + randvalueydown)]
          ];
          
          //disegno quad utilizzando le coordinate inserite nella array coord
          //quando uso una array bidimensionale non basta più un indice solo ma me ne servono due per chiamare un valore contenuto in una array "figlia" (a sua volta contenuta in un array "madre") --> primo index = index della array "figlia" contenuta nella array "madre" | secondo index = posizione del valore desiderato all'interno della array "figlia"
          quad(
          //inserisco le coordinate dei vertici andando in senso orario
          //es. primo punto: x = valore in posizione 0 della array in posizione 0 (= random(x1 - randvalue, x1 +  randvalue)) | y = valore in posizione 1 della array in posizione 0 (= random(y1 - randvalue, y1 + randvalue)) 
          //così anche per gli altri tre punti
          coord[0][0], coord[0][1], 
          coord[1][0], coord[1][1], 
          coord[2][0], coord[2][1], 
          coord[3][0], coord[3][1]
          );

              //quarto ciclo for aggiunto per ricreare le macchie di inchiostro sui vertici dei quad dovute al disegno con inchiostrio nell'opera originale

              //4.circle = ink drops
              //questo ciclo for mi serve per disegnare con tot probabilità dei piccoli cerchietti sui vertici dei quad che simulino le macchie di inchiostro presenti nell'opera originale su i punti di incontro dei lati --> il disegno a pennarellino dell'opera originale presenta queste "imperfezioni" nel tratto che vorrei ricreare in questo modo

              //ciclo for con variabile p e metto come condizione che p sia < di coord.length: il ciclo for continua ad iterare finché p rimane minore di 4 ossia la condizione è verificata/vera ( 4 = lunghezza dell'array coord --> ci sono quattro coppie di coordinate, una per ogni vertice del quad) = itera finché p assume i valori 0, 1, 2, 3 ossia i 4 index che mi servono per accedere ai vertici del quadrato inseriti in array nella array bidimensionale coord

              for (let p = 0; p < coord.length; p++) {  
              
              //creo variabile in cui salvo il valore contenuto nella array coord in posizione p: (procedimento simile a quello che ho usato nelle condizioni del terzo ciclo for) in base al valore di p in ogni iterazione viene salvata nella variabile inkdrop la array [x,y] del vertice in questione (index singolo e non doppio perché non sto chiamando un valore ma una array "figlia" che contiene due valori: x e y = coordinate punto)
              //es. per p = 0 inkdrop = coord[0] <-- questa array "figlia", che è in posizione 0 all'interno della array coord, contiene le coordinate del vertice in alto a sx | ad ogni iterazione di questo quarto ciclo for p aumenta, in inkrop viene salvata una array "figlia" in posizione progressivamente maggiore ossia le coordinate di uno dei quattro vertici del quad
              let inkdrop = coord[p];  

              //queste "imprecisioni" grafiche non sono presenti in tutti i quad ma solamente in alcuni, per cui per disegnare i cerchi che simulino le macchie di inchiostro uso una condizione (if)
              //per creare la condizione del ciclo if uso random senza inserire valori --> guida p5: The version of random() with no parameters returns a random number from 0 up to but not including 1.
              //basandomi sull'opera originale vorrei una probabilità di 8% (= 0.8) perchè la condizione sia vera = venga eseguito il codice che disegna un cerchio sul vertice su cui si trova il quarto ciclo for attualmente
              //funzionamento del quarto ciclo: si parte da p=0 per cui inkdrop=coord[0] ossia le coordinate del primo vertice (alto sx), random genera un numero casuale tra 0 e 1, se il numero è < di 0.08 (del 8%) disegna il cerchio altrimenti (condiz falsa) non disegna, poi si passa a p=1 e si ripete la stessa logica fino a p=3 (quarto e ultimo punto)

              if (random() < 0.08) {  
              //se la condizione è soddisfatta viene usato il colore del quad in questione che prima ho salvato nella variabile color cosicchè il cerchio abbia lo stesso colore del suo quad (vedi sopra)
               
              //siccome vorrei modificare il blendMode solo per le macchie di inchiostro uso push e pop per delimitare questo cambio di stile senza modificare il blendMode scelto per il disegno dei quad (scelta stilistica per rendere più realistiche e simili all'originale le macchie di inchiostro)
              push();
              blendMode(MULTIPLY); 
              stroke(color);  
              fill (color);
              //circle prevede come valori: x y e diametro
              //come x metto inkdrop[0]: inkdrop è la variabile che ho creato prima in cui viene salvata la array "figlia" contenente la x e la y di ogni vertice in base a valore di p (che aumenta ad ogni iterazione) | della variabile inkdrop (ossia della coppia di coordinate) ora mi interessa solo il valore in posizione 0 (ossia il primo) che è la x di quel punto (coppia di coordinate) per cui scrivo inkdrop[0] 
              //allo stesso modo per la y del cerchio metterò inkdrop[1] perché mi interessa il secondo valore (posiz 1) della coppia di coordinate, ossia la y
              //inoltre vorrei che anche i punti (come lo stroke dei quad) si adattassero a schemri più grandi o più piccoli per cui impongo che siano sempre di diametro pari allo stroke dei quad, qualsiasi esso sia    
              circle(inkdrop[0], inkdrop[1], strokevalue);  
              pop();
              }
          }   
      }
      //funzionamento di tutti i cicli for (spiegazione di prima con aggiunta del quarto ciclo for) per un esempio più completo ed esplicativo uso la seconda colonna c=1 che prevede due iterazioni:
      //entra nel primo ciclo for: entra nella prima riga (r=0) —> entra in prima colonna (… passo direttamente alla seconda per capire meglio tanto il procedimento è lo stesso) —> entra nel secondo ciclo for: entra nella seconda colonna (c=1) —> nella array che ho creato, per c=1, quindi in posizione 1 c'è il valore 2 per cui il terzo ciclo for  eseguirà due iterazioni = disegno di due quad —> si entra nel terzo ciclo for che parte da i=0 e disegna il primo quad —> entra nel quarto ciclo for con p che parte da 0 e itera su i quattro vertici dei quad grazie all’array e alle variabili che ho creato (per i = 0,1,2,3 sono associate le quattro coppie di xy dei vertici) —> per p=0 viene verificata la condizione dell’if —> se vera disegna cerchio sennò no —> per p= 1 stessa cosa fino a p=3 —> quando p=4 la condizione non è più rispettata per cui si chiude il quarto ciclo for —> si torna al terzo ciclo for (quello delle iterazioni) ora i = 1 (nella seconda colonna i<2 secondo l’array che ho creato) per cui condizione di i ancora vera —> si disegna il secondo quad —> si entra di nuovo nel quarto ciclo for e si ripete l’iter che ho scritto prima —> si esce di nuovo dal quarto ciclo —> nel terzo ciclo ora i=2 che non rispetta la condizione —> si esce anche dal terzo ciclo delle iterazioni —> si torna al secondo ciclo for (delle colonne) ora c=2 perchè siamo nella terza colonna —> stesso procedimento di disegno quad + cerchi con la stessa logica —> così per tutte le colonne finché non è più rispettata la condizione c<colums e si chiude il secondo ciclo for —> si torna al primo ciclo for: entra nella seconda riga (r=1) --> stessa cosa di prima per tutte le colonne —> tutto finisce quando non è più rispettata nemmeno la condizione r<rows e si chiude anche il primo ciclo for (delle righe)
    }
  }
}
