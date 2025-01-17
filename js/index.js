window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {

    
    const roadImg = new Image();
    roadImg.src = './images/road.png';

    const carImg = new Image();
    carImg.src = './images/car.png';

    let roadX = 0;
    let roadY = 0;

    let carX = 225;
    let carY = 450;
    
    const theCanvas = document.getElementById('canvas');
    const ctx = theCanvas.getContext('2d');

    ctx.drawImage(roadImg, roadX, roadY, 500, 700);
    ctx.drawImage(carImg, carX, carY, 50, 100);



    class Obstacles {
      constructor (width, height, color, y, ctx) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = Math.floor(Math.random() * theCanvas.width + 1);
      this.y = y;
      this.ctx = ctx;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }


  
  const myObstacles = [];


  let crashed = false;

  let crash = () => {
    crashed = true
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 500, 700);
    ctx.fillStyle = "red";
    ctx.font = "50px sans-serif";
    ctx.fillText("GAME OVER", 100, 100);
    
  }





    
    let frame = 1;
    
    function update() {
      frame += 1;
      if (frame % 50 == 0) {
        myObstacles.push(new Obstacles(50, 10, 'black', 0, ctx));
     
      }

      


      ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
      ctx.drawImage(roadImg, roadX, roadY, 500, 700);
      ctx.drawImage(carImg, carX, carY, 50, 100);
      
      let counter = 0;
      for (let i = 0; i < myObstacles.length; i++){
        
       

      
        if (myObstacles[i].y > 700) {
          
          counter = counter + 1;
        
          ctx.clearRect(0, 0, 50, 50);
          ctx.strokeText(`Points ${counter}`, 5, 20);
        }
      


    



          if (
            carY == myObstacles[i].y + 10 &&
            carX + 50 >= myObstacles[i].x &&
            carX <= myObstacles[i].x + 50
          ) {

            crash()

          }

         




       
if (!crashed){
        
  myObstacles[i].draw();
  myObstacles[i].y++;
}





      }

      
      if (!crashed) {

        requestAnimationFrame(update);
      }
     

    }

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          carX -= 10;
          if (carX < 0) {
            carX = 0;
          }
          console.log('move left');
          break;
        case 'ArrowRight':
          carX += 10;
          if (carX + 50 > theCanvas.width) {
            carX = 450;
          }
    
          break;
      }
    });
    update(); 
    
  };
  
};

