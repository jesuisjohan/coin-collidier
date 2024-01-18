export default class PhysicsManager {
    public scene: Phaser.Scene
    public config: IPhysicsManagerConfig
    public objects: IPhysicsObject[] = []
    public boundObj!: Phaser.GameObjects.Rectangle

    constructor(scene: Phaser.Scene, config: IPhysicsManagerConfig) {
        this.scene = scene
        this.config = config
    }

    public init() {
        this.createBoundObj()
    }

    private createBoundObj() {
        const { x, y, width, height } = this.config.bound
        this.boundObj = this.scene.add
            .rectangle(x, y, width, height)
            .setOrigin(0, 0)
            .setStrokeStyle(1, 0xff00ff)
    }

    public addObject(obj: IPhysicsObject) {
        this.objects.push(obj)
    }

    public update() {
        this.objects.forEach((obj) => {
            this.updateObject(obj)
        })
    }

    private updateObject(obj: IPhysicsObject) {
        const { size, vector2 } = obj.physicsProps

        if (vector2.x === 0 && vector2.y === 0) {
            return
        }

        const { boundBottomY, boundTopY, boundLeftX, boundRightX } =
            this.getBoundSides()
        const halfWidth = size.width / 2
        const halfHeight = size.height / 2
        const objRightX = obj.x + halfWidth
        const objLeftX = obj.x - halfWidth
        const objTopY = obj.y - halfHeight
        const objBottomY = obj.y + halfHeight
        const stuckRight = objRightX >= boundRightX
        const stuckLeft = objLeftX <= boundLeftX
        const stuckBottom = objBottomY >= boundBottomY
        const stuckTop = objTopY <= boundTopY

        if (stuckRight) {
            vector2.x = -Math.abs(vector2.x)
        } else if (stuckLeft) {
            vector2.x = Math.abs(vector2.x)
        }
        obj.x += vector2.x

        if (stuckBottom) {
            vector2.y = -Math.abs(vector2.y)
        } else if (stuckTop) {
            vector2.y = Math.abs(vector2.y)
        }
        obj.y += vector2.y
    }

    private getBoundSides() {
        const boundRightX = this.config.bound.x + this.config.bound.width
        const boundLeftX = this.config.bound.x
        const boundTopY = this.config.bound.y
        const boundBottomY = this.config.bound.y + this.config.bound.height

        return { boundRightX, boundLeftX, boundTopY, boundBottomY }
    }
}
