type CocoSSDPrediction = {
    class: string;
    score: number;
    bbox: [number, number, number, number]; // [x, y, width, height]
}[];
export const renderPredictions = (predictions:CocoSSDPrediction, ctx:CanvasRenderingContext2D)=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach((prediction)=>{
        const [x, y, width, height] = prediction.bbox;

        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = `rgba(255, 0, 0, 0.2)`;
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);

    })
}