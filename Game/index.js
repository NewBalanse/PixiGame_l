let character,
    charTexture,
    Char,
    app,
    keyMove,
    banana = [],
    bg;
let count = 0;

function init() {
    app = Scene
        .getInstance()
        .createGameScene();

    document.body.appendChild(app.view);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    keyMove = "Idle";

    InitSceneAssets();
    InitCharacter();

    gameLoop();

}

function onKeyUp(e) {
    keyMove = "Idle";
}

function onKeyDown(e) {

    //right
    if (e.keyCode === 68 || e.keyCode === 39) {
        keyMove = "Right"
    }
    //left
    if (e.keyCode === 65 || e.keyCode === 37) {
        keyMove = "Left";
    }
    //attack
    if (e.keyCode === 32) {
        keyMove = "Attack";
    }
}

function InitCharacter() {
    charTexture = Char.animatedIdle[0];

    character = new PIXI.Sprite(charTexture);
    character.x = 1;
    character.y = window.innerHeight / 1.9;
    character.scale.set(0.5);

    app.stage.addChild(character);
}

function InitSceneAssets() {

    bg = BackGround
        .getInstance()
        .createBackGround(app.stage, app);
    Char = BananaChar
        ._getInstance()
        .createChar();

    for (let i = 0; i < 5; i++) {
        banana.push(BananaUnhero
            .getInstance()
            .createUnhero(app));
    }
}

function gameLoop() {
    let gameAnimation = requestAnimationFrame(gameLoop);


    let colision = BananaChar
        ._getInstance()
        ._isDeath(character, banana[count]);

    if (colision === 'Dead') {
        console.log(colision);
        //app.stage.removeChild(character);
        app.stage.removeChild(banana);

        let text = Scene.getInstance().createTextGameOver();
        app.stage.addChild(text);
    }
    else {

        for (let i = 0; i < banana.length; i++) {
            banana[i] = BananaUnhero
                .getInstance()
                .update(banana[i], app,
                    i + 2);

            banana[i] = BananaUnhero
                .getInstance()
                .isWindow(banana[i]);
        }

        character = BananaChar
            ._getInstance()
            .updateanimation(Char, app, keyMove, character, banana[count]);


        if (count === 4) {
            count = 0;
        } else {
            count++;
        }
        console.log(count);
    }


}