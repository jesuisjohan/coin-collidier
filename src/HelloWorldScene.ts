import Phaser from 'phaser'
import Coin from './objects/Coin'
import PhysicsManager from './managers/PhysicsManager'

export default class HelloWorldScene extends Phaser.Scene {
    public physicsManager: PhysicsManager

    constructor() {
        super('hello-world')
        this.physicsManager = new PhysicsManager(this, {
            bound: {
				x: 10,
				y: 10,
                width: 780,
                height: 580,
            },
        })
    }

    public preload() {
        this.load.image('circle', 'assets/circle.png')
    }

    public create() {
		this.physicsManager.init()
        const diameter = 50
        const coin = new Coin(this, {
            physicsProps: {
                vector2: {
                    x: 1,
                    y: 1,
                },
				size: {
					width: diameter,
					height: diameter
				}
            },
        })
        coin.setPosition(400, 300)
        this.physicsManager.addObject(coin)
    }

    public update() {
        this.physicsManager.update()
    }
}
