let _instanceBg;
let _stage;

let background1,
    background2,
    _position;

class BackGround {
    static getInstance() {
        if (!_instanceBg) {
            _instanceBg = new this();
        }
        return _instanceBg;
    }

    createBackGround(stage) {
        PIXI.loader
            .add('Game/GameScene/img/bg.png')
            .load(this.setup);

        _stage = stage;
        _position = 0;
    }

    setup() {

        background1 = PIXI.Sprite.fromImage('Game/GameScene/img/bg.png');

        _stage.addChild(background1);
    }


}