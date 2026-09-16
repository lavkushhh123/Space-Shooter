    const canvas = document.getElementById("gameCanvas")

    const ctx = canvas.getContext("2d")

    canvas.width = 500;
    canvas.height = 650;

// player image
    const playerImage = new Image ();           // player ke liye ek img object banata hai
    playerImage.src  = "assets/player.png"

    const enemyImage = new Image ();
    enemyImage.src = "assets/enemy.png"    // browser ko btata hai enemy ki img assets folder me enemy.png me hai

    const bulletImage = new Image();    // bullet ki image
    bulletImage.src = "assets/bullet.png";

    const shootSound = new Audio("assets/shoot.wav");    // shoot sound lagaane ke liye

    const hitSound = new Audio("assets/hit.wav");       // hit sound lagaane ke liye

    // const explosionImage = new Image();
    // explosionImage.src = "assets/explosion.png";
    // const background = new Image();
    // background.src = "assets/back.png";

    //player

    const player = {
        x : 375,
        y : 500 ,
        width : 80,
        height : 90,
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


            const keys = {};               // store which button is pressed

            document.getElementById("leftBtn").addEventListener("touchStart", function(){                       // jab phone par left button ko touch kro to e f(c)
                keys["ArrowLeft"] = true ;
            })


            document.getElementById("leftBtn").addEventListener("touchend", function(){                         // ka mtlb finger button se ht diya hai
                keys["ArrowLeft"] = false ;                                                                     // left button ab press nhi ho rha hai , isliye player left jaana band kr diya hai
            })


            document.getElementById("rightBtn").addEventListener("touchStart", function(){
                keys["ArrowLeft"] = true ;
            })

            
            document.getElementById("rightBtn").addEventListener("touchend", function(){
                keys["ArrowLeft"] = false ;
            })

            // phone par button touch krne par shoot hona chahiye

            document.getElementById("shootBtn").addEventListener("touchstart", function(){
              
                const bullet = {                                                                // new bullet object bnega
                      x : player.x + pllayer.width / 2 - 20.5 ,
                      width: 60 ,
                      height: 50  
                };

                bullets.push(bullet);                                               // bullet array me add hogi

                shootSound.currentTime = 0 ;
                shootSound.play();
            });


            document.addEventListener("keydown" , function(event){                  // jab ketboardki koi key press hui to e fx execute hoga

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

                keys[event.code] = true ;                // Isi wajah se move + shoot simultaneously possible hoga.

                if( event.code == "Space"){
                    event.preventDefault()                  // browser ka default action prevent krta hai
                }
            });

            document.addEventListener("keyup" , function(event){

                keys[event.code] = false ;      // Button chhodne par uski value false.

            });
        

            const bullets = [];     // for creating bullets
            const enemies = [];       // for creating enemies 
            // const explosion = [];   // for creating exlosion img, to load actual img of explosion
            
            let score = 0;                                            // game starrt me score 0 hai
            let lives = 3 ;                                              // lives dene ke liye
            let gameOver = false ;                                    // game over ho jaaye to game end ke liye
            let paused = false;                                      // game initially paused nhi hoga
            let highScore = localStorage.getItem("highScore") || 0 ;                     // browser se previous high score nikalta hai  . || 0 , first time game chal rha hai to high score ko zero bna dega
            let gameStarted = false ;                                    // starting me game start na ho

            // PHONE START BUTTON 

            document.getElementById("startBtn").addEventListener("touchstart", function(){

                if (!gameStarted){                                                      // it will check game isn't started yet
                    gameStarted = true ;
                    gameLoop();
                }

            });

        document.getElementById("restartBtn").addEventListener("touchstart", function() {
            score = 0;
            lives = 3;
            gameOver = false;
            paused = false;

            bullets = [];
            enemies = [];

            player.x = 375;
            player.y = 500;

            gameStarted = true;
            gameLoop();
        });


        document.getElementById("leftBtn").addEventListener("touchstart", function() {
                keys["ArrowLeft"] = true;
            });

        document.getElementById("leftBtn").addEventListener("touchend", function() {
                keys["ArrowLeft"] = false;
            });

        document.getElementById("rightBtn").addEventListener("touchstart", function() {
                keys["ArrowRight"] = true;
            });

       document.getElementById("rightBtn").addEventListener("touchend", function() {
                keys["ArrowRight"] = false;
            });

         document.getElementById("shootBtn").addEventListener("touchstart", function() {
                if (gameStarted && !gameOver) {
                    bullets.push({
                        x: player.x + player.width / 2 - 10,
                        y: player.y,
                        width: 20,
                        height: 30,
                        speed: 8
                    });

                        shootSound.currentTime = 0;
                        shootSound.play();
                }
            });


            // KEYBOARD FUNCTIONING BUTTONS
        document.addEventListener("keydown", function(event) {

            if(event.code === "KeyR" && gameOver ){       // press r to resume 

                score = 0;
                lives = 3;
                level = 1;

                enemies.length = 0;                  // isse arr empty ho jaate h. means all exhisting enemies and bullets removed
                bullets.length = 0;

                player.x = 375 ;
                player.y = 500 ;

                gameOver = false;

                gameLoop();
            }

            if(event.code === "Enter" && !gameStarted ){        // press enter key working to start game

                gameStarted = true;
                gameLoop()
            }

            if(event.code === "KeyP" && !gameOver){
                paused = !paused;                               // false and true = Pause
                                                                // true and false = Resume
                if(!paused)                                     // jab dobara key pree krogo paused = true , p press / paused = false / gameloop start again
                    gameLoop();
            }

            keys[event.code] = true ;


            if(event.code === "Space") {
                event.preventDefault();

                const bullet = {
                    x: player.x + player.width / 2 - 20.5,       // isase bullet player ki center se niklegi
                    y: player.y,
                    width: 60,
                    height: 50
                };

                bullets.push(bullet);                   // array  ke end me new bullets add krta hai

                shootSound.currentTime = 0;              // sound ko beginning me reset karta hai
                shootSound.play();                       // for space dabaane par turan sound aayen
            }

        });
        
        // for creating enemy , enemy object
        function createEnemy(){

            const enemy = {
                x : Math.random()* (canvas.width - 50),                // enemy random position se enter krenge
                y : -60,
                width : 100,
                height: 60,
                speed : Math.random()* 5 + 2
            };
            enemies.push(enemy)           // arr ke  end me new eenmy  add krega
        }

        // for player update function , player ki position

        function updatePlayer(){       // player ki position decide krta hai

            if (keys ["ArrowLeft"]){
                player.x -= 10;                    // for smooth movement , jab tk key pree h movement hoti rhegi
            }

            if(keys["ArrowRight"]){
                player.x += 10;
            }

            if(keys["ArrowUp"]){
                player.y -= 10;
            }

            if(keys["ArrowDown"]){
                player.y += 10;
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

        if(!gameStarted){

            ctx.clearRect(0,0, canvas.width , canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "40px Arial";
            ctx.fillText("SPACE SHOOTER" , 100 , 280);

            ctx.font = "20px Arial";
            ctx.fillText("Press Enter to Start", 150 , 320);

            return;
        }

        
        if(gameOver){               // existing game over ho jaye
            ctx.clearRect(0,0, canvas.width , canvas.height)  // Game Over hone par purana game screen clear karega.

            ctx.fillStyle = "red";
            ctx.font = "40px Arial";
            ctx.fillText("GAME OVER ", 140 ,280);

            ctx.font = "20px Arial";
            ctx.fillText("Press R to Restart" , 155 ,320);

            return ;
        }

        if(paused){                   // if paused === true , to game loop yhi par rook jaayega . so player , enemy , bullet , score nhi chlega , 
            ctx.fillStyle = "Green";
            ctx.font = "40px Arial";
            ctx.fillText("PAUSED" , 175 ,280);

            ctx.font = "20px Arial";
            ctx.fillText("Press P to Resume", 160 , 320);
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

        for(let i = bullets.length - 1 ; i >= 0 ; i--){                 // i = bullets.length - 1

            bullets[i].y -=  8;             // to fire bullets on upward dire //se reverse direction me chala rahe hain. Ye deletion ke liye safer hai.
            ctx.drawImage(
                bulletImage,
                bullets[i].x,
                bullets[i].y,
                bullets[i].width,
                bullets[i].height,
            );
            // bullet canvas ke bahar chali gyi aur usko hta do
            if(bullets[i].y + bullets[i].height < 0){
                bullets.splice(i,1);                 // agar bullets screen se bahr hai to arr se remove kro
            }

        }

        // for drawing enemies (loop)
        for ( let i = 0 ; i < enemies.length ; i++){

            enemies[i].y += enemies[i].speed ;                      // this updates the enemy's vertical position every frame, so the enemy moves downward."

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
            else{

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
        }

         // har bullet ko check karega

        for( let i = bullets.length - 1 ; i >= 0 ; i --){
            
           // har bullet ko har enemy ke sath check krega
            for( let j = enemies.length - 1 ; j >= 0 ; j--){

                // actual collision ddetection, check whether bullets and enemy touching each other
                if(
                    bullets[i].x < enemies[j].x + enemies[j].width &&           // bullet ka left side ennemy ke right side se phle hai
                    bullets[i].x + bullets[i].width > enemies[j].x &&          // bullet ka right side enemy ke left side ke bdd hai
                    bullets[i].y < enemies[j].y + enemies[j].height &&         // bullet ka bottom enemy ke top se neeche hai
                    bullets[i].y + bullets[i].height > enemies[j].y           // Bullet ka bottom enemy ke top se neeche gaya ya nahi. , charo true hone pr collision hoga 

                )
                 {
                    
                    bullets.splice( i , 1);  // to remove bullets 
                    score += 10 ;           // give score after enemy destroy

                    hitSound.currentTime = 0 ;  // jab bullet enemy ko hit krega to hit.wav bjega
                    hitSound.play() ;

                    if(score > highScore){
                        highScore = score;

                        localStorage.setItem("highScore",highScore);
                    }

                    enemies.splice( j ,1);            // to remove enemy if hitted, removing element fron array


                    break;    // ek bulleta ek enemy ko hit kr diya to usko aur enemy ki jrurat nhi
                }
            }
        }

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText ("Score :" + score , 20 ,30)    // Canvas par text likhta hai., ctx.fillText / "Score :" +score , 20 , 30);score ki current value screen pr dikhaaye ga 

        ctx.fillText("High Score : "  + highScore, 20,80);

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

            }, 1000 );

    // start game
    gameLoop();
    
