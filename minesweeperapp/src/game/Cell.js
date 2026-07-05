export class Cell {
  constructor(row, col, size) {
    this.row = row;
    this.col = col;
    this.x = col * size;
    this.y = row * size;
    this.size = size;
    
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.neighborMines = 0;
  }

  draw(ctx, mineImage) {
    if (this.isRevealed) {
      ctx.fillStyle = '#863a00'; 
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.strokeStyle = '#411d01';
      ctx.strokeRect(this.x, this.y, this.size, this.size);

      if (this.isMine && mineImage) {
        ctx.drawImage(mineImage, this.x + 2, this.y + 2, this.size - 4, this.size - 4);
      } else if (this.neighborMines > 0) {
        ctx.fillStyle = this.getNumberColor(this.neighborMines);
        ctx.font = `bold ${this.size * 0.5}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.neighborMines, this.x + this.size / 2, this.y + this.size / 2);
      }
    } else {
      ctx.fillStyle = '#c05300';
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.strokeStyle = '#b44e00'; 
      ctx.strokeRect(this.x, this.y, this.size, this.size);
      
      if (this.isFlagged) {
        ctx.fillStyle = 'red'; 
        ctx.font = '16px sans-serif';
        ctx.fillText('🚩', this.x + this.size / 2, this.y + this.size / 2);
      }
    }
  }

  getNumberColor(num) {
    const colors = ['#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080'];
    return colors[num - 1] || '#000';
  }
}