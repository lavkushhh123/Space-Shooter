    const canvas = document.getElementById("gameCanvas")

    const ctx = canvas.getContext("2d")

    canvas.width = 800;
    canvas.height = 600;

// player image
    const playerImage = new Image ();
    playerImage.src  = "assets/player.png"

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
    document.addEventListener("keydown" , function(event){

            if(event.key === "ArrowLeft"){
                event.preventDefault();
                player.x -= 10;
            }
            if(event.key === "ArrowRight"){
                event.preventDefault();
                player.x += 10;
            }
    });


        // game loop 
    function gameLoop(){

        ctx.clearRect(0,0,canvas.width , canvas.height);

        ctx.drawImage(
            playerImage,
            player.x,
            player.y,
            player.width,
            player.height
        )

        requestAnimationFrame(gameLoop);
    }

    // start game
    gameLoop();