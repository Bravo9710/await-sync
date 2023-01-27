import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor(url) {
    super();

    this.url = url;

    const progress = document.createElement("progress");
    progress.classList.add('progress', 'is-small', 'is-primary');
    progress.max = 100;
    progress.innerHTML = 0;

    this._loading = progress;

    this._load(this.url);
    this.emit(Application.events.READY);
  }

  // // _loading() {
  //   const progress = document.createElement("progress");
  //   progress.classList.add('progress', 'is-small', 'is-primary');
  //   progress.max = 100;
  //   progress.innerHTML = 0;

  //   return progress;
  // }

  _create(data) {
    data.forEach((planet) => {
      const box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = this._render({
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
      });
      document.body.querySelector(".main").appendChild(box);
    })
  }

  _startLoading () {
    const progressBar = this._loading;
    document.body.querySelector(".main").appendChild(progressBar);
  }

  _stopLoading  () {
    document.querySelector('.progress').classList.add("hidden");
  }

   async _load(url) {
    this._startLoading();

    let planets = [];
    let next = url;
    while (next) {
      const response = await fetch(next);
      const data = await response.json();
      planets = [...planets, ...data.results];
      next = data.next;
    }
    // this.renderBoxes(planets);

    // const response = await fetch(url);
    // const data = await response.json();

    this._stopLoading();
    this._create(planets);

    // return new Promise((resolve, reject) => {
    //   resolve(fetch(url));
    // }).then((data) => {
    //   data.json().then(data => {
    //   })
    // })
  }

  _render({ name, terrain, population }) {
    return `
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="${image}" alt="planet">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
          <h4>${name}</h4>
            <p>
              <span class="tag">${terrain}</span> <span class="tag">${population}</span>
              <br>
            </p>
          </div>
        </div>
      </article>
    `;
  }

}



