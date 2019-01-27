let _instance;

class Scene {
    static getInstance() {
        if (!_instance) {
            _instance = new this();
        }
        return _instance;
    }

    createGameScene() {
        let App = new PIXI.Application({
            width: 800,
            heigth: 800
        });

        return App;
    }

    createTextGameOver() {
        let text = new PIXI.Text('GameOver', {
            fontWeight: 'bold',
            fontFamily: 'Arial',
            fontSize: 35,
            fill: 'white',
            align: 'center'
        });

        text.anchor.set(0.5);
        text.x = window.innerWidth / 4;
        text.y = window.innerHeight / 4;

        return text;
    }
}