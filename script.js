    const canvas = document.getElementById("gameCanvas")

    const ctx = canvas.getContext("2d")

    canvas.width = 500;
    canvas.height = 600;

// player image
    const playerImage = new Image ();           // player ke liye ek img object banata hai
    playerImage.src  = "assets/player.png"

    const enemyImage = new Image ();
    enemyImage.src = "assets/enemy.png"    // browser ko btata hai enemy ki img assets folder me enemy.png me hai

    const bulletImage = new Image();    // bullet ki image
    bulletImage.src = "assets/bullet.png";

    //player

    const player = {
        x : 375,
        y : 500 ,
        width : 50,
        height : 60,
    } ;

    playerImage.onload = function(){
        ctx.drawImage (
            playerImage,
            player.x ,
            player.y ,
            player.width,
            player.height  
        );
    };

        // keyboard movement


            const keys = {};   // storee which button is pressed
            document.addEventListener("keydown" , function(event){

                if(event.code === "KeyR" && gameOver){

                    score = 0;   // restart pe scire 0 dega  
                    lives = 3 ;     // lives 3 dega 

                    enemies.length = 0;  // canvas pr jo enemy hain sab clear
                    bullets.length = 0;  // purani bullets sab clear

                    player.x = 375 ;    // player starting position par 
                    player.y = 500 ;

                    gameOver = false ;

                    gameLoop();    // game loop dobara start
                }

                keys[event.code] =true ;   // Isi wajah se move + shoot simultaneously possible hoga.

                if( event.code == "Space"){
                    event.preventDefault()
                }
            });

            document.addEventListener("keyup" , function(event){

                keys[event.code] = false ;      // Button chhodne par uski value false.

            });
        

            const bullets = [];     // for creating bullets
            const enemies = [];       // for creating enemies 
            
            let score = 0;  // game starrt me score 0 hai
            let lives = 3 ;  // lives dene ke liye
            let gameOver = false ; 

        document.addEventListener("keydown", function(event) {

            if(event.code === "Space") {
                event.preventDefault();

                const bullet = {
                    x: player.x + player.width / 2 - 5,
                    y: player.y,
                    width: 10,
                    height: 20
                };

                bullets.push(bullet);
            }

        });
        
        // for creating enemy 
        function createEnemy(){

            const enemy = {
                x : Math.random()* (canvas.width - 50),
                y : -60,
                width : 50,
                height: 50,
                speed : 3
            };
            enemies.push(enemy)
        }

        // for player update function , player ki position

        function updatePlayer(){

            if (keys ["ArrowLeft"]){
                player.x -= 5;
            }

            if(keys["ArrowRight"]){
                player.x += 5;
            }

            if(keys["ArrowUp"]){
                player.y -= 5;
            }

            if(keys["ArrowDown"]){
                player.y += 5;
            }

            // LEFT BOUNDRY
             if(player.x < 0){
                player.x  = 0;
             }

             // right boundry 
             if(player.x + player.width > canvas.width){
                player.x = canvas.width - player.width;
             }

             // top boundry

             if(player.y < 0 ){
                player.y = 0 ;
             }

             //bootom boundry
             if(player.y + player.height > canvas.height){
                player.y = canvas.height - player.height;
             }
        }

        // game loop 
    function gameLoop(){

        if(gameOver){               // jab game over go jaye
            ctx.clearRect(0,0, canvas.width , canvas.height)  // Game Over hone par purana game screen clear karega.

            ctx.fillStyle = "white";
            ctx.font = "40px Arial";
            ctx.fillText("GAME OVER ", 140 ,280);

            ctx.font = "20px Arial";
            ctx.fillText("Press R to Restart" , 155 ,320);

            return ;
        }


        updatePlayer();

        ctx.clearRect(0, 0, canvas.width , canvas.height)

       // ctx.clearRect(0,0,canvas.width , canvas.height);

        ctx.drawImage(
            playerImage,
            player.x,
            player.y,
            player.width,
            player.height
           
        )

        for(let i =0 ; i <bullets.length ; i++){
            bullets[i].y -= 8;

            ctx.drawImage(
                bulletImage,
                bullets[i].x,
                bullets[i].y,
                bullets[i].width,
                bullets[i].height,
            );

        }

        // for drawing enemies
        for ( let i = 0 ; i < enemies.length ; i++){

            enemies[i].y += enemies[i].speed ;

            //ctx.fillStyle = "red" ;

            ctx.drawImage(
                enemyImage,
                enemies[i].x ,
                enemies[i].y ,
                enemies[i].width ,
                enemies[i].height,

            );

            if(enemies[i].y > canvas.height ){
                enemies.splice ( i,1);
                i-- ;
            }

            if(
                player.x < enemies[i].x + enemies[i].width &&
                
                player.x +  player.width > enemies[i].x &&

                player.y < enemies[i].y + enemies[i].height &&

                player.y +  player.height > enemies[i].y

            ){
                lives--;
                enemies.splice(i,1);
                i--;
            }

            if (lives <= 0){            // e geame over kerne ke liye hai
                gameOver = true ;        
            }
        }

         // har bullet ko check karega

        for( let i = bullets.length - 1 ; i >= 0 ; i --){
            
           // har bullet ko har enemy ke sath check krega
            for( let j = enemies.length - 1 ; j >= 0 ; j--){

                // actual collision ddetection, check whether bullets and enemy touching each other
                if(
                    bullets[i].x < enemies[j].x + enemies[j].width && 
                    bullets[i].x + bullets[i].width > enemies[j].x &&  // bullet ka right side enemy ke left side se gya ya nhi
                    bullets[i].y < enemies[j].y + enemies[j].height && 
                    bullets[i].y + bullets[i].height > enemies[j].y     // Bullet ka bottom enemy ke top se neeche gaya ya nahi.

                )
                 {
                    
                    bullets.splice( i , 1);  // to remove bullets 
                    score += 10 ;           // give score after enemy destroy
                    enemies.splice( j ,1);    // to remove enemy

                    break;    // ek bulleta ek enemy ko hit kr diya to usko aur enemy ki jrurat nhi
                }
            }
        }

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText ("Score :" + score , 20 ,30)    // Canvas par text likhta hai., ctx.fillText / "Score :" +score , 20 , 30);score ki current value screen pr dikhaaye ga 

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Lives: " + lives, 20, 55);


        requestAnimationFrame(gameLoop);
    }

    // for calling enemy
    createEnemy();

     setInterval(function(){

                if(enemies.length < 5)
                createEnemy();

            }, 1500 );

    // start game
    gameLoop();
    
