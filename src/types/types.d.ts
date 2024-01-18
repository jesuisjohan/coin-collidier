interface ICoinConfig {
    physicsProps: IPhysicsProps
}

interface IVector2 {
    x: number
    y: number
}

interface IPhysicsProps {
    vector2: IVector2
    size: {
        width: number,
        height: number
    }
}

interface IPhysicsObject extends Phaser.GameObjects.Image {
    physicsProps: IPhysicsProps
}

interface IPhysicsManagerConfig {
    bound: {
        x: number,
        y: number,
        width: number,
        height: number
    }
}