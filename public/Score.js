import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  changeStage = false;
  checkStage = true;
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
    if (this.checkStage) {
      this.checkStage = false;
      sendEvent(10, {});
    }
    this.score += deltaTime * 0.001 * this.scorePerSecond;
    // 점수가 100점 이상이 될 시 서버에 메세지 전송
    if (Math.floor(this.score) === this.nextStageScore && this.changeStage) {
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

  getItem(itemId) {
    console.log('!!!!!!!!', itemId);
    this.score += 0;
  }

  reset() {
    this.score = 0;
    this.checkStage = true;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
