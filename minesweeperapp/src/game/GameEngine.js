import { Cell } from './Cell';

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.rows = 10;
    this.cols = 10;
    this.cellSize = 40; 
    this.totalMines = 15;
    
    this.grid = [];
    this.mineImage = null;

    this.init();
  }

  async init() {
    this.mineImage = await this.loadImage('/assets/bomb.png');

    this.createGrid();
    this.plantMines();
    this.countNeighbors();

    this.render();

    this.canvas.addEventListener('click', this.handleLeftClick.bind(this));
  }

  loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error("Error loading the image of the bomb.");
        resolve(null);
      };
    });
  }

  createGrid() {
    this.grid = [];
    for (let r = 0; r < this.rows; r++) {
      this.grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.grid[r][c] = new Cell(r, c, this.cellSize);
      }
    }
  }

  plantMines() {
    let minesPlanted = 0;
    while (minesPlanted < this.totalMines) {
      let r = Math.floor(Math.random() * this.rows);
      let c = Math.floor(Math.random() * this.cols);
      if (!this.grid[r][c].isMine) {
        this.grid[r][c].isMine = true;
        minesPlanted++;
      }
    }
  }

  countNeighbors() {
  }

  handleLeftClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const col = Math.floor(mouseX / this.cellSize);
    const row = Math.floor(mouseY / this.cellSize);

    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      this.revealCell(row, col);
      this.render(); 
    }
  }

  revealCell(row, col) {
    const cell = this.grid[row][col];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    if (cell.isMine) {
      this.gameOver();
      return;
    }

    if (cell.neighborMines === 0) {
    }
  }

  gameOver() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c].isMine) this.grid[r][c].isRevealed = true;
      }
    }
    alert("Game Over!");
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.grid[r][c].draw(this.ctx, this.mineImage);
      }
    }
  }
}