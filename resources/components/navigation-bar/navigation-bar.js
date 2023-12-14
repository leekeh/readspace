import { createCursor } from "./cursor.js";
import { createNavigation } from "./navigation.js";

export default class NavigationBar extends HTMLElement {
  constructor() {
    super();
    const { navigation, currentItem } = createNavigation();
    this.append(navigation);
    const cursor = createCursor(currentItem, this);
    this.append(cursor);
  }
}
