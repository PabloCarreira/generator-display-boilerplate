import Entity from '@mediamonks/display-temple/Entity';
import dataBind from "@mediamonks/display-temple/util/dataBind";
import fitText from '@mediamonks/display-temple/util/fitText';

export default class Banner extends Entity {

  constructor(config) {
    super();

    // add required components here
    this.config = config;
  }

  async init() {
    await super.init();

    dataBind(this.config.content, document.body);

    const title = document.body.querySelector('.title');
    const ctaCopy = document.body.querySelector('.cta_copy');
    fitText([title, ctaCopy]);

    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.timeline = this.animation.createTimeline(this.config);
    this.timeline.play();
  }

  exit = () => {
    window.open(window.clickTag, '_blank');
    this.handleExit();
  };

  handleExit = () => {
    this.timeline.progress(1);
  };

  /**
   * When client clicks this function will be triggerd.
   */
  handleClick = () => {
    this.exit();
  };

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {

  };

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {

  };

  async start() {
    await this.init();
  }
}

