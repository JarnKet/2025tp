import { setMode, setTheme } from "./features/photo-slider/action";

const MODES = ["manual", "auto", "random"];
const THEMES = ["a", "b", "c", "d", "e", "f"];

const COMMANDS = [
  {
    name: "Change to manual control mode",
    fn: () => setMode("manual"),
  },
  {
    name: "Change to auto-playing control mode",
    fn: () => setMode("auto"),
  },
  {
    name: "Change to random playing mode",
    fn: () => setMode("random"),
  },
  {
    name: "Switch to theme A",
    fn: () => setTheme("a"),
  },
  {
    name: "Switch to theme B",
    fn: () => setTheme("b"),
  },
  {
    name: "Switch to theme C",
    fn: () => setTheme("c"),
  },
  {
    name: "Switch to theme D",
    fn: () => setTheme("d"),
  },
  {
    name: "Switch to theme E",
    fn: () => setTheme("e"),
  },
  {
    name: "Switch to theme F",
    fn: () => setTheme("f"),
  },
];

const sampleImages = [
  {
    url: "./sample-images/basilique-notre-dame-de-fourviere-lyon.jpg",
    name: "basilique-notre-dame-de-fourviere-lyon.jpg",
  },
  {
    url: "./sample-images/beautiful-view-in-lyon.jpg",
    name: "beautiful-view-in-lyon.jpg",
  },
  {
    url: "./sample-images/place-bellecour-lyon.jpg",
    name: "place-bellecour-lyon.jpg",
  },
  {
    url: "./sample-images/tour-metalique-lyon.jpg",
    name: "tour-metalique-lyon.jpg",
  },
];

export { MODES, THEMES, COMMANDS, sampleImages };
