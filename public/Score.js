import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  highScore = 0;
  changeStage = false;
  currentStageId = 0;
  nextStageId = 0;
  scorePerSecond = 0;
  nextStageScore = 0;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001 * this.scorePerSecond;
    // 다음 스테이지의 도달 점수가 되면 서버에 소켓 전송
    if (Math.floor(this.score) >= this.nextStageScore && this.changeStage) {
      this.changeStage = false;
      sendEvent(11, { currentStage: this.currentStageId, targetStage: this.nextStageId });
    }
  }

  setStageInfo(currentStage, nextStage) {
    this.currentStageId = currentStage.id;
    this.scorePerSecond = currentStage.scorePerSecond;
    if (nextStage !== -1) {
      this.nextStageId = nextStage.id;
      this.nextStageScore = nextStage.score;
      this.changeStage = true;
    }

    sendEvent(101, { currentStageId: this.currentStageId });
  }

  getHighScore() {
    return this.highScore;
  }

  setHighScore(score) {
    this.highScore = Math.floor(score);
  }

  getItem(itemId) {
    sendEvent(102, { itemId, currentStage: this.currentStageId });
  }

  reset() {
    this.score = 0;
  }

  checkHighScore() {
    if (this.score > this.highScore) {
      sendEvent(5, { score: this.score });
    }
  }

  getScore() {
    return this.score;
  }

  plusScore(score) {
    this.score += score;
  }

  draw() {
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = this.highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
