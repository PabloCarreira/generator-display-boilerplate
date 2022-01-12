import Entity from '@mediamonks/display-temple/Entity';
import Animation from "./Animation";

import DoubleClickPlatformComponent from '@mediamonks/display-temple/component/platform/DoubleClickPlatformComponent';
import EventDispatcherComponent from "@mediamonks/display-temple/component/EventDispatcherComponent";
import DoubleClickEventEnum from "@mediamonks/display-temple/event/DoubleClickEventEnum";

import dynamicData from "./DynamicData";

import fitText from '@mediamonks/display-temple/util/fitText';
import load from '@mediamonks/display-temple/util/load';


export default class Banner extends Entity {

  constructor(config = null) {
    super();

    // add required components here
    this.config = config;

    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new EventDispatcherComponent());
  }

  async init() {
    await super.init();
  }

  async loadDynamicContent () {
    //load dynamic data
    const dynamic = new dynamicData(this);
    const dynamicContent = await dynamic.get();
    this.feed = dynamicContent;
  }

  async setDynamicContent () {
    this.banner = document.body.querySelector('.banner');
    const title = document.body.querySelector('.title');
    const ctaCopy = document.body.querySelector('.cta_copy');
    const logo = document.body.querySelector('.logo');

    // set text
    title.innerHTML = this.feed.text;
    ctaCopy.innerHTML = this.feed.cta;

    // load images
    const tempImg = await load(this.feed.logo.Url)
    logo.src = tempImg.src;

    // set backgroundColor
    this.banner.style.backgroundColor = this.feed.bgcolor;

    // set exitUrl
    this.mainExit = this.feed.exit_url.Url;

    //fit text according to parent container
    fitText([title, ctaCopy]);
  }

  async addEventListeners() {
    this.domMainExit = document.body.querySelector('.mainExit');
    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.dispatcher = this.getComponent(EventDispatcherComponent);
    //on exit handler
    this.dispatcher.addEventListener(DoubleClickEventEnum.EXIT, this.handleExit);
  }

  loadAndPlayAnimation = () => {
    this.animation = new Animation(this.banner);
    this.timeline = this.animation.createTimeline(this.config);
    this.timeline.play();
  }

  handleExit = () => {
    this.timeline.progress(1);
  };

  /**
   * When client clicks this function will be triggered.
   */
  handleClick = () => {
    Enabler.exitOverride('Default Exit', this.mainExit);
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
}
