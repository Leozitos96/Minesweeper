import { useEffect, useRef } from "react";
import { GameEngine } from "../game/GameEngine";

const GameCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const game = new gameEngine(canvas);
        let animationFrameId;

        const gameLoop = () => {
            game.update();
            game.render();
            animationFrameId = window.requestAnimationFrame(gameLoop);
        }

        gameLoop();

        return() => {
            window.cancelAnimationFrame(animationFrameId);
            game.destroy();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}       
            width={800}
            height={600}
            style={{ border: '3px solid #333', backgroundColor: '#111' }}
        />
    )
}

export default GameCanvas;