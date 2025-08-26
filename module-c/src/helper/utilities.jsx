export function getSortingMethod() {
  const sortingMethod = localStorage.getItem("SORTING_METHOD");
  return sortingMethod;
}

export function setSortingMethod(value) {
  localStorage.setItem("SORTING_METHOD", value);
}

export function getPinnedCarpark() {
  const pinnedCarparks = localStorage.getItem("PINNED_CARPARKS");
  return JSON.parse(pinnedCarparks);
}

export function setPinnedCarpark(updated) {
  localStorage.setItem("PINNED_CARPARKS", JSON.stringify(updated));
}
