import { setCurrentMode, setCurrentTheme } from "./features/photo-slide/action";

const modes = ["manual", "auto", "random"];

const themes = ["a", "b", "c", "d", "e", "h"];

const commands = [
  {
    name: "Change to manual control mode",
    fn: () => setCurrentMode("maual"),
  },
  {
    name: "Change to auto-playing mode",
    fn: () => setCurrentMode("auto"),
  },
  {
    name: "Change to random playing mode",
    fn: () => setCurrentMode("random"),
  },
  {
    name: "Switch to theme A",
    fn: () => setCurrentTheme("a"),
  },
  {
    name: "Switch to theme B",
    fn: () => setCurrentTheme("b"),
  },
  {
    name: "Switch to theme C",
    fn: () => setCurrentTheme("c"),
  },
  {
    name: "Switch to theme D",
    fn: () => setCurrentTheme("d"),
  },
  {
    name: "Switch to theme E",
    fn: () => setCurrentTheme("e"),
  },
  {
    name: "Switch to theme H",
    fn: () => setCurrentTheme("h"),
  },
];

const samplePhotos = [
  {
    url: "sample_images/basilique-notre-dame-de-fourviere-lyon.jpg",
    name: "basilique-notre-dame-de-fourviere-lyon.jpg",
  },
  {
    url: "sample_images/beautiful-view-in-lyon.jpg",
    name: "beautiful-view-in-lyon.jpg",
  },
  {
    url: "sample_images/place-bellecour-lyon.jpg",
    name: "place-bellecour-lyon.jpg",
  },
  {
    url: "sample_images/tour-metalique-lyon.jpg",
    name: "tour-metalique-lyon.jpg",
  },
];

export { samplePhotos, modes, themes, commands };
