let _instanceBanana;
let exactImage = 0;

class BananaChar {
    static _getInstance() {
        if (!_instanceBanana) {
            _instanceBanana = new this();
        }
        return _instanceBanana;
    }

    createChar() {

        let animatedMove = [],
            animatedIdle = [],
            animatedAttack = [];

        let AnimationAttack2 = [
            'Game/GameScene/img/char/attack/a2/adventurer-attack1-00.png',
            'Game/GameScene/img/char/attack/a2/adventurer-attack1-01.png',
            'Game/GameScene/img/char/attack/a2/adventurer-attack1-02.png',
            'Game/GameScene/img/char/attack/a2/adventurer-attack1-03.png',
            'Game/GameScene/img/char/attack/a2/adventurer-attack1-04.png'
        ];

        for (let i = 0; i < 5; i++) {
            let teture = PIXI.Texture.fromImage(AnimationAttack2[i]);
            animatedAttack.push(teture);
        }
        let Move = [
            'Game/GameScene/img/char/move/adventurer-run-00.png',
            'Game/GameScene/img/char/move/adventurer-run-01.png',
            'Game/GameScene/img/char/move/adventurer-run-02.png',
            'Game/GameScene/img/char/move/adventurer-run-03.png',
            'Game/GameScene/img/char/move/adventurer-run-04.png',
            'Game/GameScene/img/char/move/adventurer-run-05.png'
        ];

        for (let i = 0; i < 6; i++) {
            let teture = PIXI.Texture.fromImage(Move[i]);
            animatedMove.push(teture);
        }

        let Idle = [
            'Game/GameScene/img/char/idle/adventurer-idle-00.png',
            'Game/GameScene/img/char/idle/adventurer-idle-01.png',
            'Game/GameScene/img/char/idle/adventurer-idle-02.png',
            'Game/GameScene/img/char/idle/adventurer-idle-03.png'
        ];

        for (let i = 0; i < 4; i++) {
            let teture = PIXI.Texture.fromImage(Idle[i]);
            animatedIdle.push(teture);
        }


        return {
            animatedMove,
            animatedIdle,
            animatedAttack
        };
    }


    attack(animation, maxFrame, app, renderTexture, deleteTexture, MobTexture) {

        this.deleted(deleteTexture, app);
        this.isCountImage(maxFrame, animation);

        renderTexture = this.rendererTexture(renderTexture, animation, app, renderTexture, false);

        let colision = this._isAttackBananaColision(renderTexture, MobTexture);
        BananaUnhero
            .getInstance()
            ._isDead(colision, MobTexture);

        return renderTexture;
    }

    moveRightChar(animation, maxFrame, app, renderTexture, deleteTexture) {
        this.deleted(deleteTexture, app);
        this.isCountImage(maxFrame, animation);

        renderTexture.x += 1;
        renderTexture = this.rendererTexture(renderTexture, animation, app, renderTexture, false);


        return renderTexture;

    }

    moveLeftChar(animation, maxFrame, app, renderTexture, deleteTexture) {
        this.deleted(deleteTexture, app);
        this.isCountImage(maxFrame, animation);

        renderTexture.x -= 1;
        renderTexture = this.rendererTexture(renderTexture, animation, app, renderTexture, true);

        return renderTexture;
    }

    idleAnimation(animation, maxFrame, app, renderTexture, deleteTexture) {
        this.deleted(deleteTexture, app);
        this.isCountImage(maxFrame, animation);

        renderTexture = this.rendererTexture(renderTexture, animation, app, renderTexture, false);

        return renderTexture;
    }


    updateanimation(Char, app, keyMove, character, MobTexture) {

        if (keyMove === 'Right') {

            character = this.moveRightChar(Char.animatedMove, 7, app, character, character);
        }

        if (keyMove === 'Left') {
            character = this.moveLeftChar(Char.animatedMove, 7, app, character, character);

        }

        if (keyMove === 'Attack') {
            character = this.attack(Char.animatedAttack, 6, app, character, character, MobTexture);
        }

        if (keyMove === 'Idle') {
            character = this.idleAnimation(Char.animatedIdle, 5, app, character, character);
        }

        return character;

    }


    rendererTexture(renderTexture, animation, app, position, isMoveLeft) {

        app.stage.removeChild(renderTexture);

        charTexture = animation[Math.floor(exactImage)];
        renderTexture = new PIXI.Sprite(charTexture);

        renderTexture.x = position.x;
        renderTexture.y = position.y;

        // renderTexture.anchor.set(0.5);
        renderTexture.scale.set(2);

        if (isMoveLeft) {
            renderTexture.anchor.x = 1;
            renderTexture.scale.x *= -1;
        }

        app.stage.addChild(renderTexture);

        return renderTexture;
    }

    isCountImage(maxFrame, animation) {

        if (exactImage >= maxFrame) {
            exactImage = 0;
        } else {
            exactImage += 1 / animation.length;
        }
    }

    deleted(deleteTexture, app) {
        if (deleteTexture !== 'undefined') {
            app.stage.removeChild(deleteTexture);
        }
    }


    _isAttackBananaColision(spriteChar, spriteBanana) {

        let colision = 'Life';
        if ((spriteChar.x + 90) >= spriteBanana.x) {
            colision = 'DeadBanana';
        }

        return colision;
    }

    _isDeath(spriteChar, spriteBanana) {
        let colision = 'Life';

        if ((spriteBanana.x - 56) <= spriteChar.x) {
            colision = 'Dead';
        }

        return colision;
    }

}