let _instaeUnHero;

class BananaUnhero {
    static getInstance() {
        if (!_instaeUnHero) {
            _instaeUnHero = new this();
        }
        return _instaeUnHero;
    }

    createUnhero(app) {
        let banana = new PIXI.Sprite.fromImage('Game/GameScene/img/banana.png');

        banana.x = window.innerWidth / 2.4;
        banana.y = window.innerHeight / 1.77;
        banana.anchor.set(0.5);
        banana.scale.set(0.12);
        app.stage.addChild(banana);

        return banana;
    }

    update(sprite, app) {
        app.stage.removeChild(sprite);
        sprite.rotation += 0.4;
        sprite.x -= 1;
        app.stage.addChild(sprite);

        return sprite;
    }

    isWindow(sprite) {
        if (sprite.x <= 0) {
            sprite.x = window.innerWidth / 2.4
        }
        return sprite;
    }

    _isDead(collision, sprite) {
        if (collision === 'DeadBanana') {
            sprite.x = window.innerWidth / 2.4;
        }
    }

}