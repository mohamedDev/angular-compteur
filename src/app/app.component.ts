import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  deg: number;
  cond: number;
  oldh: number;
  timer;
  setInterval = setInterval;
  setTimeout = setTimeout;
  startstate: boolean = false;
  pausestate: boolean = true;
  activebell: boolean = false;
  player: any;

  OnInit() {
  }

  start(h, m, s) {
    if (h === '') {
      h = 0;
    }
    if (m === '') {
      m = 0;
    }
    if (s === '') {
      s = 0;
    }
    this.player = document.querySelector('#audioPlayer');
    this.startstate = true;
    this.pausestate = true;
    this.activebell = false;
    this.player.pause();
    this.player.currentTime = 0.0;
    clearInterval(this.timer);
    this.hour = parseInt(h);
    this.minute = parseInt(m);
    this.second = parseInt(s);
    this.cond = this.hour / 4;
    this.deg = 360 / this.hour;
    this.oldh = this.hour;
    let total = (this.hour * 3600) + (this.minute * 60) + this.second;
    this.timer = setInterval(() => {
      total -= 1;
      if (total <= 7) {
        this.player.currentTime = 7 - total;
        this.player.play();
      }
      if (total <= -1) {
        clearInterval(this.timer);
        this.activebell = true;
        this.startstate = false;
        setTimeout(() => { this.activebell = false }, 20000);
      } else {
        this.hour = Math.trunc(total / 3600);
        this.minute = Math.trunc((total - (this.hour * 3600)) / 60);
        this.second = total - ((this.hour * 3600) + (this.minute * 60));
      }
    }, 1000);
  }



  pause() {
    clearInterval(this.timer);
    this.pausestate = false;
    this.activebell = false;
    this.player.pause();
  }

  stop() {
    clearInterval(this.timer);
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.startstate = false;
    this.activebell = false;
    this.player.pause();
    this.player.currentTime = 0.0;
  }

  transformr1(unit) {
    if (unit <= 60 && unit > 15) {
      return { transform: 'rotate(' + ((60 - unit) * 6) + 'deg)' };
    }
    if (unit <= 15 && unit != 0) {
      return { transform: 'rotate(270deg) skewY(' + (90 - (unit * 6)) + 'deg)' };
    }
  }

  transformr2(unit) {
    if (unit <= 45 && unit > 15) {
      return { transform: 'rotate(' + (((60 - unit) * 6) - 90) + 'deg)' };
    }
    if (unit <= 15 && unit != 0) {
      return { transform: 'rotate(180deg) skewX(' + (-(90 - (unit * 6))) + 'deg)' };
    }
  }

  transformr3(unit) {
    if (unit <= 30 && unit > 15) {
      return { transform: 'rotate(' + (((60 - unit) * 6) - 180) + 'deg)' };
    }
    if (unit <= 15 && unit != 0) {
      return { transform: 'rotate(90deg) skewY(' + (90 - (unit * 6)) + 'deg)' };
    }
  }

  transformr4(unit) {
    if (unit <= 15 && unit != 0) {
      return { transform: 'skewX(' + (-(90 - (unit * 6))) + 'deg)' };
    }
  }

  transformhr1(unit) {
    if (unit >= this.cond) {
      return { transform: 'rotate(' + this.deg * (this.oldh - unit) + 'deg)' };
    }
    if (unit < this.cond && unit != 0) {
      return { transform: 'rotate(270deg) skewY(' + (90 - (this.deg * unit)) + 'deg)' };
    }
  }

  transformhr2(unit) {
    if (unit >= this.cond && unit < this.cond * 3) {
      return { transform: 'rotate(' + this.deg * (this.oldh - (unit + this.cond)) + 'deg)' };
    }
    if (unit < this.cond && unit != 0) {
      return { transform: 'rotate(180deg) skewX(' + -(90 - (this.deg * unit)) + 'deg)' };
    }
  }

  transformhr3(unit) {
    if (unit >= this.cond && unit < this.cond * 2) {
      return { transform: 'rotate(' + this.deg * (this.oldh - (unit + (this.cond * 2))) + 'deg)' };
    }
    if (unit < this.cond && unit != 0) {
      return { transform: 'rotate(90deg) skewY(' + (90 - (this.deg * unit)) + 'deg)' };
    }
  }

  transformhr4(unit) {
    if (unit <= this.cond && unit != 0) {
      return { transform: 'skewX(' + -(90 - (this.deg * unit)) + 'deg)' };
    }
  }

}
